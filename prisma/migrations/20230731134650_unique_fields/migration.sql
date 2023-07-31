/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Wishlist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[wishlistName]` on the table `Wishlist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product]` on the table `WishlistItem` will be added. If there are existing duplicate values, this will fail.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "id", "password", "username") SELECT "email", "id", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_key" ON "Wishlist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_wishlistName_key" ON "Wishlist"("wishlistName");

-- CreateIndex
CREATE UNIQUE INDEX "WishlistItem_product_key" ON "WishlistItem"("product");
