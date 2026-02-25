import { db } from "..";
import { categoryTable } from "../schema/category.schema";
import { userTable } from "../schema/user.schema";
import { authTable } from "../schema/auth.schema";
import { hashPassword } from "@/util/password";
import logger from "@/lib/logger";
import { CategoryModel } from "@my-wallet/types";

async function seedDatabaseDev() {
  const baseCategories = [
    {
      name: "Food",
      icon: "solar:donut-bold-duotone",
      color: CategoryModel.CategoryColorEnum.GREEN,
      order: 1,
    },

    {
      name: "Coffee",
      icon: "solar:cup-paper-bold-duotone",
      color: CategoryModel.CategoryColorEnum.YELLOW,
      order: 2,
    },
    {
      name: "Transportation",
      icon: "solar:scooter-bold-duotone",
      color: CategoryModel.CategoryColorEnum.GRAY,
      order: 3,
    },
    {
      name: "Health",
      icon: "solar:health-bold-duotone",
      color: CategoryModel.CategoryColorEnum.RED,
      order: 4,
    },
    {
      name: "Utility",
      icon: "solar:lightbulb-bolt-bold-duotone",
      color: CategoryModel.CategoryColorEnum.ORANGE,
      order: 5,
    },

    {
      name: "Other",
      icon: "solar:menu-dots-bold-duotone",
      color: CategoryModel.CategoryColorEnum.DEFAULT,
      order: 6,
    },

    {
      name: "Travel",
      icon: "solar:bicycling-bold-duotone",
      color: CategoryModel.CategoryColorEnum.BLUE,
      order: 7,
    },

    {
      name: "Entertainment",
      icon: "solar:play-bold-duotone",
      color: CategoryModel.CategoryColorEnum.PURPLE,
      order: 8,
    },
    {
      name: "Shopping",
      icon: "solar:bag-bold-duotone",
      color: CategoryModel.CategoryColorEnum.PINK,
      order: 9,
    },
  ];
  const testUser = {
    username: "Test",
    email: "test@example.com",
    password: "Password@123",
  };

  await db.transaction(async (tx) => {
    const categoryInsert = baseCategories.map(async (category) => {
      await db.insert(categoryTable).values({
        color: category.color,
        icon: category.icon,
        name: category.name,
        order: category.order,
      });
    });
    await Promise.all(categoryInsert);
    logger.info("✅ Categories seeded successfully", {
      count: baseCategories.length,
    });

    const [result] = await db
      .insert(userTable)
      .values({
        username: testUser.username,
        email: testUser.email,
      })
      .returning({ id: userTable.id });

    // Hash password and insert auth record
    const passwordHash = await hashPassword(testUser.password);
    await db.insert(authTable).values({
      user_id: result.id,
      password_hash: passwordHash,
    });

    logger.info("✅ Test user created", {
      username: testUser.username,
      email: testUser.email,
    });
  });
}

async function main() {
  try {
    logger.info("🌱 Starting database seeding...");
    await seedDatabaseDev();
    logger.info("✅ Database seeding completed successfully!");
    process.exit(0);
  } catch (err) {
    logger.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

main().catch((err) => {
  logger.error("❌ Unexpected error during seeding:", err);
  process.exit(1);
});
