/*
  Warnings:

  - You are about to drop the `Characters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Serie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Characters" DROP CONSTRAINT "Characters_serie_id_fkey";

-- DropTable
DROP TABLE "Characters";

-- DropTable
DROP TABLE "Serie";

-- CreateTable
CREATE TABLE "characters" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "nick_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "favoritePhrase" TEXT NOT NULL,
    "personalities" TEXT[],
    "enemies" TEXT[],
    "friends" TEXT[],
    "isProtagonit" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "serie_id" UUID NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "series" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "series_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "series_name_key" ON "series"("name");

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_serie_id_fkey" FOREIGN KEY ("serie_id") REFERENCES "series"("id") ON DELETE CASCADE ON UPDATE CASCADE;
