-- CreateTable
CREATE TABLE "CareReport" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "authorSitterId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "mediaUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "feedingNotes" TEXT,
    "activityNotes" TEXT,
    "toiletNotes" TEXT,
    "medicationNotes" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CareReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CareReport_applicationId_key" ON "CareReport"("applicationId");

-- CreateIndex
CREATE INDEX "CareReport_authorSitterId_idx" ON "CareReport"("authorSitterId");

-- CreateIndex
CREATE INDEX "CareReport_publishedAt_idx" ON "CareReport"("publishedAt");

-- AddForeignKey
ALTER TABLE "CareReport" ADD CONSTRAINT "CareReport_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "ListingApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareReport" ADD CONSTRAINT "CareReport_authorSitterId_fkey" FOREIGN KEY ("authorSitterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
