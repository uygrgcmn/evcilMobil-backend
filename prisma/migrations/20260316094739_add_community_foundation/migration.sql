-- CreateEnum
CREATE TYPE "CommunityListingCategory" AS ENUM ('ADOPTION', 'FOOD_SUPPORT');

-- CreateEnum
CREATE TYPE "CommunityListingStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "CommunityPublisherType" AS ENUM ('INDIVIDUAL', 'SHELTER');

-- CreateEnum
CREATE TYPE "CommunityUrgency" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "CommunityListing" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "CommunityListingCategory" NOT NULL,
    "status" "CommunityListingStatus" NOT NULL DEFAULT 'OPEN',
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "publisherType" "CommunityPublisherType" NOT NULL DEFAULT 'INDIVIDUAL',
    "organizationName" TEXT,
    "contactPhone" TEXT,
    "imageUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "animalName" TEXT,
    "animalType" TEXT,
    "breed" TEXT,
    "ageText" TEXT,
    "gender" TEXT,
    "size" TEXT,
    "healthNotes" TEXT,
    "houseRules" TEXT,
    "adoptionNotes" TEXT,
    "quantityNeeded" TEXT,
    "preferredFoodBrand" TEXT,
    "supportDetails" TEXT,
    "urgency" "CommunityUrgency" NOT NULL DEFAULT 'MEDIUM',
    "publishedByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunityListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityApplication" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "message" TEXT,
    "contactPhone" TEXT,
    "offeredQuantity" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunityApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CommunityListing_category_idx" ON "CommunityListing"("category");

-- CreateIndex
CREATE INDEX "CommunityListing_status_idx" ON "CommunityListing"("status");

-- CreateIndex
CREATE INDEX "CommunityListing_city_idx" ON "CommunityListing"("city");

-- CreateIndex
CREATE INDEX "CommunityListing_district_idx" ON "CommunityListing"("district");

-- CreateIndex
CREATE INDEX "CommunityListing_publisherType_idx" ON "CommunityListing"("publisherType");

-- CreateIndex
CREATE INDEX "CommunityListing_urgency_idx" ON "CommunityListing"("urgency");

-- CreateIndex
CREATE INDEX "CommunityListing_publishedByUserId_idx" ON "CommunityListing"("publishedByUserId");

-- CreateIndex
CREATE INDEX "CommunityListing_updatedAt_idx" ON "CommunityListing"("updatedAt");

-- CreateIndex
CREATE INDEX "CommunityApplication_listingId_applicantId_idx" ON "CommunityApplication"("listingId", "applicantId");

-- CreateIndex
CREATE INDEX "CommunityApplication_status_idx" ON "CommunityApplication"("status");

-- CreateIndex
CREATE INDEX "CommunityApplication_applicantId_idx" ON "CommunityApplication"("applicantId");

-- AddForeignKey
ALTER TABLE "CommunityListing" ADD CONSTRAINT "CommunityListing_publishedByUserId_fkey" FOREIGN KEY ("publishedByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityApplication" ADD CONSTRAINT "CommunityApplication_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "CommunityListing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityApplication" ADD CONSTRAINT "CommunityApplication_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
