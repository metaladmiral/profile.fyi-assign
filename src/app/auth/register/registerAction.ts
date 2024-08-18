"use server";

import crypto from "crypto";
import UserDbService from "@/prisma/userDbService";
import { v4 as uuidv4 } from "uuid";

export const registerAction = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const pass = formData.get("password") as string;
  const hashedPass = crypto.createHash("sha256").update(pass).digest("hex");
  const userId = uuidv4();

  try {
    const user = await UserDbService.createUser(username, hashedPass, userId);
    return true;
  } catch (err) {
    return false;
  }
};
