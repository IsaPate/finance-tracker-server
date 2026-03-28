import { prisma } from "../src/lib/prisma_client";

async function seedData() {
  const initialCategories = ["Supermarket", "Food", "Transport"];
  await prisma.category.createMany({
    data: initialCategories.map((category) => ({ title: category })),
  });
}

seedData()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
