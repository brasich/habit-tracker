-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Goal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "reset_frequency" TEXT NOT NULL,
    "reset_to" TEXT NOT NULL DEFAULT '',
    "current_val" TEXT NOT NULL
);
INSERT INTO "new_Goal" ("createdAt", "current_val", "description", "id", "name", "reset_frequency", "target", "type", "updatedAt") SELECT "createdAt", "current_val", "description", "id", "name", "reset_frequency", "target", "type", "updatedAt" FROM "Goal";
DROP TABLE "Goal";
ALTER TABLE "new_Goal" RENAME TO "Goal";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
