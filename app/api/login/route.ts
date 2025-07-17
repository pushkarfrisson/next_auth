import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { comparePasswords } from "@/lib/hash";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (result.rows.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const user = result.rows[0];
        const isMatch = await comparePasswords(password, user.password);

        if (!isMatch) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        return NextResponse.json({ message: "Login successful", user: { email: user.email } });

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Login error:", error.message);
            return NextResponse.json({ error: "Login failed", details: error.message }, { status: 500 });
        }

        console.error("Unknown login error:", error);
        return NextResponse.json({ error: "Unexpected error during login" }, { status: 500 });
    }
}
