import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { teacherId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, password } = body;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    if (!name || !password) {
      return NextResponse.json({ error: "Empty field", status: 400 });
    }

    if (!params.teacherId) {
      return NextResponse.json({ error: "teacherId is requried", status: 400 });
    }

    const response = await clerkClient.users.updateUser(params.teacherId, {
      firstName: name,
      password: password,
    });

    return NextResponse.json({ data: response });
  } catch (error) {
    console.log("TEACHER PATCH", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { teacherId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    if (!params.teacherId) {
      return NextResponse.json({
        error: "Id is requried",
        status: 400,
      });
    }

    const response = await clerkClient.users.deleteUser(params.teacherId);

    return NextResponse.json({ data: response });
  } catch (error) {
    console.log("TEACHER DELETE", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
