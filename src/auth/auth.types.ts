import type { UserRole } from '@prisma/client';

export type AuthenticatedUser = {
  id: string;
  email: string;
  role: UserRole;
};

export type RegisterInput = {
  email?: string;
  password?: string;
  role?: string;
  fullName?: string;
  city?: string;
  district?: string;
};

export type LoginInput = {
  email?: string;
  password?: string;
};

export type DeviceTokenInput = {
  token?: string | null;
};

export type AuthResponse = {
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: UserRole;
  };
};
