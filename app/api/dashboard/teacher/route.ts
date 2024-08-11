import { NextResponse } from "next/server";
import prisma from "@/lib/connectdb";
import { auth, clerkClient } from "@clerk/nextjs/server";

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
    const { name, email, password } = body;
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Empty Field" }, { status: 400 });
    }

    const response = await clerkClient.users.createUser({
      firstName: name,
      emailAddress: [email],
      password: password,
      publicMetadata: {
        role: "TEACHER",
      },
    });

    return NextResponse.json({ data: response }, { status: 201 });
  } catch (error) {
    console.log("TEACHER_POST", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
