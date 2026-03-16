-- AlterTable
ALTER TABLE "MessageThread"
ADD COLUMN "ownerUserId" TEXT,
ADD COLUMN "sitterUserId" TEXT,
ADD COLUMN "listingId" TEXT,
ADD COLUMN "ownerUnreadCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "sitterUnreadCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "lastMessageAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "senderUserId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MessageThread_ownerUserId_idx" ON "MessageThread"("ownerUserId");
CREATE INDEX "MessageThread_sitterUserId_idx" ON "MessageThread"("sitterUserId");
CREATE INDEX "MessageThread_lastMessageAt_idx" ON "MessageThread"("lastMessageAt");
CREATE INDEX "Message_threadId_createdAt_idx" ON "Message"("threadId", "createdAt");
CREATE INDEX "Message_senderUserId_idx" ON "Message"("senderUserId");

-- AddForeignKey
ALTER TABLE "MessageThread"
ADD CONSTRAINT "MessageThread_ownerUserId_fkey"
FOREIGN KEY ("ownerUserId") REFERENCES "User"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "MessageThread"
ADD CONSTRAINT "MessageThread_sitterUserId_fkey"
FOREIGN KEY ("sitterUserId") REFERENCES "User"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "MessageThread"
ADD CONSTRAINT "MessageThread_listingId_fkey"
FOREIGN KEY ("listingId") REFERENCES "Listing"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Message"
ADD CONSTRAINT "Message_threadId_fkey"
FOREIGN KEY ("threadId") REFERENCES "MessageThread"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Message"
ADD CONSTRAINT "Message_senderUserId_fkey"
FOREIGN KEY ("senderUserId") REFERENCES "User"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
