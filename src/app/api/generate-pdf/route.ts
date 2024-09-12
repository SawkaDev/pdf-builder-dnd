import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import pdfMake, { TCreatedPdf } from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {
  TDocumentDefinitions,
  Content,
  TableCell,
  PageSize,
} from "pdfmake/interfaces";
import { generatePDFFromHTML } from "./htmlToPdf";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(2, "10 s"),
  analytics: true,
});

interface PDFContent {
  type: string;
  content?: string;
  level?: number;
  size?: number;
  columns?: { name: string }[];
  rows?: { cells: TableCell[] }[];
  height?: number;
}

const handleError = (error: unknown) => {
  console.error("Error:", error);
  const message =
    error instanceof Error ? error.message : "Unknown error occurred";
  return NextResponse.json(
    { message: "Error generating PDF", error: message },
    { status: 500 }
  );
};

const generatePDF = (data: PDFContent[]): TCreatedPdf => {
  const content: Content[] = data
    .map((item): Content | undefined => {
      switch (item.type) {
        case "header":
          return { text: item.content || "", style: `header${item.level}` };
        case "text":
          return generatePDFFromHTML(item.content, item.size || 12);
        case "table":
          const tableBody: TableCell[][] = [
            item.columns?.map((col) => ({
              text: col.name,
              style: "tableHeader",
            })) || [],
            ...(item.rows ? item.rows.map((row) => row.cells) : []),
          ];
          return {
            table: {
              headerRows: 1,
              widths: item.columns?.map(() => "*") || [],
              body: tableBody,
            },
            margin: [0, 20, 0, 0],
          } as Content;
        case "spacer":
          return { text: "", margin: [0, item.height || 0, 0, 0] };
        default:
          return undefined;
      }
    })
    .filter(
      (item): item is Exclude<typeof item, undefined> => item !== undefined
    );

  const docDefinition: TDocumentDefinitions = {
    content,
    pageSize: "A4" as PageSize,
    defaultStyle: { font: "Roboto", lineHeight: 1, fontSize: 9 },
    styles: {
      header1: { fontSize: 24, bold: true },
      header2: { fontSize: 22, bold: true },
      header3: { fontSize: 20, bold: true },
      header4: { fontSize: 18, bold: true },
      header5: { fontSize: 16, bold: true },
      header6: { fontSize: 14, bold: true },
      tableHeader: { bold: true, color: "black", fillColor: "#CCCCCC" },
    },
  };

  return pdfMake.createPdf(docDefinition);
};

export async function POST(req: NextRequest) {
  const forwardedFor = req.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0] : req.ip ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }

  try {
    const data: PDFContent[] = await req.json();
    const pdfDoc = generatePDF(data);

    return new Promise<NextResponse>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error("PDF generation timed out"));
      }, 30000);

      pdfDoc.getBase64((data: string) => {
        clearTimeout(timeoutId);
        try {
          const pdfBuffer = Buffer.from(data, "base64");
          resolve(
            new NextResponse(pdfBuffer, {
              headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": "inline; filename=generated.pdf",
              },
            })
          );
        } catch (error) {
          reject(error);
        }
      });
    }).catch(handleError);
  } catch (error) {
    return handleError(error);
  }
}
