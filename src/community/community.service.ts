import {
  ApplicationStatus,
  CommunityListingCategory,
  CommunityListingStatus,
  CommunityPublisherType,
  CommunityUrgency,
  Prisma,
  UserRole,
} from '@prisma/client';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { AuthenticatedUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';

const communityListingInclude = {
  publishedByUser: {
    select: {
      id: true,
      email: true,
      role: true,
      ownerProfile: {
        select: {
          fullName: true,
          avatarUrl: true,
        },
      },
      sitterProfile: {
        select: {
          fullName: true,
          avatarUrl: true,
        },
      },
    },
  },
  applications: {
    select: {
      id: true,
      status: true,
    },
  },
} as const;

const communityApplicationInclude = {
  listing: {
    include: {
      publishedByUser: {
        select: {
          id: true,
          email: true,
          role: true,
          ownerProfile: {
            select: {
              fullName: true,
              avatarUrl: true,
            },
          },
          sitterProfile: {
            select: {
              fullName: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
  },
  applicant: {
    select: {
      id: true,
      email: true,
      role: true,
      ownerProfile: {
        select: {
          fullName: true,
          avatarUrl: true,
        },
      },
      sitterProfile: {
        select: {
          fullName: true,
          avatarUrl: true,
        },
      },
    },
  },
} as const;

type CommunityListingRecord = Prisma.CommunityListingGetPayload<{
  include: typeof communityListingInclude;
}>;

type CommunityApplicationRecord = Prisma.CommunityApplicationGetPayload<{
  include: typeof communityApplicationInclude;
}>;

type FeedFilters = {
  category?: string;
  city?: string;
  district?: string;
  publisherType?: string;
  includeClosed?: boolean;
};

type CreateCommunityListingInput = {
  title?: string;
  description?: string;
  category?: string;
  city?: string;
  district?: string;
  publisherType?: string;
  organizationName?: string;
  contactPhone?: string;
  imageUrls?: string[];
  animalName?: string;
  animalType?: string;
  breed?: string;
  ageText?: string;
  gender?: string;
  size?: string;
  healthNotes?: string;
  houseRules?: string;
  adoptionNotes?: string;
  quantityNeeded?: string;
  preferredFoodBrand?: string;
  supportDetails?: string;
  urgency?: string;
};

type CreateCommunityApplicationInput = {
  listingId?: string;
  message?: string;
  contactPhone?: string;
  offeredQuantity?: string;
};

type UserPreview = {
  id: string;
  email: string;
  role: UserRole;
  ownerProfile?: { fullName: string; avatarUrl: string } | null;
  sitterProfile?: { fullName: string; avatarUrl: string } | null;
};

@Injectable()
export class CommunityService {
  constructor(private readonly prisma: PrismaService) {}

  async getFeed(filters: FeedFilters) {
    const category = this.parseCategory(filters.category);
    const publisherType = this.parsePublisherType(filters.publisherType);

    const listings = await this.prisma.communityListing.findMany({
      where: {
        category: category ?? undefined,
        publisherType: publisherType ?? undefined,
        city: filters.city?.trim()
          ? { equals: filters.city.trim(), mode: 'insensitive' }
          : undefined,
        district: filters.district?.trim()
          ? { equals: filters.district.trim(), mode: 'insensitive' }
          : undefined,
        status: filters.includeClosed ? undefined : CommunityListingStatus.OPEN,
      },
      include: communityListingInclude,
      orderBy: [
        { status: 'asc' },
        { urgency: 'desc' },
        { updatedAt: 'desc' },
      ],
      take: 50,
    });

    return listings.map((listing) => this.mapListing(listing));
  }

  async getMyListings(user: AuthenticatedUser) {
    const listings = await this.prisma.communityListing.findMany({
      where: {
        publishedByUserId: user.id,
      },
      include: communityListingInclude,
      orderBy: [{ status: 'asc' }, { updatedAt: 'desc' }],
    });

    return listings.map((listing) => this.mapListing(listing));
  }

  async getById(id: string) {
    const listing = await this.prisma.communityListing.findUnique({
      where: { id },
      include: communityListingInclude,
    });

    if (!listing) {
      throw new NotFoundException('Community listing not found');
    }

    return this.mapListing(listing);
  }

  async createListing(user: AuthenticatedUser, input: CreateCommunityListingInput) {
    const title = this.validateText(input.title, 'title');
    const description = this.validateText(input.description, 'description');
    const city = this.validateText(input.city, 'city');
    const district = this.validateText(input.district, 'district');
    const category = this.requireCategory(input.category);
    const publisherType = this.parsePublisherType(input.publisherType) ?? CommunityPublisherType.INDIVIDUAL;
    const organizationName = this.optionalText(input.organizationName, 120);
    const contactPhone = this.optionalText(input.contactPhone, 32);
    const urgency = this.parseUrgency(input.urgency) ?? CommunityUrgency.MEDIUM;
    const imageUrls = this.normalizeStringArray(input.imageUrls, 'imageUrls', 8, 4000);

    if (
      publisherType === CommunityPublisherType.SHELTER &&
      !organizationName
    ) {
      throw new BadRequestException('organizationName is required for shelters');
    }

    const animalName = this.optionalText(input.animalName, 80);
    const animalType = this.optionalText(input.animalType, 80);
    const breed = this.optionalText(input.breed, 80);
    const ageText = this.optionalText(input.ageText, 80);
    const gender = this.optionalText(input.gender, 40);
    const size = this.optionalText(input.size, 40);
    const healthNotes = this.optionalText(input.healthNotes, 600);
    const houseRules = this.optionalText(input.houseRules, 600);
    const adoptionNotes = this.optionalText(input.adoptionNotes, 600);
    const quantityNeeded = this.optionalText(input.quantityNeeded, 120);
    const preferredFoodBrand = this.optionalText(input.preferredFoodBrand, 120);
    const supportDetails = this.optionalText(input.supportDetails, 600);

    if (category === CommunityListingCategory.ADOPTION) {
      if (!animalName) {
        throw new BadRequestException('animalName is required for adoption listings');
      }

      if (!animalType) {
        throw new BadRequestException('animalType is required for adoption listings');
      }
    }

    if (category === CommunityListingCategory.FOOD_SUPPORT && !quantityNeeded) {
      throw new BadRequestException('quantityNeeded is required for food support listings');
    }

    const created = await this.prisma.communityListing.create({
      data: {
        title,
        description,
        category,
        city,
        district,
        publisherType,
        organizationName,
        contactPhone,
        imageUrls,
        animalName,
        animalType,
        breed,
        ageText,
        gender,
        size,
        healthNotes,
        houseRules,
        adoptionNotes,
        quantityNeeded,
        preferredFoodBrand,
        supportDetails,
        urgency,
        publishedByUserId: user.id,
      },
      include: communityListingInclude,
    });

    return this.mapListing(created);
  }

  async getInbox(user: AuthenticatedUser, rawStatus?: string) {
    const status = this.parseStatus(rawStatus);

    const applications = await this.prisma.communityApplication.findMany({
      where: {
        listing: {
          publishedByUserId: user.id,
        },
        status: status ?? undefined,
      },
      include: communityApplicationInclude,
      orderBy: [{ createdAt: 'desc' }],
    });

    return applications.map((application) => this.mapApplication(application));
  }

  async getOutbox(user: AuthenticatedUser, rawStatus?: string) {
    const status = this.parseStatus(rawStatus);

    const applications = await this.prisma.communityApplication.findMany({
      where: {
        applicantId: user.id,
        status: status ?? undefined,
      },
      include: communityApplicationInclude,
      orderBy: [{ createdAt: 'desc' }],
    });

    return applications.map((application) => this.mapApplication(application));
  }

  async createApplication(
    user: AuthenticatedUser,
    input: CreateCommunityApplicationInput,
  ) {
    if (typeof input.listingId !== 'string' || !input.listingId.trim()) {
      throw new BadRequestException('listingId is required');
    }

    const listingId = input.listingId.trim();
    const listing = await this.prisma.communityListing.findUnique({
      where: { id: listingId },
      select: {
        id: true,
        title: true,
        category: true,
        status: true,
        publishedByUserId: true,
      },
    });

    if (!listing) {
      throw new NotFoundException('Community listing not found');
    }

    if (listing.status !== CommunityListingStatus.OPEN) {
      throw new BadRequestException('Listing is closed');
    }

    if (listing.publishedByUserId === user.id) {
      throw new BadRequestException('You cannot apply to your own listing');
    }

    const existingActiveApplication = await this.prisma.communityApplication.findFirst({
      where: {
        listingId: listing.id,
        applicantId: user.id,
        status: {
          in: [ApplicationStatus.PENDING, ApplicationStatus.ACCEPTED],
        },
      },
      select: { id: true },
    });

    if (existingActiveApplication) {
      throw new BadRequestException('You already have an active application for this listing');
    }

    const created = await this.prisma.communityApplication.create({
      data: {
        listingId: listing.id,
        applicantId: user.id,
        message: this.optionalText(input.message, 800),
        contactPhone: this.optionalText(input.contactPhone, 32),
        offeredQuantity: this.optionalText(input.offeredQuantity, 120),
      },
      include: communityApplicationInclude,
    });

    return this.mapApplication(created);
  }

  async decideApplication(
    user: AuthenticatedUser,
    applicationId: string,
    rawAction?: string,
  ) {
    const action = this.parseDecision(rawAction);
    const application = await this.prisma.communityApplication.findUnique({
      where: { id: applicationId },
      include: communityApplicationInclude,
    });

    if (!application) {
      throw new NotFoundException('Community application not found');
    }

    if (application.listing.publishedByUserId !== user.id) {
      throw new ForbiddenException('Only listing publisher can decide this application');
    }

    if (application.status !== ApplicationStatus.PENDING) {
      throw new BadRequestException('Only pending applications can be decided');
    }

    if (action === 'REJECT') {
      const rejected = await this.prisma.communityApplication.update({
        where: { id: application.id },
        data: { status: ApplicationStatus.REJECTED },
        include: communityApplicationInclude,
      });

      return this.mapApplication(rejected);
    }

    await this.prisma.$transaction(async (tx) => {
      const acceptedForListing = await tx.communityApplication.findFirst({
        where: {
          listingId: application.listingId,
          status: ApplicationStatus.ACCEPTED,
          id: { not: application.id },
        },
        select: { id: true },
      });

      if (acceptedForListing) {
        throw new BadRequestException('Another application is already accepted for this listing');
      }

      await tx.communityApplication.update({
        where: { id: application.id },
        data: { status: ApplicationStatus.ACCEPTED },
      });

      await tx.communityApplication.updateMany({
        where: {
          listingId: application.listingId,
          id: { not: application.id },
          status: ApplicationStatus.PENDING,
        },
        data: { status: ApplicationStatus.REJECTED },
      });

      await tx.communityListing.update({
        where: { id: application.listingId },
        data: { status: CommunityListingStatus.CLOSED },
      });
    });

    const updated = await this.prisma.communityApplication.findUnique({
      where: { id: application.id },
      include: communityApplicationInclude,
    });

    if (!updated) {
      throw new NotFoundException('Community application not found after update');
    }

    return this.mapApplication(updated);
  }

  async cancelApplication(user: AuthenticatedUser, applicationId: string) {
    const application = await this.prisma.communityApplication.findUnique({
      where: { id: applicationId },
      include: communityApplicationInclude,
    });

    if (!application) {
      throw new NotFoundException('Community application not found');
    }

    const isApplicant = application.applicantId === user.id;
    const isPublisher = application.listing.publishedByUserId === user.id;

    if (!isApplicant && !isPublisher) {
      throw new ForbiddenException('Not allowed to cancel this application');
    }

    if (
      application.status === ApplicationStatus.CANCELLED ||
      application.status === ApplicationStatus.REJECTED
    ) {
      throw new BadRequestException('Application is already closed');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.communityApplication.update({
        where: { id: application.id },
        data: { status: ApplicationStatus.CANCELLED },
      });

      if (application.status === ApplicationStatus.ACCEPTED) {
        const remainingAccepted = await tx.communityApplication.count({
          where: {
            listingId: application.listingId,
            status: ApplicationStatus.ACCEPTED,
            id: { not: application.id },
          },
        });

        if (remainingAccepted === 0) {
          await tx.communityListing.update({
            where: { id: application.listingId },
            data: { status: CommunityListingStatus.OPEN },
          });
        }
      }
    });

    const updated = await this.prisma.communityApplication.findUnique({
      where: { id: application.id },
      include: communityApplicationInclude,
    });

    if (!updated) {
      throw new NotFoundException('Community application not found after cancel');
    }

    return this.mapApplication(updated);
  }

  private mapListing(listing: CommunityListingRecord) {
    const pendingApplicationCount = listing.applications.filter(
      (application) => application.status === ApplicationStatus.PENDING,
    ).length;
    const acceptedApplication = listing.applications.find(
      (application) => application.status === ApplicationStatus.ACCEPTED,
    );

    return {
      id: listing.id,
      title: listing.title,
      description: listing.description,
      category: listing.category,
      status: listing.status,
      city: listing.city,
      district: listing.district,
      publisherType: listing.publisherType,
      organizationName: listing.organizationName,
      contactPhone: listing.contactPhone,
      imageUrls: listing.imageUrls,
      animalName: listing.animalName,
      animalType: listing.animalType,
      breed: listing.breed,
      ageText: listing.ageText,
      gender: listing.gender,
      size: listing.size,
      healthNotes: listing.healthNotes,
      houseRules: listing.houseRules,
      adoptionNotes: listing.adoptionNotes,
      quantityNeeded: listing.quantityNeeded,
      preferredFoodBrand: listing.preferredFoodBrand,
      supportDetails: listing.supportDetails,
      urgency: listing.urgency,
      applicationCount: listing.applications.length,
      pendingApplicationCount,
      acceptedApplicationId: acceptedApplication?.id ?? null,
      createdAt: listing.createdAt,
      updatedAt: listing.updatedAt,
      publishedByUser: {
        id: listing.publishedByUser.id,
        email: listing.publishedByUser.email,
        role: listing.publishedByUser.role,
        fullName: this.getUserDisplayName(listing.publishedByUser),
        avatarUrl: this.getUserAvatar(listing.publishedByUser),
      },
    };
  }

  private mapApplication(application: CommunityApplicationRecord) {
    return {
      id: application.id,
      listingId: application.listing.id,
      listingTitle: application.listing.title,
      listingCategory: application.listing.category,
      listingStatus: application.listing.status,
      city: application.listing.city,
      district: application.listing.district,
      publisherType: application.listing.publisherType,
      organizationName: application.listing.organizationName,
      message: application.message,
      contactPhone: application.contactPhone,
      offeredQuantity: application.offeredQuantity,
      status: application.status,
      createdAt: application.createdAt,
      updatedAt: application.updatedAt,
      applicant: {
        id: application.applicant.id,
        email: application.applicant.email,
        role: application.applicant.role,
        fullName: this.getUserDisplayName(application.applicant),
        avatarUrl: this.getUserAvatar(application.applicant),
      },
      listingOwner: {
        id: application.listing.publishedByUser.id,
        email: application.listing.publishedByUser.email,
        role: application.listing.publishedByUser.role,
        fullName: this.getUserDisplayName(application.listing.publishedByUser),
        avatarUrl: this.getUserAvatar(application.listing.publishedByUser),
      },
    };
  }

  private getUserDisplayName(user: UserPreview) {
    return (
      user.ownerProfile?.fullName ||
      user.sitterProfile?.fullName ||
      user.email.split('@')[0] ||
      'User'
    );
  }

  private getUserAvatar(user: UserPreview) {
    return user.ownerProfile?.avatarUrl || user.sitterProfile?.avatarUrl || '';
  }

  private requireCategory(raw?: string) {
    const category = this.parseCategory(raw);

    if (!category) {
      throw new BadRequestException('category is required');
    }

    return category;
  }

  private parseCategory(raw?: string) {
    const normalized = raw?.trim().toUpperCase();

    if (!normalized) {
      return null;
    }

    if (normalized === 'ADOPTION') {
      return CommunityListingCategory.ADOPTION;
    }

    if (normalized === 'FOOD_SUPPORT') {
      return CommunityListingCategory.FOOD_SUPPORT;
    }

    throw new BadRequestException('Invalid community category');
  }

  private parsePublisherType(raw?: string) {
    const normalized = raw?.trim().toUpperCase();

    if (!normalized) {
      return null;
    }

    if (normalized === 'INDIVIDUAL') {
      return CommunityPublisherType.INDIVIDUAL;
    }

    if (normalized === 'SHELTER') {
      return CommunityPublisherType.SHELTER;
    }

    throw new BadRequestException('Invalid community publisher type');
  }

  private parseUrgency(raw?: string) {
    const normalized = raw?.trim().toUpperCase();

    if (!normalized) {
      return null;
    }

    if (normalized === 'LOW') {
      return CommunityUrgency.LOW;
    }

    if (normalized === 'MEDIUM') {
      return CommunityUrgency.MEDIUM;
    }

    if (normalized === 'HIGH') {
      return CommunityUrgency.HIGH;
    }

    throw new BadRequestException('Invalid community urgency');
  }

  private parseStatus(raw?: string) {
    const normalized = raw?.trim().toUpperCase();

    if (!normalized) {
      return null;
    }

    if (normalized === 'PENDING') {
      return ApplicationStatus.PENDING;
    }

    if (normalized === 'ACCEPTED') {
      return ApplicationStatus.ACCEPTED;
    }

    if (normalized === 'REJECTED') {
      return ApplicationStatus.REJECTED;
    }

    if (normalized === 'CANCELLED') {
      return ApplicationStatus.CANCELLED;
    }

    throw new BadRequestException('Invalid application status');
  }

  private parseDecision(raw?: string) {
    const normalized = raw?.trim().toUpperCase();

    if (normalized === 'ACCEPT') {
      return 'ACCEPT';
    }

    if (normalized === 'REJECT') {
      return 'REJECT';
    }

    throw new BadRequestException('action must be ACCEPT or REJECT');
  }

  private validateText(value: string | undefined, field: string): string {
    if (!value || typeof value !== 'string' || !value.trim()) {
      throw new BadRequestException(`${field} is required`);
    }

    return value.trim();
  }

  private optionalText(
    value: string | undefined,
    maxLength: number,
  ): string | null {
    if (value === undefined || value === null) {
      return null;
    }

    if (typeof value !== 'string') {
      throw new BadRequestException('Expected text value');
    }

    const normalized = value.trim();

    if (!normalized) {
      return null;
    }

    if (normalized.length > maxLength) {
      throw new BadRequestException(`Text value exceeds ${maxLength} characters`);
    }

    return normalized;
  }

  private normalizeStringArray(
    value: string[] | undefined,
    field: string,
    maxItems: number,
    maxItemLength: number,
  ) {
    if (value === undefined) {
      return [];
    }

    if (!Array.isArray(value)) {
      throw new BadRequestException(`${field} must be an array`);
    }

    if (value.length > maxItems) {
      throw new BadRequestException(`${field} cannot contain more than ${maxItems} items`);
    }

    return value
      .map((item) => {
        if (typeof item !== 'string') {
          throw new BadRequestException(`${field} must contain only strings`);
        }

        const normalized = item.trim();

        if (normalized.length > maxItemLength) {
          throw new BadRequestException(`${field} item is too long`);
        }

        return normalized;
      })
      .filter(Boolean);
  }
}