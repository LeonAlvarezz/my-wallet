import logger from "@/lib/logger";
import { seedDatabaseDev } from "./seed-dev";
import { seedDatabaseProd } from "./seed-prod";

function getSeedMode(args: string[]) {
  if (args.includes("--prod") || args.includes("prod")) {
    return "prod";
  }

  if (args.includes("--dev") || args.includes("dev") || args.length === 0) {
    return "dev";
  }

  return null;
}

async function main() {
  const args = process.argv.slice(2);
  const mode = getSeedMode(args);

  if (!mode) {
    logger.error("❌ Invalid seed mode. Use --dev or --prod.");
    process.exit(1);
  }

  logger.info(`🌱 Running ${mode} seed...`);

  if (mode === "prod") {
    await seedDatabaseProd();
  } else {
    await seedDatabaseDev();
  }

  logger.info(`✅ ${mode} seed completed successfully!`);
}

main().catch((err) => {
  logger.error("❌ Unexpected error during seeding:", err);
  process.exit(1);
});
