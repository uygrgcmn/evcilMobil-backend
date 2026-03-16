import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OwnerProfileModel = runtime.Types.Result.DefaultSelection<Prisma.$OwnerProfilePayload>;
export type AggregateOwnerProfile = {
    _count: OwnerProfileCountAggregateOutputType | null;
    _avg: OwnerProfileAvgAggregateOutputType | null;
    _sum: OwnerProfileSumAggregateOutputType | null;
    _min: OwnerProfileMinAggregateOutputType | null;
    _max: OwnerProfileMaxAggregateOutputType | null;
};
export type OwnerProfileAvgAggregateOutputType = {
    averageRating: number | null;
};
export type OwnerProfileSumAggregateOutputType = {
    averageRating: number | null;
};
export type OwnerProfileMinAggregateOutputType = {
    id: string | null;
    fullName: string | null;
    roleLabel: string | null;
    district: string | null;
    city: string | null;
    avatarUrl: string | null;
    about: string | null;
    averageRating: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OwnerProfileMaxAggregateOutputType = {
    id: string | null;
    fullName: string | null;
    roleLabel: string | null;
    district: string | null;
    city: string | null;
    avatarUrl: string | null;
    about: string | null;
    averageRating: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OwnerProfileCountAggregateOutputType = {
    id: number;
    fullName: number;
    roleLabel: number;
    district: number;
    city: number;
    avatarUrl: number;
    about: number;
    averageRating: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type OwnerProfileAvgAggregateInputType = {
    averageRating?: true;
};
export type OwnerProfileSumAggregateInputType = {
    averageRating?: true;
};
export type OwnerProfileMinAggregateInputType = {
    id?: true;
    fullName?: true;
    roleLabel?: true;
    district?: true;
    city?: true;
    avatarUrl?: true;
    about?: true;
    averageRating?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OwnerProfileMaxAggregateInputType = {
    id?: true;
    fullName?: true;
    roleLabel?: true;
    district?: true;
    city?: true;
    avatarUrl?: true;
    about?: true;
    averageRating?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OwnerProfileCountAggregateInputType = {
    id?: true;
    fullName?: true;
    roleLabel?: true;
    district?: true;
    city?: true;
    avatarUrl?: true;
    about?: true;
    averageRating?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type OwnerProfileAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OwnerProfileWhereInput;
    orderBy?: Prisma.OwnerProfileOrderByWithRelationInput | Prisma.OwnerProfileOrderByWithRelationInput[];
    cursor?: Prisma.OwnerProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OwnerProfileCountAggregateInputType;
    _avg?: OwnerProfileAvgAggregateInputType;
    _sum?: OwnerProfileSumAggregateInputType;
    _min?: OwnerProfileMinAggregateInputType;
    _max?: OwnerProfileMaxAggregateInputType;
};
export type GetOwnerProfileAggregateType<T extends OwnerProfileAggregateArgs> = {
    [P in keyof T & keyof AggregateOwnerProfile]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOwnerProfile[P]> : Prisma.GetScalarType<T[P], AggregateOwnerProfile[P]>;
};
export type OwnerProfileGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OwnerProfileWhereInput;
    orderBy?: Prisma.OwnerProfileOrderByWithAggregationInput | Prisma.OwnerProfileOrderByWithAggregationInput[];
    by: Prisma.OwnerProfileScalarFieldEnum[] | Prisma.OwnerProfileScalarFieldEnum;
    having?: Prisma.OwnerProfileScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OwnerProfileCountAggregateInputType | true;
    _avg?: OwnerProfileAvgAggregateInputType;
    _sum?: OwnerProfileSumAggregateInputType;
    _min?: OwnerProfileMinAggregateInputType;
    _max?: OwnerProfileMaxAggregateInputType;
};
export type OwnerProfileGroupByOutputType = {
    id: string;
    fullName: string;
    roleLabel: string;
    district: string;
    city: string;
    avatarUrl: string;
    about: string;
    averageRating: number;
    createdAt: Date;
    updatedAt: Date;
    _count: OwnerProfileCountAggregateOutputType | null;
    _avg: OwnerProfileAvgAggregateOutputType | null;
    _sum: OwnerProfileSumAggregateOutputType | null;
    _min: OwnerProfileMinAggregateOutputType | null;
    _max: OwnerProfileMaxAggregateOutputType | null;
};
type GetOwnerProfileGroupByPayload<T extends OwnerProfileGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OwnerProfileGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OwnerProfileGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OwnerProfileGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OwnerProfileGroupByOutputType[P]>;
}>>;
export type OwnerProfileWhereInput = {
    AND?: Prisma.OwnerProfileWhereInput | Prisma.OwnerProfileWhereInput[];
    OR?: Prisma.OwnerProfileWhereInput[];
    NOT?: Prisma.OwnerProfileWhereInput | Prisma.OwnerProfileWhereInput[];
    id?: Prisma.StringFilter<"OwnerProfile"> | string;
    fullName?: Prisma.StringFilter<"OwnerProfile"> | string;
    roleLabel?: Prisma.StringFilter<"OwnerProfile"> | string;
    district?: Prisma.StringFilter<"OwnerProfile"> | string;
    city?: Prisma.StringFilter<"OwnerProfile"> | string;
    avatarUrl?: Prisma.StringFilter<"OwnerProfile"> | string;
    about?: Prisma.StringFilter<"OwnerProfile"> | string;
    averageRating?: Prisma.FloatFilter<"OwnerProfile"> | number;
    createdAt?: Prisma.DateTimeFilter<"OwnerProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OwnerProfile"> | Date | string;
    pets?: Prisma.PetListRelationFilter;
    badges?: Prisma.BadgeListRelationFilter;
    reviews?: Prisma.ReviewListRelationFilter;
};
export type OwnerProfileOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    roleLabel?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    about?: Prisma.SortOrder;
    averageRating?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pets?: Prisma.PetOrderByRelationAggregateInput;
    badges?: Prisma.BadgeOrderByRelationAggregateInput;
    reviews?: Prisma.ReviewOrderByRelationAggregateInput;
};
export type OwnerProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.OwnerProfileWhereInput | Prisma.OwnerProfileWhereInput[];
    OR?: Prisma.OwnerProfileWhereInput[];
    NOT?: Prisma.OwnerProfileWhereInput | Prisma.OwnerProfileWhereInput[];
    fullName?: Prisma.StringFilter<"OwnerProfile"> | string;
    roleLabel?: Prisma.StringFilter<"OwnerProfile"> | string;
    district?: Prisma.StringFilter<"OwnerProfile"> | string;
    city?: Prisma.StringFilter<"OwnerProfile"> | string;
    avatarUrl?: Prisma.StringFilter<"OwnerProfile"> | string;
    about?: Prisma.StringFilter<"OwnerProfile"> | string;
    averageRating?: Prisma.FloatFilter<"OwnerProfile"> | number;
    createdAt?: Prisma.DateTimeFilter<"OwnerProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OwnerProfile"> | Date | string;
    pets?: Prisma.PetListRelationFilter;
    badges?: Prisma.BadgeListRelationFilter;
    reviews?: Prisma.ReviewListRelationFilter;
}, "id">;
export type OwnerProfileOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    roleLabel?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    about?: Prisma.SortOrder;
    averageRating?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.OwnerProfileCountOrderByAggregateInput;
    _avg?: Prisma.OwnerProfileAvgOrderByAggregateInput;
    _max?: Prisma.OwnerProfileMaxOrderByAggregateInput;
    _min?: Prisma.OwnerProfileMinOrderByAggregateInput;
    _sum?: Prisma.OwnerProfileSumOrderByAggregateInput;
};
export type OwnerProfileScalarWhereWithAggregatesInput = {
    AND?: Prisma.OwnerProfileScalarWhereWithAggregatesInput | Prisma.OwnerProfileScalarWhereWithAggregatesInput[];
    OR?: Prisma.OwnerProfileScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OwnerProfileScalarWhereWithAggregatesInput | Prisma.OwnerProfileScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"OwnerProfile"> | string;
    fullName?: Prisma.StringWithAggregatesFilter<"OwnerProfile"> | string;
    roleLabel?: Prisma.StringWithAggregatesFilter<"OwnerProfile"> | string;
    district?: Prisma.StringWithAggregatesFilter<"OwnerProfile"> | string;
    city?: Prisma.StringWithAggregatesFilter<"OwnerProfile"> | string;
    avatarUrl?: Prisma.StringWithAggregatesFilter<"OwnerProfile"> | string;
    about?: Prisma.StringWithAggregatesFilter<"OwnerProfile"> | string;
    averageRating?: Prisma.FloatWithAggregatesFilter<"OwnerProfile"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"OwnerProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"OwnerProfile"> | Date | string;
};
export type OwnerProfileCreateInput = {
    id?: string;
    fullName: string;
    roleLabel: string;
    district: string;
    city: string;
    avatarUrl: string;
    about: string;
    averageRating: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pets?: Prisma.PetCreateNestedManyWithoutProfileInput;
    badges?: Prisma.BadgeCreateNestedManyWithoutProfileInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutProfileInput;
};
export type OwnerProfileUncheckedCreateInput = {
    id?: string;
    fullName: string;
    roleLabel: string;
    district: string;
    city: string;
    avatarUrl: string;
    about: string;
    averageRating: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pets?: Prisma.PetUncheckedCreateNestedManyWithoutProfileInput;
    badges?: Prisma.BadgeUncheckedCreateNestedManyWithoutProfileInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutProfileInput;
};
export type OwnerProfileUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    roleLabel?: Prisma.StringFieldUpdateOperationsInput | string;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    avatarUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    about?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pets?: Prisma.PetUpdateManyWithoutProfileNestedInput;
    badges?: Prisma.BadgeUpdateManyWithoutProfileNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutProfileNestedInput;
};
export type OwnerProfileUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    roleLabel?: Prisma.StringFieldUpdateOperationsInput | string;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    avatarUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    about?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pets?: Prisma.PetUncheckedUpdateManyWithoutProfileNestedInput;
    badges?: Prisma.BadgeUncheckedUpdateManyWithoutProfileNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutProfileNestedInput;
};
export type OwnerProfileCreateManyInput = {
    id?: string;
    fullName: string;
    roleLabel: string;
    district: string;
    city: string;
    avatarUrl: string;
    about: string;
    averageRating: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OwnerProfileUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    roleLabel?: Prisma.StringFieldUpdateOperationsInput | string;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    avatarUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    about?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OwnerProfileUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    roleLabel?: Prisma.StringFieldUpdateOperationsInput | string;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    avatarUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    about?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OwnerProfileCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    roleLabel?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    about?: Prisma.SortOrder;
    averageRating?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OwnerProfileAvgOrderByAggregateInput = {
    averageRating?: Prisma.SortOrder;
};
export type OwnerProfileMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    roleLabel?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    about?: Prisma.SortOrder;
    averageRating?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OwnerProfileMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    roleLabel?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    about?: Prisma.SortOrder;
    averageRating?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OwnerProfileSumOrderByAggregateInput = {
    averageRating?: Prisma.SortOrder;
};
export type OwnerProfileScalarRelationFilter = {
    is?: Prisma.OwnerProfileWhereInput;
    isNot?: Prisma.OwnerProfileWhereInput;
};
export type OwnerProfileCreateNestedOneWithoutPetsInput = {
    create?: Prisma.XOR<Prisma.OwnerProfileCreateWithoutPetsInput, Prisma.OwnerProfileUncheckedCreateWithoutPetsInput>;
    connectOrCreate?: Prisma.OwnerProfileCreateOrConnectWithoutPetsInput;
    connect?: Prisma.OwnerProfileWhereUniqueInput;
};
export type OwnerProfileUpdateOneRequiredWithoutPetsNestedInput = {
    create?: Prisma.XOR<Prisma.OwnerProfileCreateWithoutPetsInput, Prisma.OwnerProfileUncheckedCreateWithoutPetsInput>;
    connectOrCreate?: Prisma.OwnerProfileCreateOrConnectWithoutPetsInput;
    upsert?: Prisma.OwnerProfileUpsertWithoutPetsInput;
    connect?: Prisma.OwnerProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OwnerProfileUpdateToOneWithWhereWithoutPetsInput, Prisma.OwnerProfileUpdateWithoutPetsInput>, Prisma.OwnerProfileUncheckedUpdateWithoutPetsInput>;
};
export type OwnerProfileCreateNestedOneWithoutBadgesInput = {
    create?: Prisma.XOR<Prisma.OwnerProfileCreateWithoutBadgesInput, Prisma.OwnerProfileUncheckedCreateWithoutBadgesInput>;
    connectOrCreate?: Prisma.OwnerProfileCreateOrConnectWithoutBadgesInput;
    connect?: Prisma.OwnerProfileWhereUniqueInput;
};
export type OwnerProfileUpdateOneRequiredWithoutBadgesNestedInput = {
    create?: Prisma.XOR<Prisma.OwnerProfileCreateWithoutBadgesInput, Prisma.OwnerProfileUncheckedCreateWithoutBadgesInput>;
    connectOrCreate?: Prisma.OwnerProfileCreateOrConnectWithoutBadgesInput;
    upsert?: Prisma.OwnerProfileUpsertWithoutBadgesInput;
    connect?: Prisma.OwnerProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OwnerProfileUpdateToOneWithWhereWithoutBadgesInput, Prisma.OwnerProfileUpdateWithoutBadgesInput>, Prisma.OwnerProfileUncheckedUpdateWithoutBadgesInput>;
};
export type OwnerProfileCreateNestedOneWithoutReviewsInput = {
    create?: Prisma.XOR<Prisma.OwnerProfileCreateWithoutReviewsInput, Prisma.OwnerProfileUncheckedCreateWithoutReviewsInput>;
    connectOrCreate?: Prisma.OwnerProfileCreateOrConnectWithoutReviewsInput;
    connect?: Prisma.OwnerProfileWhereUniqueInput;
};
export type OwnerProfileUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: Prisma.XOR<Prisma.OwnerProfileCreateWithoutReviewsInput, Prisma.OwnerProfileUncheckedCreateWithoutReviewsInput>;
    connectOrCreate?: Prisma.OwnerProfileCreateOrConnectWithoutReviewsInput;
    upsert?: Prisma.OwnerProfileUpsertWithoutReviewsInput;
    connect?: Prisma.OwnerProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OwnerProfileUpdateToOneWithWhereWithoutReviewsInput, Prisma.OwnerProfileUpdateWithoutReviewsInput>, Prisma.OwnerProfileUncheckedUpdateWithoutReviewsInput>;
};
export type OwnerProfileCreateWithoutPetsInput = {
    id?: string;
    fullName: string;
    roleLabel: string;
    district: string;
    city: string;
    avatarUrl: string;
    about: string;
    averageRating: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    badges?: Prisma.BadgeCreateNestedManyWithoutProfileInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutProfileInput;
};
export type OwnerProfileUncheckedCreateWithoutPetsInput = {
    id?: string;
    fullName: string;
    roleLabel: string;
    district: string;
    city: string;
    avatarUrl: string;
    about: string;
    averageRating: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    badges?: Prisma.BadgeUncheckedCreateNestedManyWithoutProfileInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutProfileInput;
};
export type OwnerProfileCreateOrConnectWithoutPetsInput = {
    where: Prisma.OwnerProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.OwnerProfileCreateWithoutPetsInput, Prisma.OwnerProfileUncheckedCreateWithoutPetsInput>;
};
export type OwnerProfileUpsertWithoutPetsInput = {
    update: Prisma.XOR<Prisma.OwnerProfileUpdateWithoutPetsInput, Prisma.OwnerProfileUncheckedUpdateWithoutPetsInput>;
    create: Prisma.XOR<Prisma.OwnerProfileCreateWithoutPetsInput, Prisma.OwnerProfileUncheckedCreateWithoutPetsInput>;
    where?: Prisma.OwnerProfileWhereInput;
};
export type OwnerProfileUpdateToOneWithWhereWithoutPetsInput = {
    where?: Prisma.OwnerProfileWhereInput;
    data: Prisma.XOR<Prisma.OwnerProfileUpdateWithoutPetsInput, Prisma.OwnerProfileUncheckedUpdateWithoutPetsInput>;
};
export type OwnerProfileUpdateWithoutPetsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    roleLabel?: Prisma.StringFieldUpdateOperationsInput | string;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    avatarUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    about?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    badges?: Prisma.BadgeUpdateManyWithoutProfileNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutProfileNestedInput;
};
export type OwnerProfileUncheckedUpdateWithoutPetsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    roleLabel?: Prisma.StringFieldUpdateOperationsInput | string;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    avatarUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    about?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    badges?: Prisma.BadgeUncheckedUpdateManyWithoutProfileNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutProfileNestedInput;
};
export type OwnerProfileCreateWithoutBadgesInput = {
    id?: string;
    fullName: string;
    roleLabel: string;
    district: string;
    city: string;
    avatarUrl: string;
    about: string;
    averageRating: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pets?: Prisma.PetCreateNestedManyWithoutProfileInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutProfileInput;
};
export type OwnerProfileUncheckedCreateWithoutBadgesInput = {
    id?: string;
    fullName: string;
    roleLabel: string;
    district: string;
    city: string;
    avatarUrl: string;
    about: string;
    averageRating: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pets?: Prisma.PetUncheckedCreateNestedManyWithoutProfileInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutProfileInput;
};
export type OwnerProfileCreateOrConnectWithoutBadgesInput = {
    where: Prisma.OwnerProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.OwnerProfileCreateWithoutBadgesInput, Prisma.OwnerProfileUncheckedCreateWithoutBadgesInput>;
};
export type OwnerProfileUpsertWithoutBadgesInput = {
    update: Prisma.XOR<Prisma.OwnerProfileUpdateWithoutBadgesInput, Prisma.OwnerProfileUncheckedUpdateWithoutBadgesInput>;
    create: Prisma.XOR<Prisma.OwnerProfileCreateWithoutBadgesInput, Prisma.OwnerProfileUncheckedCreateWithoutBadgesInput>;
    where?: Prisma.OwnerProfileWhereInput;
};
export type OwnerProfileUpdateToOneWithWhereWithoutBadgesInput = {
    where?: Prisma.OwnerProfileWhereInput;
    data: Prisma.XOR<Prisma.OwnerProfileUpdateWithoutBadgesInput, Prisma.OwnerProfileUncheckedUpdateWithoutBadgesInput>;
};
export type OwnerProfileUpdateWithoutBadgesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    roleLabel?: Prisma.StringFieldUpdateOperationsInput | string;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    avatarUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    about?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pets?: Prisma.PetUpdateManyWithoutProfileNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutProfileNestedInput;
};
export type OwnerProfileUncheckedUpdateWithoutBadgesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    roleLabel?: Prisma.StringFieldUpdateOperationsInput | string;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    avatarUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    about?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pets?: Prisma.PetUncheckedUpdateManyWithoutProfileNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutProfileNestedInput;
};
export type OwnerProfileCreateWithoutReviewsInput = {
    id?: string;
    fullName: string;
    roleLabel: string;
    district: string;
    city: string;
    avatarUrl: string;
    about: string;
    averageRating: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pets?: Prisma.PetCreateNestedManyWithoutProfileInput;
    badges?: Prisma.BadgeCreateNestedManyWithoutProfileInput;
};
export type OwnerProfileUncheckedCreateWithoutReviewsInput = {
    id?: string;
    fullName: string;
    roleLabel: string;
    district: string;
    city: string;
    avatarUrl: string;
    about: string;
    averageRating: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pets?: Prisma.PetUncheckedCreateNestedManyWithoutProfileInput;
    badges?: Prisma.BadgeUncheckedCreateNestedManyWithoutProfileInput;
};
export type OwnerProfileCreateOrConnectWithoutReviewsInput = {
    where: Prisma.OwnerProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.OwnerProfileCreateWithoutReviewsInput, Prisma.OwnerProfileUncheckedCreateWithoutReviewsInput>;
};
export type OwnerProfileUpsertWithoutReviewsInput = {
    update: Prisma.XOR<Prisma.OwnerProfileUpdateWithoutReviewsInput, Prisma.OwnerProfileUncheckedUpdateWithoutReviewsInput>;
    create: Prisma.XOR<Prisma.OwnerProfileCreateWithoutReviewsInput, Prisma.OwnerProfileUncheckedCreateWithoutReviewsInput>;
    where?: Prisma.OwnerProfileWhereInput;
};
export type OwnerProfileUpdateToOneWithWhereWithoutReviewsInput = {
    where?: Prisma.OwnerProfileWhereInput;
    data: Prisma.XOR<Prisma.OwnerProfileUpdateWithoutReviewsInput, Prisma.OwnerProfileUncheckedUpdateWithoutReviewsInput>;
};
export type OwnerProfileUpdateWithoutReviewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    roleLabel?: Prisma.StringFieldUpdateOperationsInput | string;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    avatarUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    about?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pets?: Prisma.PetUpdateManyWithoutProfileNestedInput;
    badges?: Prisma.BadgeUpdateManyWithoutProfileNestedInput;
};
export type OwnerProfileUncheckedUpdateWithoutReviewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    roleLabel?: Prisma.StringFieldUpdateOperationsInput | string;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    avatarUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    about?: Prisma.StringFieldUpdateOperationsInput | string;
    averageRating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pets?: Prisma.PetUncheckedUpdateManyWithoutProfileNestedInput;
    badges?: Prisma.BadgeUncheckedUpdateManyWithoutProfileNestedInput;
};
export type OwnerProfileCountOutputType = {
    pets: number;
    badges: number;
    reviews: number;
};
export type OwnerProfileCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pets?: boolean | OwnerProfileCountOutputTypeCountPetsArgs;
    badges?: boolean | OwnerProfileCountOutputTypeCountBadgesArgs;
    reviews?: boolean | OwnerProfileCountOutputTypeCountReviewsArgs;
};
export type OwnerProfileCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OwnerProfileCountOutputTypeSelect<ExtArgs> | null;
};
export type OwnerProfileCountOutputTypeCountPetsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PetWhereInput;
};
export type OwnerProfileCountOutputTypeCountBadgesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BadgeWhereInput;
};
export type OwnerProfileCountOutputTypeCountReviewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
};
export type OwnerProfileSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    roleLabel?: boolean;
    district?: boolean;
    city?: boolean;
    avatarUrl?: boolean;
    about?: boolean;
    averageRating?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pets?: boolean | Prisma.OwnerProfile$petsArgs<ExtArgs>;
    badges?: boolean | Prisma.OwnerProfile$badgesArgs<ExtArgs>;
    reviews?: boolean | Prisma.OwnerProfile$reviewsArgs<ExtArgs>;
    _count?: boolean | Prisma.OwnerProfileCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ownerProfile"]>;
