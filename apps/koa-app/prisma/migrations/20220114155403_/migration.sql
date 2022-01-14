-- CreateTable
CREATE TABLE "area" (
    "id" SERIAL NOT NULL,
    "area" VARCHAR NOT NULL,

    CONSTRAINT "PK_39d5e4de490139d6535d75f42ff" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "migrations" (
    "id" SERIAL NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "area_area_key" ON "area"("area");
