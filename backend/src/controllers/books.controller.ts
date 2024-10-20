import { request, response } from "express";
import prisma from "../config/prisma";

export const getBooks = async (req = request, res = response) => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
