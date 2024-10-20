import prisma from "../src/config/prisma";
import books from "./data/books.json";
import members from "./data/members.json";

async function main() {
  for (const book of books) {
    await prisma.book.create({
      data: book,
    });
  }

  for (const member of members) {
    await prisma.member.create({
      data: member,
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
