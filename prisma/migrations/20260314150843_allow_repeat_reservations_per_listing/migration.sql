-- DropIndex
DROP INDEX "ListingApplication_listingId_applicantId_key";

-- CreateIndex
CREATE INDEX "ListingApplication_listingId_applicantId_idx" ON "ListingApplication"("listingId", "applicantId");
