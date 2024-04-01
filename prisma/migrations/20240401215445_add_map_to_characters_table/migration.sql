/*
  Warnings:

  - You are about to drop the column `createdAt` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `favoritePhrase` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `isProtagonit` on the `characters` table. All the data in the column will be lost.
  - Added the required column `favorite_phrase` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_protagonit` to the `characters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "characters" DROP COLUMN "createdAt",
DROP COLUMN "favoritePhrase",
DROP COLUMN "isProtagonit",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "favorite_phrase" TEXT NOT NULL,
ADD COLUMN     "is_protagonit" BOOLEAN NOT NULL;
