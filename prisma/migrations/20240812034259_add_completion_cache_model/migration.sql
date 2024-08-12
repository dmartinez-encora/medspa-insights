-- CreateTable
CREATE TABLE "CompletionCache" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientId" INTEGER NOT NULL,
    "completion" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expirationAt" DATETIME NOT NULL,
    CONSTRAINT "CompletionCache_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "CompletionCache_clientId_expirationAt_idx" ON "CompletionCache"("clientId", "expirationAt");
