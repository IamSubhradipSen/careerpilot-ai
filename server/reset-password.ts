
import prisma from "./src/shared/database/prisma.js";
import { hashPassword } from "./src/shared/security/hash.js";
import { config } from "dotenv";

config();

async function main() {
  const email = "subhradipsen20@gmail.com";

  // Enter a new password locally when running this script.
  const newPassword = process.env.RESET_PASSWORD;

  if (!newPassword || newPassword.length < 12) {
    throw new Error(
      "Set RESET_PASSWORD to a new password of at least 12 characters."
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true },
  });

  if (!user) {
    throw new Error("Account not found. No database changes were made.");
  }

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  console.log(`Password reset successfully for ${user.email}`);
}

main()
  .catch((error) => {
    console.error("Password reset failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
