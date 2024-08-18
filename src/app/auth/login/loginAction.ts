"use server";

import crypto from "crypto";
import UserDbService from "@/prisma/userDbService";
import jwt, { Secret } from "jsonwebtoken";
import env from "dotenv";

env.config();

export const loginAction = async (formData: FormData) => {
  const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET || "TEST_JWT";
  const username = formData.get("username") as string;
  const pass = formData.get("password") as string;
  const hashedPass = crypto.createHash("sha256").update(pass).digest("hex");

  function generateAccessToken(userData: Object) {
    return jwt.sign(userData, JWT_TOKEN_SECRET, { expiresIn: "2629800s" });
  }

  try {
    const user = await UserDbService.validateUser(username, hashedPass);
    if (!user) {
      return false;
    }
    const jwt = generateAccessToken(user);
    return jwt;
  } catch (err) {
    return false;
  }
};
