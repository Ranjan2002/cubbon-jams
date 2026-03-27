import { NextRequest, NextResponse } from "next/server";
import { events } from "@/lib/data/mockData";

export async function GET() {
  return NextResponse.json(events);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real app, you would save to a database here
    const newEvent = {
      id: Date.now().toString(),
      ...body,
      registered: 0,
    };

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
