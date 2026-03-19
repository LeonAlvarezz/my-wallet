import logger from "@/lib/logger";
import { db } from "..";
import { seedBaseCategories } from "./seed-categories";

export async function seedDatabaseProd() {
  await db.transaction(async (tx) => {
    await seedBaseCategories(tx);
  });
}

async function main() {
  try {
    logger.info("🌱 Starting production database seeding...");
    await seedDatabaseProd();
    logger.info("✅ Production database seeding completed successfully!");
    process.exit(0);
  } catch (err) {
    logger.error("❌ Production seeding failed:", err);
    process.exit(1);
  }
}

if (import.meta.main) {
  main().catch((err) => {
    logger.error("❌ Unexpected error during production seeding:", err);
    process.exit(1);
  });
}
