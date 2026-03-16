ALTER TABLE "ListingApplication"
ADD COLUMN "startDate" TIMESTAMP(3),
ADD COLUMN "endDate" TIMESTAMP(3);

CREATE INDEX "ListingApplication_startDate_endDate_idx" ON "ListingApplication"("startDate", "endDate");

CREATE TABLE "SitterAvailabilityDay" (
    "id" TEXT NOT NULL,
    "sitterId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SitterAvailabilityDay_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "SitterAvailabilityDay_sitterId_date_key" ON "SitterAvailabilityDay"("sitterId", "date");
CREATE INDEX "SitterAvailabilityDay_date_idx" ON "SitterAvailabilityDay"("date");

ALTER TABLE "SitterAvailabilityDay"
ADD CONSTRAINT "SitterAvailabilityDay_sitterId_fkey"
FOREIGN KEY ("sitterId") REFERENCES "Sitter"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
