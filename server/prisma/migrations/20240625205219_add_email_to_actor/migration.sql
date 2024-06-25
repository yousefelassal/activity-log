/*
  Warnings:

  - Added the required column `email` to the `Actor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Actor" ADD COLUMN     "email" TEXT NOT NULL;
