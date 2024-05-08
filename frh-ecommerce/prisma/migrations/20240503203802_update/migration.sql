/*
  Warnings:

  - You are about to drop the column `availableQuantity` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `quantityToBuy` on the `Item` table. All the data in the column will be lost.
  - Added the required column `available_quantity` to the `Item` table without a default value. This is not possible if the table is not empty.

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
    "sold" INTEGER NOT NULL DEFAULT 0,
    "categoryId" INTEGER NOT NULL,
    "artistId" INTEGER NOT NULL,
    CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("artistId", "categoryId", "currency", "description", "id", "image_url", "price", "sold", "title") SELECT "artistId", "categoryId", "currency", "description", "id", "image_url", "price", "sold", "title" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;