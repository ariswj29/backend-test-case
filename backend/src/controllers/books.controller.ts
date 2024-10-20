import { Request, RequestHandler, Response } from "express";
import prisma from "../config/prisma";
import { v4 as uuidv4 } from "uuid";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const booksWithoutTransaction = await prisma.book.findMany({
      select: {
        title: true,
        code: true,
        author: true,
        stock: true,
      },
      where: {
        transactions: {
          none: {},
        },
      },
    });

    const count = await prisma.book.count({
      where: {
        transactions: {
          none: {},
        },
      },
    });

    res.status(200).json({ books: booksWithoutTransaction, count });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const borrowBook: RequestHandler = async (req, res) => {
  try {
    const { memberId, bookId } = req.body;

    const member = await prisma.member.findUnique({
      where: { id: memberId },
    });

    const borrowedBooks = await prisma.transaction.findMany({
      where: { memberId, returnDate: null },
    });

    if (!member) {
      res.status(404).json({ message: "Member not found" });
      return;
    }

    if (
      member.isPenalty &&
      member.penaltyDate &&
      new Date() < member.penaltyDate
    ) {
      res
        .status(400)
        .json({ message: "Member has penalty, can't borrow book" });
      return;
    }

    if (borrowedBooks.length > 0 && borrowedBooks[0].returnDate === null) {
      res.status(400).json({ message: "Member just can borrow 1 books" });
      return;
    }

    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    if (book.stock === 0) {
      res.status(400).json({ message: "Book out of stock" });
      return;
    }

    await prisma.transaction.create({
      data: {
        id: uuidv4(),
        transactionDate: new Date(),
        book: { connect: { id: bookId } },
        member: { connect: { id: memberId } },
      },
    });

    await prisma.book.update({
      where: { id: bookId },
      data: { stock: { decrement: 1 } },
    });

    await prisma.member.update({
      where: { id: memberId },
      data: { isPenalty: false, penaltyDate: null },
    });

    res.status(200).json({ message: "Book borrowed successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const returnBook: RequestHandler = async (req, res) => {
  try {
    const { memberId, bookId } = req.body;

    const member = await prisma.member.findUnique({
      where: { id: memberId },
    });

    if (!member) {
      res.status(404).json({ message: "Member not found" });
      return;
    }

    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    const transaction = await prisma.transaction.findFirst({
      where: {
        memberId,
        bookId,
        returnDate: null,
      },
    });

    if (!transaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }

    await prisma.transaction.update({
      where: { id: transaction.id },
      data: { returnDate: new Date() },
    });

    await prisma.book.update({
      where: { id: bookId },
      data: { stock: { increment: 1 } },
    });

    // 3 hari = 259200000 ms
    const penaltyDate = new Date().getTime() + 259200000;

    // 7 hari = 604800000 ms
    if (
      new Date().getTime() >
      new Date(transaction.transactionDate).getTime() + 604800000
    ) {
      await prisma.member.update({
        where: { id: memberId },
        data: { isPenalty: true, penaltyDate: new Date(penaltyDate) },
      });

      res
        .status(200)
        .json({ message: "Book returned successfully and Member has penalty" });
    } else {
      res.status(200).json({ message: "Book returned successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
