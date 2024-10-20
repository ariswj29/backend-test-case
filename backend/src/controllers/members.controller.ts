import { request, response } from "express";
import prisma from "../config/prisma";

export const getMembers = async (req = request, res = response) => {
  try {
    const members = await prisma.member.findMany();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
