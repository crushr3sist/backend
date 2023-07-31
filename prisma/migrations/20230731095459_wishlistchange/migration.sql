/*
  Warnings:

  - You are about to drop the column `current_price` on the `Wishlist` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Wishlist` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `Wishlist` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Wishlist` table. All the data in the column will be lost.
  - Added the required column `wishlistName` to the `Wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "WishlistItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT,
    "product" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "current_price" INTEGER NOT NULL,
    "wishlistId" INTEGER,
    CONSTRAINT "WishlistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "WishlistItem_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wishlist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT,
    "wishlistName" TEXT NOT NULL,
    CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Wishlist" ("id", "userId") SELECT "id", "userId" FROM "Wishlist";
DROP TABLE "Wishlist";
ALTER TABLE "new_Wishlist" RENAME TO "Wishlist";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
