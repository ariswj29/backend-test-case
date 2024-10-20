import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getMembers = async (req: Request, res: Response) => {
  try {
    const members = (await prisma.member.findMany({
      select: {
        id: true,
        code: true,
        name: true,
      },
    })) as Array<{
      id: string;
      code: string;
      name: string;
      borrowedBooks?: number;
    }>;

    const books = await prisma.transaction.findMany({
      select: {
        id: true,
        memberId: true,
      },
      where: {
        memberId: { in: members.map((member) => member.id) },
      },
    });

    members.forEach((member) => {
      member.borrowedBooks = books.filter(
        (book) => book.memberId === member.id
      ).length;
    });

    res.status(200).json({ members });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
