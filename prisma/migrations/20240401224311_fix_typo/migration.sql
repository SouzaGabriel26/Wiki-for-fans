/*
  Warnings:

  - You are about to drop the column `is_protagonit` on the `characters` table. All the data in the column will be lost.
  - Added the required column `is_protagonist` to the `characters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "characters" DROP COLUMN "is_protagonit",
ADD COLUMN     "is_protagonist" BOOLEAN NOT NULL;
