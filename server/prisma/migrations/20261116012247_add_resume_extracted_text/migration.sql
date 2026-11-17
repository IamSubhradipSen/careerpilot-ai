-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "extractedText" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "fileSize" INTEGER,
ADD COLUMN     "mimeType" TEXT;
