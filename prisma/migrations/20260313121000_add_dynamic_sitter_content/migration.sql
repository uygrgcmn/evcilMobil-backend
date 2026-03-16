-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "serviceIcon" TEXT,
ADD COLUMN     "serviceUnit" TEXT;

-- AlterTable
ALTER TABLE "Sitter" ADD COLUMN     "about" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "galleryImageUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "identityVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "repeatClientRate" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "yearsExperience" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "SitterReview" (
    "id" TEXT NOT NULL,
    "sitterId" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorAvatarUrl" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "timeLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SitterReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SitterReview_sitterId_idx" ON "SitterReview"("sitterId");

-- AddForeignKey
ALTER TABLE "SitterReview" ADD CONSTRAINT "SitterReview_sitterId_fkey" FOREIGN KEY ("sitterId") REFERENCES "Sitter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
