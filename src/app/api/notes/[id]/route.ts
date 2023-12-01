import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";
interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  console.log(params.id);
  try {
    const note = await prisma.note.findFirst({
      where: {
        id: Number(params.id),
      },
    });
    if (!note) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(note);
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
export async function DELETE(request: Request, { params }: Params) {
  try {
    const deleteNote = await prisma.note.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deleteNote) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }
    return NextResponse.json(deleteNote);
  } catch (error) {
    // Verificamos que tipo de error es recibido
    // console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      //   console.log(error.code, error.message);
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Note not found" },
          { status: 404 }
        );
      }
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

export async function PUT(request: Request, { params }: Params) {
  try {
    const { title, content } = await request.json();
    const updateNote = await prisma.note.update({
      where: {
        id: Number(params.id),
      },
      data: {
        title: title,
        content: content,
      },
    });
    return NextResponse.json(updateNote);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Note not found" },
          { status: 404 }
        );
      }
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
