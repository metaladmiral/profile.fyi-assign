"use server";

import CartDbService from "@/prisma/cartDbService";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import env from "dotenv";

env.config();

export const updateItemQuantityAction = async (
  itemId: number,
  jwt_token: string,
  action: string
) => {
  const JWT_SECRET = process.env.JWT_SECRET as Secret;

  let userData;
  try {
    userData = jwt.verify(jwt_token, JWT_SECRET) as JwtPayload;
  } catch (err) {}

  if (!userData) {
    return false;
  }

  try {
    await CartDbService.updateItemQuantity(
      userData["user_id"],
      itemId.toString(),
      action
    );
    return true;
  } catch (err) {
    return false;
  }
};
