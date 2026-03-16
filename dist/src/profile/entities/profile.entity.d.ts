export type ProfilePet = {
    id: string;
    name: string;
    breed: string;
    photoUrl: string;
};
export type ProfileBadge = {
    id: string;
    title: string;
    icon: 'security' | 'schedule' | 'favorite';
};
export type ProfileReview = {
    id: string;
    authorName: string;
    authorAvatarUrl: string;
    rating: number;
    comment: string;
};
export type OwnerProfile = {
    id: string;
    fullName: string;
    roleLabel: string;
    district: string;
    city: string;
    avatarUrl: string;
    about: string;
    averageRating: number;
    pets: ProfilePet[];
    badges: ProfileBadge[];
    reviews: ProfileReview[];
};
