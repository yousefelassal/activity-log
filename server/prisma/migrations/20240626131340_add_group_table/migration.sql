/*
  Warnings:

  - You are about to drop the column `group` on the `Actor` table. All the data in the column will be lost.
  - Added the required column `group_id` to the `Actor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Actor" DROP COLUMN "group",
ADD COLUMN     "group_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Actor" ADD CONSTRAINT "Actor_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
