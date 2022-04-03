/*
  Warnings:

  - Added the required column `name` to the `Classe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classe" ADD COLUMN     "name" TEXT NOT NULL;
