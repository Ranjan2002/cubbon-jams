import { NextRequest, NextResponse } from "next/server";
import { galleryItems } from "@/lib/data/mockData";

export async function GET() {
  return NextResponse.json(galleryItems);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real app, you would save to a database here
    const newItem = {
      id: Date.now().toString(),
      type: "image",
      ...body,
    };

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add gallery item" },
      { status: 500 }
    );
  }
}
