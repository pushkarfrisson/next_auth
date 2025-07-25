// lib/hash.ts
import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePasswords(password: string, hashed: string): Promise<boolean> {
  return await bcrypt.compare(password, hashed);
}
