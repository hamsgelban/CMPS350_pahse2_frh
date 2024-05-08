/*
  Warnings:

  - You are about to drop the column `artistId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `sold` on the `Item` table. All the data in the column will be lost.
  - Added the required column `artistID` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "currency" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "available_quantity" INTEGER NOT NULL,
    "quantity_to_buy" INTEGER NOT NULL DEFAULT 0,
    "categoryId" INTEGER NOT NULL,
    "artistID" INTEGER NOT NULL,
    CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_artistID_fkey" FOREIGN KEY ("artistID") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("available_quantity", "categoryId", "currency", "description", "id", "image_url", "price", "quantity_to_buy", "title") SELECT "available_quantity", "categoryId", "currency", "description", "id", "image_url", "price", "quantity_to_buy", "title" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
