import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/connectdb";

export async function PATCH(
  req: Request,
  { params }: { params: { classroomId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, startTime, endTime, teacherId, child } = body;
    if (!name || !startTime || !endTime || !teacherId || !child) {
      return NextResponse.json({ error: "Empty Field" }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    if (!params.classroomId) {
      return NextResponse.json({
        error: "ClassroomId is requried",
        status: 400,
      });
    }

    const response = await prisma.classroom.update({
      where: {
        id: params.classroomId,
      },
      data: {
        name,
        startTime,
        endTIme: endTime,
        teacherId,
        child,
      },
    });

    return NextResponse.json({ data: response });
  } catch (error) {
    console.log("CLASSROOM PATCH", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { classroomId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    if (!params.classroomId) {
      return NextResponse.json({
        error: "Id is requried",
        status: 400,
      });
    }

    const response = await prisma.classroom.delete({
      where: {
        id: params.classroomId,
      },
    });

    return NextResponse.json({ data: response });
  } catch (error) {
    console.log("CLASSROOM DELETE", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
