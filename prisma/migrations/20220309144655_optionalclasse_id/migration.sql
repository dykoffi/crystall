-- DropForeignKey
ALTER TABLE "Eleve" DROP CONSTRAINT "Eleve_classeId__fkey";

-- AlterTable
ALTER TABLE "Eleve" ALTER COLUMN "classeId_" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Eleve" ADD CONSTRAINT "Eleve_classeId__fkey" FOREIGN KEY ("classeId_") REFERENCES "Classe"("id_") ON DELETE SET NULL ON UPDATE CASCADE;
