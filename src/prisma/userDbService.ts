import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

const UserDbService = {
  createUser: async (username: string, hashedPass: string, userId: string) => {
    try {
      return await prisma.user.create({
        data: {
          user_id: userId,
          username: username,
          password: hashedPass,
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

  // validateUser: async (email: string, hashedPass: string) => {
  //   try {
  //     return await prisma.user.findUnique({
  //       where: {
  //         email: email,
  //         pass: hashedPass,
  //       },
  //       include: {
  //         Shops: {
  //           select: {
  //             shop_id: true,
  //           },
  //         },
  //       },
  //     });
  //   } catch (err) {
  //     throw err;
  //   } finally {
  //     prisma.$disconnect;
  //   }
  // },

  // getUserDetails: async (userId: string) => {
  //   try {
  //     const userDetails = await prisma.user.findUnique({
  //       where: {
  //         user_id: userId,
  //       },
  //     });
  //     return userDetails;
  //   } catch (err) {
  //     throw err;
  //   } finally {
  //     prisma.$disconnect;
  //   }
  // },
};

export default UserDbService;
