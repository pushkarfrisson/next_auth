import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword } from "@/lib/hash";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const hashed = await hashPassword(password);

    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, hashed]
    );

    return NextResponse.json({ message: "User created" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Signup error:", error.message);
      return NextResponse.json(
        { error: "Signup failed", details: error.message },
        { status: 400 }
      );
    }

    console.error("Unknown signup error:", error);
    return NextResponse.json(
      { error: "Unexpected error during signup" },
      { status: 400 }
    );
  }
}
