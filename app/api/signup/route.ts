// app/api/signup/route.ts
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword } from "@/lib/hash"; // your existing hash util

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const hashed = await hashPassword(password);

    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, hashed]
    );

    return NextResponse.json({ message: "User created" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Signup failed", details: err.message },
      { status: 400 }
    );
  }
}
