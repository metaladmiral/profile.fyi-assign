import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

const CartDbService = {
  addItemToCart: async (userId: string, itemId: string) => {
    try {
      const cart = await prisma.cart.findUnique({
        where: {
          user_id_cart_item_id: {
            user_id: userId,
            cart_item_id: itemId,
          },
        },
      });

      if (cart) {
        return await prisma.cart.update({
          where: {
            user_id_cart_item_id: {
              user_id: userId,
              cart_item_id: itemId,
            },
          },
          data: {
            cart_item_quantity: cart.cart_item_quantity + 1,
          },
        });
      }

      return await prisma.cart.create({
        data: {
          user_id: userId,
          cart_item_id: itemId,
          cart_item_quantity: 1, // Assuming initial quantity is 1
        },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw "User Already Exists!";
        }
      }
      if (err instanceof Prisma.PrismaClientInitializationError) {
        throw "Error Connecting to DB";
      }
      throw err;
    } finally {
      prisma.$disconnect;
    }
  },
  removeItemFromCart: async (userId: string, itemId: string) => {
    try {
      return await prisma.cart.delete({
        where: {
          user_id_cart_item_id: {
            user_id: userId,
            cart_item_id: itemId,
          },
        },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw "User Already Exists!";
        }
      }
      if (err instanceof Prisma.PrismaClientInitializationError) {
        throw "Error Connecting to DB";
      }
      throw err;
    } finally {
      prisma.$disconnect;
    }
  },
  updateItemQuantity: async (
    userId: string,
    itemId: string,
    action: string
  ) => {
    try {
      return await prisma.cart.update({
        where: {
          user_id_cart_item_id: {
            user_id: userId,
            cart_item_id: itemId,
          },
        },
        data: {
          cart_item_quantity: {
            increment: action === "increment" ? 1 : -1,
          },
        },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw "User Already Exists!";
        }
      }
      if (err instanceof Prisma.PrismaClientInitializationError) {
        throw "Error Connecting to DB";
      }
      throw err;
    } finally {
      prisma.$disconnect;
    }
  },
};

export default CartDbService;
