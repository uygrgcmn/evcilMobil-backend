"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryMode = exports.SortOrder = exports.ReviewScalarFieldEnum = exports.BadgeScalarFieldEnum = exports.PetScalarFieldEnum = exports.OwnerProfileScalarFieldEnum = exports.MessageThreadScalarFieldEnum = exports.SitterScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    Sitter: 'Sitter',
    MessageThread: 'MessageThread',
    OwnerProfile: 'OwnerProfile',
    Pet: 'Pet',
    Badge: 'Badge',
    Review: 'Review'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.SitterScalarFieldEnum = {
    id: 'id',
    fullName: 'fullName',
    city: 'city',
    district: 'district',
    rating: 'rating',
    reviewCount: 'reviewCount',
    pricePerDay: 'pricePerDay',
    pricePerHour: 'pricePerHour',
    avatarUrl: 'avatarUrl',
    isFeatured: 'isFeatured',
    tags: 'tags',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.MessageThreadScalarFieldEnum = {
    id: 'id',
    senderName: 'senderName',
    avatarUrl: 'avatarUrl',
    previewText: 'previewText',
    timeLabel: 'timeLabel',
    unreadCount: 'unreadCount',
    isOnline: 'isOnline',
    isPriority: 'isPriority',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.OwnerProfileScalarFieldEnum = {
    id: 'id',
    fullName: 'fullName',
    roleLabel: 'roleLabel',
    district: 'district',
    city: 'city',
    avatarUrl: 'avatarUrl',
    about: 'about',
    averageRating: 'averageRating',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PetScalarFieldEnum = {
    id: 'id',
    name: 'name',
    breed: 'breed',
    photoUrl: 'photoUrl',
    profileId: 'profileId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BadgeScalarFieldEnum = {
    id: 'id',
    title: 'title',
    icon: 'icon',
    profileId: 'profileId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ReviewScalarFieldEnum = {
    id: 'id',
    authorName: 'authorName',
    authorAvatarUrl: 'authorAvatarUrl',
    rating: 'rating',
    comment: 'comment',
    profileId: 'profileId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map