// ============================================================
// app/api/download-resume/route.ts
// Next.js API route jo resume force-download karta hai.
// Yeh browser ke PDF-open behavior ko bypass karta hai.
// Is file ko portfolio_frontend/app/api/download-resume/route.ts
// mein rakho.
// ============================================================

import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    // Public folder se resume.pdf padhlo
    const filePath = path.join(process.cwd(), "public", "resume.pdf");
    const fileBuffer = await readFile(filePath);

    // Force download headers set karo
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        // attachment — browser ko force download karta hai open nahi
        "Content-Disposition": 'attachment; filename="Pankaj_Dewang_Resume.pdf"',
        "Content-Type": "application/pdf",
        "Content-Length": fileBuffer.length.toString(),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Resume not found" },
      { status: 404 }
    );
  }
}