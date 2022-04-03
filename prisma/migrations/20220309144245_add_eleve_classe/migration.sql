-- CreateTable
CREATE TABLE "Eleve" (
    "id_" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "classeId_" INTEGER NOT NULL,

    CONSTRAINT "Eleve_pkey" PRIMARY KEY ("id_")
);

-- CreateTable
CREATE TABLE "Classe" (
    "id_" SERIAL NOT NULL,

    CONSTRAINT "Classe_pkey" PRIMARY KEY ("id_")
);

-- AddForeignKey
ALTER TABLE "Eleve" ADD CONSTRAINT "Eleve_classeId__fkey" FOREIGN KEY ("classeId_") REFERENCES "Classe"("id_") ON DELETE RESTRICT ON UPDATE CASCADE;
