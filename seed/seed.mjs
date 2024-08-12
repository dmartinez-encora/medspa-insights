import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Determine the current directory equivalent to __dirname in CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

const jsonsToSeed = ["serviceMenuItem", "client", "appointment"];

const excludeList = ["serviceMenuItem", "client", "appointment"];

async function seedModel(jsonName) {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, `${jsonName}.json`), "utf-8")
  );

  if (jsonName === "serviceMenuItem" && !excludeList.includes(jsonName)) {
    const serviceMenuItems = data["serviceMenuItems"];
    for (const serviceMenuItem of serviceMenuItems) {
      await prisma.serviceMenuItem.create({
        data: {
          ...serviceMenuItem,
        },
      });
      continue;
    }
  }
  if (jsonName === "client" && !excludeList.includes(jsonName)) {
    const clients = data["clients"];
    for (const client of clients) {
      await prisma.client.create({
        data: {
          ...client,
        },
      });
      continue;
    }
  }
  if (jsonName === "appointment" && !excludeList.includes(jsonName)) {
    const appointments = data["appointments"];
    for (const appointment of appointments) {
      await prisma.appointment.create({
        data: {
          ...appointment,
        },
      });
      continue;
    }
  }
}

async function main() {
  for (const json of jsonsToSeed) {
    await seedModel(json);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
