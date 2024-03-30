/*
  Warnings:

  - Added the required column `episodes` to the `series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasons` to the `series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `series` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('FINISHED', 'CANCELED', 'IN_PROGRESS');

-- AlterTable
ALTER TABLE "characters" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "series" ADD COLUMN     "episodes" INTEGER NOT NULL,
ADD COLUMN     "platforms" TEXT[],
ADD COLUMN     "seasons" INTEGER NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL;
