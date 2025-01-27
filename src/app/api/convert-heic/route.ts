import { NextRequest, NextResponse } from "next/server";
//@ts-expect-error tobuild
import heicConvert from "heic-convert";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // HEIC → JPEG 변환
    const outputBuffer = await heicConvert({
      buffer,
      format: "JPEG",
      quality: 0.8,
    });

    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="converted.jpg"`,
      },
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json(
      { error: "Failed to process HEIC file" },
      { status: 500 }
    );
  }
}
