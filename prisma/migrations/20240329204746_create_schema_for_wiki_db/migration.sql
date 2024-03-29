-- CreateTable
CREATE TABLE "Characters" (
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "serie_id" UUID NOT NULL,

    CONSTRAINT "Characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Serie" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Serie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Serie_name_key" ON "Serie"("name");

-- AddForeignKey
ALTER TABLE "Characters" ADD CONSTRAINT "Characters_serie_id_fkey" FOREIGN KEY ("serie_id") REFERENCES "Serie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
