// app/api/login/route.ts
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { comparePasswords } from "@/lib/hash";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    try {
        // Fetch the user by email
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (result.rows.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const user = result.rows[0];

        // Compare the password
        const isMatch = await comparePasswords(password, user.password);

        if (!isMatch) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        // Success
        return NextResponse.json({ message: "Login successful", user: { email: user.email } });

    } catch (err: any) {
        console.error("Login error:", err.message);
        return NextResponse.json({ error: "Login failed", details: err.message }, { status: 500 });
    }
}
