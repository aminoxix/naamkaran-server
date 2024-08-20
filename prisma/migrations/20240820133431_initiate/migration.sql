/*
  Warnings:

  - You are about to drop the column `word` on the `prompts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "prompts" DROP COLUMN "word";
ALTER TABLE "prompts" ADD COLUMN     "worded" "WordedEnum";