export type OwnerProfileSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    roleLabel?: boolean;
    district?: boolean;
    city?: boolean;
    avatarUrl?: boolean;
    about?: boolean;
    averageRating?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["ownerProfile"]>;
export type OwnerProfileSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    roleLabel?: boolean;
    district?: boolean;
    city?: boolean;
    avatarUrl?: boolean;
    about?: boolean;
    averageRating?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["ownerProfile"]>;
export type OwnerProfileSelectScalar = {
    id?: boolean;
    fullName?: boolean;
    roleLabel?: boolean;
    district?: boolean;
    city?: boolean;
    avatarUrl?: boolean;
    about?: boolean;
    averageRating?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type OwnerProfileOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "fullName" | "roleLabel" | "district" | "city" | "avatarUrl" | "about" | "averageRating" | "createdAt" | "updatedAt", ExtArgs["result"]["ownerProfile"]>;
export type OwnerProfileInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pets?: boolean | Prisma.OwnerProfile$petsArgs<ExtArgs>;
    badges?: boolean | Prisma.OwnerProfile$badgesArgs<ExtArgs>;
    reviews?: boolean | Prisma.OwnerProfile$reviewsArgs<ExtArgs>;
    _count?: boolean | Prisma.OwnerProfileCountOutputTypeDefaultArgs<ExtArgs>;
};
export type OwnerProfileIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type OwnerProfileIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $OwnerProfilePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OwnerProfile";
    objects: {
        pets: Prisma.$PetPayload<ExtArgs>[];
        badges: Prisma.$BadgePayload<ExtArgs>[];
        reviews: Prisma.$ReviewPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        fullName: string;
        roleLabel: string;
        district: string;
        city: string;
        avatarUrl: string;
        about: string;
        averageRating: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["ownerProfile"]>;
    composites: {};
};
export type OwnerProfileGetPayload<S extends boolean | null | undefined | OwnerProfileDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OwnerProfilePayload, S>;
export type OwnerProfileCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OwnerProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OwnerProfileCountAggregateInputType | true;
};
export interface OwnerProfileDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OwnerProfile'];
        meta: {
            name: 'OwnerProfile';
        };
    };
    findUnique<T extends OwnerProfileFindUniqueArgs>(args: Prisma.SelectSubset<T, OwnerProfileFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OwnerProfileClient<runtime.Types.Result.GetResult<Prisma.$OwnerProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OwnerProfileFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OwnerProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OwnerProfileClient<runtime.Types.Result.GetResult<Prisma.$OwnerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OwnerProfileFindFirstArgs>(args?: Prisma.SelectSubset<T, OwnerProfileFindFirstArgs<ExtArgs>>): Prisma.Prisma__OwnerProfileClient<runtime.Types.Result.GetResult<Prisma.$OwnerProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OwnerProfileFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OwnerProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OwnerProfileClient<runtime.Types.Result.GetResult<Prisma.$OwnerProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OwnerProfileFindManyArgs>(args?: Prisma.SelectSubset<T, OwnerProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OwnerProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OwnerProfileCreateArgs>(args: Prisma.SelectSubset<T, OwnerProfileCreateArgs<ExtArgs>>): Prisma.Prisma__OwnerProfileClient<runtime.Types.Result.GetResult<Prisma.$OwnerProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OwnerProfileCreateManyArgs>(args?: Prisma.SelectSubset<T, OwnerProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OwnerProfileCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OwnerProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OwnerProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OwnerProfileDeleteArgs>(args: Prisma.SelectSubset<T, OwnerProfileDeleteArgs<ExtArgs>>): Prisma.Prisma__OwnerProfileClient<runtime.Types.Result.GetResult<Prisma.$OwnerProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OwnerProfileUpdateArgs>(args: Prisma.SelectSubset<T, OwnerProfileUpdateArgs<ExtArgs>>): Prisma.Prisma__OwnerProfileClient<runtime.Types.Result.GetResult<Prisma.$OwnerProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OwnerProfileDeleteManyArgs>(args?: Prisma.SelectSubset<T, OwnerProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OwnerProfileUpdateManyArgs>(args: Prisma.SelectSubset<T, OwnerProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OwnerProfileUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OwnerProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OwnerProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OwnerProfileUpsertArgs>(args: Prisma.SelectSubset<T, OwnerProfileUpsertArgs<ExtArgs>>): Prisma.Prisma__OwnerProfileClient<runtime.Types.Result.GetResult<Prisma.$OwnerProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OwnerProfileCountArgs>(args?: Prisma.Subset<T, OwnerProfileCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OwnerProfileCountAggregateOutputType> : number>;
    aggregate<T extends OwnerProfileAggregateArgs>(args: Prisma.Subset<T, OwnerProfileAggregateArgs>): Prisma.PrismaPromise<GetOwnerProfileAggregateType<T>>;
    groupBy<T extends OwnerProfileGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OwnerProfileGroupByArgs['orderBy'];
    } : {
        orderBy?: OwnerProfileGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OwnerProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOwnerProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OwnerProfileFieldRefs;
}
export interface Prisma__OwnerProfileClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    pets<T extends Prisma.OwnerProfile$petsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OwnerProfile$petsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    badges<T extends Prisma.OwnerProfile$badgesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OwnerProfile$badgesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reviews<T extends Prisma.OwnerProfile$reviewsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OwnerProfile$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OwnerProfileFieldRefs {
    readonly id: Prisma.FieldRef<"OwnerProfile", 'String'>;
    readonly fullName: Prisma.FieldRef<"OwnerProfile", 'String'>;
    readonly roleLabel: Prisma.FieldRef<"OwnerProfile", 'String'>;
    readonly district: Prisma.FieldRef<"OwnerProfile", 'String'>;
    readonly city: Prisma.FieldRef<"OwnerProfile", 'String'>;
    readonly avatarUrl: Prisma.FieldRef<"OwnerProfile", 'String'>;
    readonly about: Prisma.FieldRef<"OwnerProfile", 'String'>;
    readonly averageRating: Prisma.FieldRef<"OwnerProfile", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"OwnerProfile", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"OwnerProfile", 'DateTime'>;
}
export type OwnerProfileFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OwnerProfileSelect<ExtArgs> | null;
    omit?: Prisma.OwnerProfileOmit<ExtArgs> | null;
    include?: Prisma.OwnerProfileInclude<ExtArgs> | null;
    where: Prisma.OwnerProfileWhereUniqueInput;
};
export type OwnerProfileFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OwnerProfileSelect<ExtArgs> | null;
    omit?: Prisma.OwnerProfileOmit<ExtArgs> | null;
    include?: Prisma.OwnerProfileInclude<ExtArgs> | null;
    where: Prisma.OwnerProfileWhereUniqueInput;
};
export type OwnerProfileFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OwnerProfileSelect<ExtArgs> | null;
    omit?: Prisma.OwnerProfileOmit<ExtArgs> | null;
    include?: Prisma.OwnerProfileInclude<ExtArgs> | null;
    where?: Prisma.OwnerProfileWhereInput;
    orderBy?: Prisma.OwnerProfileOrderByWithRelationInput | Prisma.OwnerProfileOrderByWithRelationInput[];
    cursor?: Prisma.OwnerProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OwnerProfileScalarFieldEnum | Prisma.OwnerProfileScalarFieldEnum[];
};
export type OwnerProfileFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OwnerProfileSelect<ExtArgs> | null;
    omit?: Prisma.OwnerProfileOmit<ExtArgs> | null;
    include?: Prisma.OwnerProfileInclude<ExtArgs> | null;
    where?: Prisma.OwnerProfileWhereInput;
    orderBy?: Prisma.OwnerProfileOrderByWithRelationInput | Prisma.OwnerProfileOrderByWithRelationInput[];
    cursor?: Prisma.OwnerProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OwnerProfileScalarFieldEnum | Prisma.OwnerProfileScalarFieldEnum[];
};
export type OwnerProfileFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OwnerProfileSelect<ExtArgs> | null;
    omit?: Prisma.OwnerProfileOmit<ExtArgs> | null;
    include?: Prisma.OwnerProfileInclude<ExtArgs> | null;
    where?: Prisma.OwnerProfileWhereInput;
    orderBy?: Prisma.OwnerProfileOrderByWithRelationInput | Prisma.OwnerProfileOrderByWithRelationInput[];
    cursor?: Prisma.OwnerProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OwnerProfileScalarFieldEnum | Prisma.OwnerProfileScalarFieldEnum[];
};
export type OwnerProfileCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OwnerProfileSelect<ExtArgs> | null;
    omit?: Prisma.OwnerProfileOmit<ExtArgs> | null;
    include?: Prisma.OwnerProfileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OwnerProfileCreateInput, Prisma.OwnerProfileUncheckedCreateInput>;
};
export type OwnerProfileCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OwnerProfileCreateManyInput | Prisma.OwnerProfileCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OwnerProfileCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OwnerProfileSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OwnerProfileOmit<ExtArgs> | null;
    data: Prisma.OwnerProfileCreateManyInput | Prisma.OwnerProfileCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OwnerProfileUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OwnerProfileSelect<ExtArgs> | null;
    omit?: Prisma.OwnerProfileOmit<ExtArgs> | null;
    include?: Prisma.OwnerProfileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OwnerProfileUpdateInput, Prisma.OwnerProfileUncheckedUpdateInput>;
    where: Prisma.OwnerProfileWhereUniqueInput;
};
export type OwnerProfileUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OwnerProfileUpdateManyMutationInput, Prisma.OwnerProfileUncheckedUpdateManyInput>;
    where?: Prisma.OwnerProfileWhereInput;
    limit?: number;
};
export type OwnerProfileUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OwnerProfileSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OwnerProfileOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OwnerProfileUpdateManyMutationInput, Prisma.OwnerProfileUncheckedUpdateManyInput>;
    where?: Prisma.OwnerProfileWhereInput;
    limit?: number;
};
export type OwnerProfileUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OwnerProfileSelect<ExtArgs> | null;
    omit?: Prisma.OwnerProfileOmit<ExtArgs> | null;
    include?: Prisma.OwnerProfileInclude<ExtArgs> | null;
    where: Prisma.OwnerProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.OwnerProfileCreateInput, Prisma.OwnerProfileUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OwnerProfileUpdateInput, Prisma.OwnerProfileUncheckedUpdateInput>;
};
export type OwnerProfileDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OwnerProfileSelect<ExtArgs> | null;
    omit?: Prisma.OwnerProfileOmit<ExtArgs> | null;
    include?: Prisma.OwnerProfileInclude<ExtArgs> | null;
    where: Prisma.OwnerProfileWhereUniqueInput;
};
export type OwnerProfileDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OwnerProfileWhereInput;
    limit?: number;
};
export type OwnerProfile$petsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetSelect<ExtArgs> | null;
    omit?: Prisma.PetOmit<ExtArgs> | null;
    include?: Prisma.PetInclude<ExtArgs> | null;
    where?: Prisma.PetWhereInput;
    orderBy?: Prisma.PetOrderByWithRelationInput | Prisma.PetOrderByWithRelationInput[];
    cursor?: Prisma.PetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PetScalarFieldEnum | Prisma.PetScalarFieldEnum[];
};
export type OwnerProfile$badgesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BadgeSelect<ExtArgs> | null;
    omit?: Prisma.BadgeOmit<ExtArgs> | null;
    include?: Prisma.BadgeInclude<ExtArgs> | null;
    where?: Prisma.BadgeWhereInput;
    orderBy?: Prisma.BadgeOrderByWithRelationInput | Prisma.BadgeOrderByWithRelationInput[];
    cursor?: Prisma.BadgeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BadgeScalarFieldEnum | Prisma.BadgeScalarFieldEnum[];
};
export type OwnerProfile$reviewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReviewScalarFieldEnum | Prisma.ReviewScalarFieldEnum[];
};
export type OwnerProfileDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OwnerProfileSelect<ExtArgs> | null;
    omit?: Prisma.OwnerProfileOmit<ExtArgs> | null;
    include?: Prisma.OwnerProfileInclude<ExtArgs> | null;
};
export {};
