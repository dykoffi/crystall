/*
  Warnings:

  - You are about to drop the `Classe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Eleve` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Eleve" DROP CONSTRAINT "Eleve_classeId__fkey";

-- DropTable
DROP TABLE "Classe";

-- DropTable
DROP TABLE "Eleve";

-- CreateTable
CREATE TABLE "User" (
    "id_" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contribuableId" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "cni_number" TEXT NOT NULL,
    "createdAt_" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "connectionId_" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_")
);

-- CreateTable
CREATE TABLE "Connection_" (
    "id_" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "pwd" TEXT NOT NULL,
    "createdAt_" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Connection__pkey" PRIMARY KEY ("id_")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id_" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId_" INTEGER NOT NULL,
    "createdAt_" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId_" INTEGER,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id_")
);

-- CreateTable
CREATE TABLE "Category" (
    "id_" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id_")
);

-- CreateTable
CREATE TABLE "Taxe" (
    "id_" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "annual_value" INTEGER NOT NULL,
    "createdAt_" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Taxe_pkey" PRIMARY KEY ("id_")
);

-- CreateTable
CREATE TABLE "_ActivityToTaxe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_connectionId__key" ON "User"("connectionId_");

-- CreateIndex
CREATE UNIQUE INDEX "Connection__login_key" ON "Connection_"("login");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityToTaxe_AB_unique" ON "_ActivityToTaxe"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityToTaxe_B_index" ON "_ActivityToTaxe"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_connectionId__fkey" FOREIGN KEY ("connectionId_") REFERENCES "Connection_"("id_") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId__fkey" FOREIGN KEY ("userId_") REFERENCES "User"("id_") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_categoryId__fkey" FOREIGN KEY ("categoryId_") REFERENCES "Category"("id_") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityToTaxe" ADD FOREIGN KEY ("A") REFERENCES "Activity"("id_") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityToTaxe" ADD FOREIGN KEY ("B") REFERENCES "Taxe"("id_") ON DELETE CASCADE ON UPDATE CASCADE;
