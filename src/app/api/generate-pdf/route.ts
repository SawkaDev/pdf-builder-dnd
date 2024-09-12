import { NextRequest, NextResponse } from 'next/server';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const generatePDF = (data: any) => {
  const content = data.map((item: any) => {
    switch (item.type) {
      case 'header':
        return { text: item.content, style: `header${item.level}` };
      case 'text':
        return { text: item.content.replace(/<\/?[^>]+(>|$)/g, ""), fontSize: item.size };
      default:
        return null;
    }
  }).filter(Boolean);

  const docDefinition = {
    content,
    styles: {
      header1: { fontSize: 24, bold: true },
      header2: { fontSize: 22, bold: true },
      header3: { fontSize: 20, bold: true },
      header4: { fontSize: 18, bold: true },
      header5: { fontSize: 16, bold: true },
      header6: { fontSize: 14, bold: true },
    },
  };

  return pdfMake.createPdf(docDefinition);
};

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const pdfDoc = generatePDF(data);
    return new Promise((resolve, reject) => {
      pdfDoc.getBase64((data: string) => {
        const pdfBuffer = Buffer.from(data, 'base64');
        const response = new NextResponse(pdfBuffer, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=generated.pdf',
          },
        });
        resolve(response);
      });
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error generating PDF', error }, { status: 500 });
  }
}