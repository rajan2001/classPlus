import { NextResponse } from "next/server";
import prisma from "@/lib/connectdb";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json(
      { error: "unauthenticated User" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();
    const { name, startTime, endTime, teacherId, child } = body;
    if (!name || !startTime || !endTime || !teacherId || !child) {
      return NextResponse.json({ error: "Empty Field" }, { status: 400 });
    }

    const response = await prisma.classroom.create({
      data: {
        name,
        startTime,
        endTIme: endTime,
        teacherId,
        child,
      },
    });

    return NextResponse.json({ data: response }, { status: 201 });
  } catch (error) {
    console.log("ClASSROOM_POST", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
