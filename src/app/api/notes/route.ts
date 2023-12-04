import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    // throw new Error("This is a test error");
    const notes = await prisma.note.findMany();
    // console.log("NOTAS", notes);
    return NextResponse.json(notes);
    // En typescript es necesario verificar el error: Error personalizado
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    const newNote = await prisma.note.create({
      data: {
        title: title,
        content: content,
      },
    });
    return NextResponse.json(newNote);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
