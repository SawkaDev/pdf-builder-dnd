import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import pdfMake from "pdfmake/build/pdfmake";
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

const generatePDF = (data: PDFContent[]) => {
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
  const ip = req.ip ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }

  try {
    const data: PDFContent[] = await req.json();
    const pdfDoc = generatePDF(data);

    return new Promise((resolve, reject) => {
      pdfDoc.getBase64((data: string) => {
        const pdfBuffer = Buffer.from(data, "base64");
        const response = new NextResponse(pdfBuffer, {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "inline; filename=generated.pdf",
          },
        });
        resolve(response);
      });
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { message: "Error generating PDF", error: (error as Error).message },
      { status: 500 }
    );
  }
}
