import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { childId: string } }
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

    if (!params.childId) {
      return NextResponse.json({ error: "teacherId is requried", status: 400 });
    }

    const response = await clerkClient.users.updateUser(params.childId, {
      firstName: name,
      password: password,
    });

    return NextResponse.json({ data: response });
  } catch (error) {
    console.log("CHILD PATCH", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { childId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    if (!params.childId) {
      return NextResponse.json({
        error: "Id is requried",
        status: 400,
      });
    }

    const response = await clerkClient.users.deleteUser(params.childId);

    return NextResponse.json({ data: response });
  } catch (error) {
    console.log("TEACHER DELETE", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
