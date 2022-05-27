-- CreateTable
CREATE TABLE "Tiles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messageId" INTEGER NOT NULL,
    "chatId" TEXT NOT NULL,
    "dateSend" TEXT NOT NULL,
    "colorSend" TEXT NOT NULL,
    "check" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "messageId" INTEGER NOT NULL,
    "chatId" TEXT NOT NULL,
    "tokenBot" TEXT NOT NULL
);
