ALTER TABLE "User"
ADD COLUMN "expoPushToken" TEXT;

CREATE INDEX "User_expoPushToken_idx" ON "User"("expoPushToken");
