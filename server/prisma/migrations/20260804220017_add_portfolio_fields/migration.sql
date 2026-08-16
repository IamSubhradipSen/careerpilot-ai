/*
  Warnings:

  - Added the required column `imageUrl` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `liveUrl` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "liveUrl" TEXT NOT NULL;
