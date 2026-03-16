import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: any;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: any;
export declare const JsonNull: any;
export declare const AnyNull: any;
export declare const ModelName: {
    readonly Sitter: "Sitter";
    readonly MessageThread: "MessageThread";
    readonly OwnerProfile: "OwnerProfile";
    readonly Pet: "Pet";
    readonly Badge: "Badge";
    readonly Review: "Review";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: any;
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const SitterScalarFieldEnum: {
    readonly id: "id";
    readonly fullName: "fullName";
    readonly city: "city";
    readonly district: "district";
    readonly rating: "rating";
    readonly reviewCount: "reviewCount";
    readonly pricePerDay: "pricePerDay";
    readonly pricePerHour: "pricePerHour";
    readonly avatarUrl: "avatarUrl";
    readonly isFeatured: "isFeatured";
    readonly tags: "tags";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SitterScalarFieldEnum = (typeof SitterScalarFieldEnum)[keyof typeof SitterScalarFieldEnum];
export declare const MessageThreadScalarFieldEnum: {
    readonly id: "id";
    readonly senderName: "senderName";
    readonly avatarUrl: "avatarUrl";
    readonly previewText: "previewText";
    readonly timeLabel: "timeLabel";
    readonly unreadCount: "unreadCount";
    readonly isOnline: "isOnline";
    readonly isPriority: "isPriority";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type MessageThreadScalarFieldEnum = (typeof MessageThreadScalarFieldEnum)[keyof typeof MessageThreadScalarFieldEnum];
export declare const OwnerProfileScalarFieldEnum: {
    readonly id: "id";
    readonly fullName: "fullName";
    readonly roleLabel: "roleLabel";
    readonly district: "district";
    readonly city: "city";
    readonly avatarUrl: "avatarUrl";
    readonly about: "about";
    readonly averageRating: "averageRating";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OwnerProfileScalarFieldEnum = (typeof OwnerProfileScalarFieldEnum)[keyof typeof OwnerProfileScalarFieldEnum];
export declare const PetScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly breed: "breed";
    readonly photoUrl: "photoUrl";
    readonly profileId: "profileId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PetScalarFieldEnum = (typeof PetScalarFieldEnum)[keyof typeof PetScalarFieldEnum];
export declare const BadgeScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly icon: "icon";
    readonly profileId: "profileId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BadgeScalarFieldEnum = (typeof BadgeScalarFieldEnum)[keyof typeof BadgeScalarFieldEnum];
export declare const ReviewScalarFieldEnum: {
    readonly id: "id";
    readonly authorName: "authorName";
    readonly authorAvatarUrl: "authorAvatarUrl";
    readonly rating: "rating";
    readonly comment: "comment";
    readonly profileId: "profileId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
