import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        return NextResponse.json({ status: "ok", message: "users table ready" });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("❌ DB error:", error.message);
            return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
        }

        // Handle unknown error shape
        console.error("❌ DB unknown error:", error);
        return NextResponse.json({ status: "error", message: "Unexpected error" }, { status: 500 });
    }
}
