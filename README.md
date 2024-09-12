# DragDrop PDF Builder

## About

DragDrop PDF Builder is a powerful and intuitive web application that allows users to create professional PDFs using a simple drag-and-drop interface. Design your documents with ease, customize them to your needs, and export high-quality PDFs in seconds.

## Test It Out

You can test out the DragDrop PDF Builder [here](#).

## Features

- **Drag and Drop Interface**: Easily add and arrange components to build your PDF.
- **Supported Components**:
  - **Header**: Add titles or headings to your documents.
  - **Text**: Include body text with customizable styles.
  - **Table**: Create structured tables for data presentation.
  - **Spacer**: Add spacing between components for better layout.
- **Export Functionality**: Generate and download your PDF with a single click.
- **More Components Coming Soon**: Stay tuned for additional features!

## Technologies Used

- **Next.js**: A React framework for building server-side rendered and statically generated web applications.
- **Vercel KV**: For efficient rate limiting and data storage.
- **shadcn/ui**: A component library for building beautiful user interfaces.
- **Tiptap Editor**: A highly customizable rich text editor for editing content.
- **pdfmake**: A powerful library for generating PDF documents programmatically.

## Installation / Run Locally

To get started with DragDrop PDF Builder, follow these steps:

1. Clone the repository:
   git clone https://github.com/yourusername/dragdrop-pdf-builder.git

2. Navigate to the project directory:
   cd dragdrop-pdf-builder

3. If you want rate limiting you will need to acquire all environment variables needed by Vercel KV. A sample env file is provided.

4. Install dependencies:
   npm install

5. Start the development server:
   npm run dev

6. Open your browser and go to:
   http://localhost:3050
