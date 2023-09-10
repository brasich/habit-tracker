-- CreateTable
CREATE TABLE "GoalSnapshot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "snapshotTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "current_val" TEXT NOT NULL
);
