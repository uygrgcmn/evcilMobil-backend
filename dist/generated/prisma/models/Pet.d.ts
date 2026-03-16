import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PetModel = runtime.Types.Result.DefaultSelection<Prisma.$PetPayload>;
export type AggregatePet = {
    _count: PetCountAggregateOutputType | null;
    _min: PetMinAggregateOutputType | null;
    _max: PetMaxAggregateOutputType | null;
};
export type PetMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    breed: string | null;
    photoUrl: string | null;
    profileId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PetMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    breed: string | null;
    photoUrl: string | null;
    profileId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PetCountAggregateOutputType = {
    id: number;
    name: number;
    breed: number;
    photoUrl: number;
    profileId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PetMinAggregateInputType = {
    id?: true;
    name?: true;
    breed?: true;
    photoUrl?: true;
    profileId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PetMaxAggregateInputType = {
    id?: true;
    name?: true;
    breed?: true;
    photoUrl?: true;
    profileId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PetCountAggregateInputType = {
    id?: true;
    name?: true;
    breed?: true;
    photoUrl?: true;
    profileId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PetAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PetWhereInput;
    orderBy?: Prisma.PetOrderByWithRelationInput | Prisma.PetOrderByWithRelationInput[];
    cursor?: Prisma.PetWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PetCountAggregateInputType;
    _min?: PetMinAggregateInputType;
    _max?: PetMaxAggregateInputType;
};
export type GetPetAggregateType<T extends PetAggregateArgs> = {
    [P in keyof T & keyof AggregatePet]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePet[P]> : Prisma.GetScalarType<T[P], AggregatePet[P]>;
};
export type PetGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PetWhereInput;
    orderBy?: Prisma.PetOrderByWithAggregationInput | Prisma.PetOrderByWithAggregationInput[];
    by: Prisma.PetScalarFieldEnum[] | Prisma.PetScalarFieldEnum;
    having?: Prisma.PetScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PetCountAggregateInputType | true;
    _min?: PetMinAggregateInputType;
    _max?: PetMaxAggregateInputType;
};
export type PetGroupByOutputType = {
    id: string;
    name: string;
    breed: string;
    photoUrl: string;
    profileId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: PetCountAggregateOutputType | null;
    _min: PetMinAggregateOutputType | null;
    _max: PetMaxAggregateOutputType | null;
};
type GetPetGroupByPayload<T extends PetGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PetGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PetGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PetGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PetGroupByOutputType[P]>;
}>>;
export type PetWhereInput = {
    AND?: Prisma.PetWhereInput | Prisma.PetWhereInput[];
    OR?: Prisma.PetWhereInput[];
    NOT?: Prisma.PetWhereInput | Prisma.PetWhereInput[];
    id?: Prisma.StringFilter<"Pet"> | string;
    name?: Prisma.StringFilter<"Pet"> | string;
    breed?: Prisma.StringFilter<"Pet"> | string;
    photoUrl?: Prisma.StringFilter<"Pet"> | string;
    profileId?: Prisma.StringFilter<"Pet"> | string;
    createdAt?: Prisma.DateTimeFilter<"Pet"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Pet"> | Date | string;
    profile?: Prisma.XOR<Prisma.OwnerProfileScalarRelationFilter, Prisma.OwnerProfileWhereInput>;
};
export type PetOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    breed?: Prisma.SortOrder;
    photoUrl?: Prisma.SortOrder;
    profileId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    profile?: Prisma.OwnerProfileOrderByWithRelationInput;
};
export type PetWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PetWhereInput | Prisma.PetWhereInput[];
    OR?: Prisma.PetWhereInput[];
    NOT?: Prisma.PetWhereInput | Prisma.PetWhereInput[];
    name?: Prisma.StringFilter<"Pet"> | string;
    breed?: Prisma.StringFilter<"Pet"> | string;
    photoUrl?: Prisma.StringFilter<"Pet"> | string;
    profileId?: Prisma.StringFilter<"Pet"> | string;
    createdAt?: Prisma.DateTimeFilter<"Pet"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Pet"> | Date | string;
    profile?: Prisma.XOR<Prisma.OwnerProfileScalarRelationFilter, Prisma.OwnerProfileWhereInput>;
}, "id">;
export type PetOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    breed?: Prisma.SortOrder;
    photoUrl?: Prisma.SortOrder;
    profileId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PetCountOrderByAggregateInput;
    _max?: Prisma.PetMaxOrderByAggregateInput;
    _min?: Prisma.PetMinOrderByAggregateInput;
};
export type PetScalarWhereWithAggregatesInput = {
    AND?: Prisma.PetScalarWhereWithAggregatesInput | Prisma.PetScalarWhereWithAggregatesInput[];
    OR?: Prisma.PetScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PetScalarWhereWithAggregatesInput | Prisma.PetScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Pet"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Pet"> | string;
    breed?: Prisma.StringWithAggregatesFilter<"Pet"> | string;
    photoUrl?: Prisma.StringWithAggregatesFilter<"Pet"> | string;
    profileId?: Prisma.StringWithAggregatesFilter<"Pet"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Pet"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Pet"> | Date | string;
};
export type PetCreateInput = {
    id?: string;
    name: string;
    breed: string;
    photoUrl: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profile: Prisma.OwnerProfileCreateNestedOneWithoutPetsInput;
};
export type PetUncheckedCreateInput = {
    id?: string;
    name: string;
    breed: string;
    photoUrl: string;
    profileId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PetUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    breed?: Prisma.StringFieldUpdateOperationsInput | string;
    photoUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile?: Prisma.OwnerProfileUpdateOneRequiredWithoutPetsNestedInput;
};
export type PetUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    breed?: Prisma.StringFieldUpdateOperationsInput | string;
    photoUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    profileId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PetCreateManyInput = {
    id?: string;
    name: string;
    breed: string;
    photoUrl: string;
    profileId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PetUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    breed?: Prisma.StringFieldUpdateOperationsInput | string;
    photoUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PetUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    breed?: Prisma.StringFieldUpdateOperationsInput | string;
    photoUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    profileId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PetListRelationFilter = {
    every?: Prisma.PetWhereInput;
    some?: Prisma.PetWhereInput;
    none?: Prisma.PetWhereInput;
};
export type PetOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PetCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    breed?: Prisma.SortOrder;
    photoUrl?: Prisma.SortOrder;
    profileId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PetMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    breed?: Prisma.SortOrder;
    photoUrl?: Prisma.SortOrder;
    profileId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PetMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    breed?: Prisma.SortOrder;
    photoUrl?: Prisma.SortOrder;
    profileId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PetCreateNestedManyWithoutProfileInput = {
    create?: Prisma.XOR<Prisma.PetCreateWithoutProfileInput, Prisma.PetUncheckedCreateWithoutProfileInput> | Prisma.PetCreateWithoutProfileInput[] | Prisma.PetUncheckedCreateWithoutProfileInput[];
    connectOrCreate?: Prisma.PetCreateOrConnectWithoutProfileInput | Prisma.PetCreateOrConnectWithoutProfileInput[];
    createMany?: Prisma.PetCreateManyProfileInputEnvelope;
    connect?: Prisma.PetWhereUniqueInput | Prisma.PetWhereUniqueInput[];
};
export type PetUncheckedCreateNestedManyWithoutProfileInput = {
    create?: Prisma.XOR<Prisma.PetCreateWithoutProfileInput, Prisma.PetUncheckedCreateWithoutProfileInput> | Prisma.PetCreateWithoutProfileInput[] | Prisma.PetUncheckedCreateWithoutProfileInput[];
    connectOrCreate?: Prisma.PetCreateOrConnectWithoutProfileInput | Prisma.PetCreateOrConnectWithoutProfileInput[];
    createMany?: Prisma.PetCreateManyProfileInputEnvelope;
    connect?: Prisma.PetWhereUniqueInput | Prisma.PetWhereUniqueInput[];
};
export type PetUpdateManyWithoutProfileNestedInput = {
    create?: Prisma.XOR<Prisma.PetCreateWithoutProfileInput, Prisma.PetUncheckedCreateWithoutProfileInput> | Prisma.PetCreateWithoutProfileInput[] | Prisma.PetUncheckedCreateWithoutProfileInput[];
    connectOrCreate?: Prisma.PetCreateOrConnectWithoutProfileInput | Prisma.PetCreateOrConnectWithoutProfileInput[];
    upsert?: Prisma.PetUpsertWithWhereUniqueWithoutProfileInput | Prisma.PetUpsertWithWhereUniqueWithoutProfileInput[];
    createMany?: Prisma.PetCreateManyProfileInputEnvelope;
    set?: Prisma.PetWhereUniqueInput | Prisma.PetWhereUniqueInput[];
    disconnect?: Prisma.PetWhereUniqueInput | Prisma.PetWhereUniqueInput[];
    delete?: Prisma.PetWhereUniqueInput | Prisma.PetWhereUniqueInput[];
    connect?: Prisma.PetWhereUniqueInput | Prisma.PetWhereUniqueInput[];
    update?: Prisma.PetUpdateWithWhereUniqueWithoutProfileInput | Prisma.PetUpdateWithWhereUniqueWithoutProfileInput[];
    updateMany?: Prisma.PetUpdateManyWithWhereWithoutProfileInput | Prisma.PetUpdateManyWithWhereWithoutProfileInput[];
    deleteMany?: Prisma.PetScalarWhereInput | Prisma.PetScalarWhereInput[];
};
export type PetUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: Prisma.XOR<Prisma.PetCreateWithoutProfileInput, Prisma.PetUncheckedCreateWithoutProfileInput> | Prisma.PetCreateWithoutProfileInput[] | Prisma.PetUncheckedCreateWithoutProfileInput[];
    connectOrCreate?: Prisma.PetCreateOrConnectWithoutProfileInput | Prisma.PetCreateOrConnectWithoutProfileInput[];
    upsert?: Prisma.PetUpsertWithWhereUniqueWithoutProfileInput | Prisma.PetUpsertWithWhereUniqueWithoutProfileInput[];
    createMany?: Prisma.PetCreateManyProfileInputEnvelope;
    set?: Prisma.PetWhereUniqueInput | Prisma.PetWhereUniqueInput[];
    disconnect?: Prisma.PetWhereUniqueInput | Prisma.PetWhereUniqueInput[];
    delete?: Prisma.PetWhereUniqueInput | Prisma.PetWhereUniqueInput[];
    connect?: Prisma.PetWhereUniqueInput | Prisma.PetWhereUniqueInput[];
    update?: Prisma.PetUpdateWithWhereUniqueWithoutProfileInput | Prisma.PetUpdateWithWhereUniqueWithoutProfileInput[];
    updateMany?: Prisma.PetUpdateManyWithWhereWithoutProfileInput | Prisma.PetUpdateManyWithWhereWithoutProfileInput[];
    deleteMany?: Prisma.PetScalarWhereInput | Prisma.PetScalarWhereInput[];
};
export type PetCreateWithoutProfileInput = {
    id?: string;
    name: string;
    breed: string;
    photoUrl: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PetUncheckedCreateWithoutProfileInput = {
    id?: string;
    name: string;
    breed: string;
    photoUrl: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PetCreateOrConnectWithoutProfileInput = {
    where: Prisma.PetWhereUniqueInput;
    create: Prisma.XOR<Prisma.PetCreateWithoutProfileInput, Prisma.PetUncheckedCreateWithoutProfileInput>;
};
export type PetCreateManyProfileInputEnvelope = {
    data: Prisma.PetCreateManyProfileInput | Prisma.PetCreateManyProfileInput[];
    skipDuplicates?: boolean;
};
export type PetUpsertWithWhereUniqueWithoutProfileInput = {
    where: Prisma.PetWhereUniqueInput;
    update: Prisma.XOR<Prisma.PetUpdateWithoutProfileInput, Prisma.PetUncheckedUpdateWithoutProfileInput>;
    create: Prisma.XOR<Prisma.PetCreateWithoutProfileInput, Prisma.PetUncheckedCreateWithoutProfileInput>;
};
export type PetUpdateWithWhereUniqueWithoutProfileInput = {
    where: Prisma.PetWhereUniqueInput;
    data: Prisma.XOR<Prisma.PetUpdateWithoutProfileInput, Prisma.PetUncheckedUpdateWithoutProfileInput>;
};
export type PetUpdateManyWithWhereWithoutProfileInput = {
    where: Prisma.PetScalarWhereInput;
    data: Prisma.XOR<Prisma.PetUpdateManyMutationInput, Prisma.PetUncheckedUpdateManyWithoutProfileInput>;
};
export type PetScalarWhereInput = {
    AND?: Prisma.PetScalarWhereInput | Prisma.PetScalarWhereInput[];
    OR?: Prisma.PetScalarWhereInput[];
    NOT?: Prisma.PetScalarWhereInput | Prisma.PetScalarWhereInput[];
    id?: Prisma.StringFilter<"Pet"> | string;
    name?: Prisma.StringFilter<"Pet"> | string;
    breed?: Prisma.StringFilter<"Pet"> | string;
    photoUrl?: Prisma.StringFilter<"Pet"> | string;
    profileId?: Prisma.StringFilter<"Pet"> | string;
    createdAt?: Prisma.DateTimeFilter<"Pet"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Pet"> | Date | string;
};
export type PetCreateManyProfileInput = {
    id?: string;
    name: string;
    breed: string;
    photoUrl: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PetUpdateWithoutProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    breed?: Prisma.StringFieldUpdateOperationsInput | string;
    photoUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PetUncheckedUpdateWithoutProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    breed?: Prisma.StringFieldUpdateOperationsInput | string;
    photoUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PetUncheckedUpdateManyWithoutProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    breed?: Prisma.StringFieldUpdateOperationsInput | string;
    photoUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PetSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    breed?: boolean;
    photoUrl?: boolean;
    profileId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    profile?: boolean | Prisma.OwnerProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pet"]>;
export type PetSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    breed?: boolean;
    photoUrl?: boolean;
    profileId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    profile?: boolean | Prisma.OwnerProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pet"]>;
export type PetSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    breed?: boolean;
    photoUrl?: boolean;
    profileId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    profile?: boolean | Prisma.OwnerProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pet"]>;
export type PetSelectScalar = {
    id?: boolean;
    name?: boolean;
    breed?: boolean;
    photoUrl?: boolean;
    profileId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PetOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "breed" | "photoUrl" | "profileId" | "createdAt" | "updatedAt", ExtArgs["result"]["pet"]>;
export type PetInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    profile?: boolean | Prisma.OwnerProfileDefaultArgs<ExtArgs>;
};
export type PetIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    profile?: boolean | Prisma.OwnerProfileDefaultArgs<ExtArgs>;
};
export type PetIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    profile?: boolean | Prisma.OwnerProfileDefaultArgs<ExtArgs>;
};
export type $PetPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Pet";
    objects: {
        profile: Prisma.$OwnerProfilePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        breed: string;
        photoUrl: string;
        profileId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["pet"]>;
    composites: {};
};
export type PetGetPayload<S extends boolean | null | undefined | PetDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PetPayload, S>;
export type PetCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PetCountAggregateInputType | true;
};
export interface PetDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Pet'];
        meta: {
            name: 'Pet';
        };
    };
    findUnique<T extends PetFindUniqueArgs>(args: Prisma.SelectSubset<T, PetFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PetClient<runtime.Types.Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PetFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PetFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PetClient<runtime.Types.Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PetFindFirstArgs>(args?: Prisma.SelectSubset<T, PetFindFirstArgs<ExtArgs>>): Prisma.Prisma__PetClient<runtime.Types.Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PetFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PetFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PetClient<runtime.Types.Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PetFindManyArgs>(args?: Prisma.SelectSubset<T, PetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PetCreateArgs>(args: Prisma.SelectSubset<T, PetCreateArgs<ExtArgs>>): Prisma.Prisma__PetClient<runtime.Types.Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PetCreateManyArgs>(args?: Prisma.SelectSubset<T, PetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PetCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PetDeleteArgs>(args: Prisma.SelectSubset<T, PetDeleteArgs<ExtArgs>>): Prisma.Prisma__PetClient<runtime.Types.Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PetUpdateArgs>(args: Prisma.SelectSubset<T, PetUpdateArgs<ExtArgs>>): Prisma.Prisma__PetClient<runtime.Types.Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PetDeleteManyArgs>(args?: Prisma.SelectSubset<T, PetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PetUpdateManyArgs>(args: Prisma.SelectSubset<T, PetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PetUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PetUpsertArgs>(args: Prisma.SelectSubset<T, PetUpsertArgs<ExtArgs>>): Prisma.Prisma__PetClient<runtime.Types.Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PetCountArgs>(args?: Prisma.Subset<T, PetCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PetCountAggregateOutputType> : number>;
    aggregate<T extends PetAggregateArgs>(args: Prisma.Subset<T, PetAggregateArgs>): Prisma.PrismaPromise<GetPetAggregateType<T>>;
    groupBy<T extends PetGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PetGroupByArgs['orderBy'];
    } : {
        orderBy?: PetGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PetFieldRefs;
}
export interface Prisma__PetClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    profile<T extends Prisma.OwnerProfileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OwnerProfileDefaultArgs<ExtArgs>>): Prisma.Prisma__OwnerProfileClient<runtime.Types.Result.GetResult<Prisma.$OwnerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PetFieldRefs {
    readonly id: Prisma.FieldRef<"Pet", 'String'>;
    readonly name: Prisma.FieldRef<"Pet", 'String'>;
    readonly breed: Prisma.FieldRef<"Pet", 'String'>;
    readonly photoUrl: Prisma.FieldRef<"Pet", 'String'>;
    readonly profileId: Prisma.FieldRef<"Pet", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Pet", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Pet", 'DateTime'>;
}
export type PetFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetSelect<ExtArgs> | null;
    omit?: Prisma.PetOmit<ExtArgs> | null;
    include?: Prisma.PetInclude<ExtArgs> | null;
    where: Prisma.PetWhereUniqueInput;
};
export type PetFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetSelect<ExtArgs> | null;
    omit?: Prisma.PetOmit<ExtArgs> | null;
    include?: Prisma.PetInclude<ExtArgs> | null;
    where: Prisma.PetWhereUniqueInput;
};
export type PetFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PetFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PetFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PetCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetSelect<ExtArgs> | null;
    omit?: Prisma.PetOmit<ExtArgs> | null;
    include?: Prisma.PetInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PetCreateInput, Prisma.PetUncheckedCreateInput>;
};
export type PetCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PetCreateManyInput | Prisma.PetCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PetCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PetOmit<ExtArgs> | null;
    data: Prisma.PetCreateManyInput | Prisma.PetCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PetIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PetUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetSelect<ExtArgs> | null;
    omit?: Prisma.PetOmit<ExtArgs> | null;
    include?: Prisma.PetInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PetUpdateInput, Prisma.PetUncheckedUpdateInput>;
    where: Prisma.PetWhereUniqueInput;
};
export type PetUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PetUpdateManyMutationInput, Prisma.PetUncheckedUpdateManyInput>;
    where?: Prisma.PetWhereInput;
    limit?: number;
};
export type PetUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PetOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PetUpdateManyMutationInput, Prisma.PetUncheckedUpdateManyInput>;
    where?: Prisma.PetWhereInput;
    limit?: number;
    include?: Prisma.PetIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PetUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetSelect<ExtArgs> | null;
    omit?: Prisma.PetOmit<ExtArgs> | null;
    include?: Prisma.PetInclude<ExtArgs> | null;
    where: Prisma.PetWhereUniqueInput;
    create: Prisma.XOR<Prisma.PetCreateInput, Prisma.PetUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PetUpdateInput, Prisma.PetUncheckedUpdateInput>;
};
export type PetDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetSelect<ExtArgs> | null;
    omit?: Prisma.PetOmit<ExtArgs> | null;
    include?: Prisma.PetInclude<ExtArgs> | null;
    where: Prisma.PetWhereUniqueInput;
};
export type PetDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PetWhereInput;
    limit?: number;
};
export type PetDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetSelect<ExtArgs> | null;
    omit?: Prisma.PetOmit<ExtArgs> | null;
    include?: Prisma.PetInclude<ExtArgs> | null;
};
export {};
