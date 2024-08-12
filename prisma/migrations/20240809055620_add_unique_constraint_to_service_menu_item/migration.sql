/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ServiceMenuItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ServiceMenuItem_name_key" ON "ServiceMenuItem"("name");
