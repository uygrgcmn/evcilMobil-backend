import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BadgeModel = runtime.Types.Result.DefaultSelection<Prisma.$BadgePayload>;
export type AggregateBadge = {
    _count: BadgeCountAggregateOutputType | null;
    _min: BadgeMinAggregateOutputType | null;
    _max: BadgeMaxAggregateOutputType | null;
};
export type BadgeMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    icon: string | null;
    profileId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BadgeMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    icon: string | null;
    profileId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BadgeCountAggregateOutputType = {
    id: number;
    title: number;
    icon: number;
    profileId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type BadgeMinAggregateInputType = {
    id?: true;
    title?: true;
    icon?: true;
    profileId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BadgeMaxAggregateInputType = {
    id?: true;
    title?: true;
    icon?: true;
    profileId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BadgeCountAggregateInputType = {
    id?: true;
    title?: true;
    icon?: true;
    profileId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BadgeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BadgeWhereInput;
    orderBy?: Prisma.BadgeOrderByWithRelationInput | Prisma.BadgeOrderByWithRelationInput[];
    cursor?: Prisma.BadgeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BadgeCountAggregateInputType;
    _min?: BadgeMinAggregateInputType;
    _max?: BadgeMaxAggregateInputType;
};
export type GetBadgeAggregateType<T extends BadgeAggregateArgs> = {
    [P in keyof T & keyof AggregateBadge]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBadge[P]> : Prisma.GetScalarType<T[P], AggregateBadge[P]>;
};
export type BadgeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BadgeWhereInput;
    orderBy?: Prisma.BadgeOrderByWithAggregationInput | Prisma.BadgeOrderByWithAggregationInput[];
    by: Prisma.BadgeScalarFieldEnum[] | Prisma.BadgeScalarFieldEnum;
    having?: Prisma.BadgeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BadgeCountAggregateInputType | true;
    _min?: BadgeMinAggregateInputType;
    _max?: BadgeMaxAggregateInputType;
};
export type BadgeGroupByOutputType = {
    id: string;
    title: string;
    icon: string;
    profileId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: BadgeCountAggregateOutputType | null;
    _min: BadgeMinAggregateOutputType | null;
    _max: BadgeMaxAggregateOutputType | null;
};
type GetBadgeGroupByPayload<T extends BadgeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BadgeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BadgeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BadgeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BadgeGroupByOutputType[P]>;
}>>;
export type BadgeWhereInput = {
    AND?: Prisma.BadgeWhereInput | Prisma.BadgeWhereInput[];
    OR?: Prisma.BadgeWhereInput[];
    NOT?: Prisma.BadgeWhereInput | Prisma.BadgeWhereInput[];
    id?: Prisma.StringFilter<"Badge"> | string;
    title?: Prisma.StringFilter<"Badge"> | string;
    icon?: Prisma.StringFilter<"Badge"> | string;
    profileId?: Prisma.StringFilter<"Badge"> | string;
    createdAt?: Prisma.DateTimeFilter<"Badge"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Badge"> | Date | string;
    profile?: Prisma.XOR<Prisma.OwnerProfileScalarRelationFilter, Prisma.OwnerProfileWhereInput>;
};
export type BadgeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    profileId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    profile?: Prisma.OwnerProfileOrderByWithRelationInput;
};
export type BadgeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.BadgeWhereInput | Prisma.BadgeWhereInput[];
    OR?: Prisma.BadgeWhereInput[];
    NOT?: Prisma.BadgeWhereInput | Prisma.BadgeWhereInput[];
    title?: Prisma.StringFilter<"Badge"> | string;
    icon?: Prisma.StringFilter<"Badge"> | string;
    profileId?: Prisma.StringFilter<"Badge"> | string;
    createdAt?: Prisma.DateTimeFilter<"Badge"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Badge"> | Date | string;
    profile?: Prisma.XOR<Prisma.OwnerProfileScalarRelationFilter, Prisma.OwnerProfileWhereInput>;
}, "id">;
export type BadgeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    profileId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BadgeCountOrderByAggregateInput;
    _max?: Prisma.BadgeMaxOrderByAggregateInput;
    _min?: Prisma.BadgeMinOrderByAggregateInput;
};
export type BadgeScalarWhereWithAggregatesInput = {
    AND?: Prisma.BadgeScalarWhereWithAggregatesInput | Prisma.BadgeScalarWhereWithAggregatesInput[];
    OR?: Prisma.BadgeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BadgeScalarWhereWithAggregatesInput | Prisma.BadgeScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Badge"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Badge"> | string;
    icon?: Prisma.StringWithAggregatesFilter<"Badge"> | string;
    profileId?: Prisma.StringWithAggregatesFilter<"Badge"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Badge"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Badge"> | Date | string;
};
export type BadgeCreateInput = {
    id?: string;
    title: string;
    icon: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profile: Prisma.OwnerProfileCreateNestedOneWithoutBadgesInput;
};
export type BadgeUncheckedCreateInput = {
    id?: string;
    title: string;
    icon: string;
    profileId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BadgeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profile?: Prisma.OwnerProfileUpdateOneRequiredWithoutBadgesNestedInput;
};
export type BadgeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    profileId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BadgeCreateManyInput = {
    id?: string;
    title: string;
    icon: string;
    profileId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BadgeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BadgeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    profileId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BadgeListRelationFilter = {
    every?: Prisma.BadgeWhereInput;
    some?: Prisma.BadgeWhereInput;
    none?: Prisma.BadgeWhereInput;
};
export type BadgeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BadgeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    profileId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BadgeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    profileId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BadgeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    profileId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BadgeCreateNestedManyWithoutProfileInput = {
    create?: Prisma.XOR<Prisma.BadgeCreateWithoutProfileInput, Prisma.BadgeUncheckedCreateWithoutProfileInput> | Prisma.BadgeCreateWithoutProfileInput[] | Prisma.BadgeUncheckedCreateWithoutProfileInput[];
    connectOrCreate?: Prisma.BadgeCreateOrConnectWithoutProfileInput | Prisma.BadgeCreateOrConnectWithoutProfileInput[];
    createMany?: Prisma.BadgeCreateManyProfileInputEnvelope;
    connect?: Prisma.BadgeWhereUniqueInput | Prisma.BadgeWhereUniqueInput[];
};
export type BadgeUncheckedCreateNestedManyWithoutProfileInput = {
    create?: Prisma.XOR<Prisma.BadgeCreateWithoutProfileInput, Prisma.BadgeUncheckedCreateWithoutProfileInput> | Prisma.BadgeCreateWithoutProfileInput[] | Prisma.BadgeUncheckedCreateWithoutProfileInput[];
    connectOrCreate?: Prisma.BadgeCreateOrConnectWithoutProfileInput | Prisma.BadgeCreateOrConnectWithoutProfileInput[];
    createMany?: Prisma.BadgeCreateManyProfileInputEnvelope;
    connect?: Prisma.BadgeWhereUniqueInput | Prisma.BadgeWhereUniqueInput[];
};
export type BadgeUpdateManyWithoutProfileNestedInput = {
    create?: Prisma.XOR<Prisma.BadgeCreateWithoutProfileInput, Prisma.BadgeUncheckedCreateWithoutProfileInput> | Prisma.BadgeCreateWithoutProfileInput[] | Prisma.BadgeUncheckedCreateWithoutProfileInput[];
    connectOrCreate?: Prisma.BadgeCreateOrConnectWithoutProfileInput | Prisma.BadgeCreateOrConnectWithoutProfileInput[];
    upsert?: Prisma.BadgeUpsertWithWhereUniqueWithoutProfileInput | Prisma.BadgeUpsertWithWhereUniqueWithoutProfileInput[];
    createMany?: Prisma.BadgeCreateManyProfileInputEnvelope;
    set?: Prisma.BadgeWhereUniqueInput | Prisma.BadgeWhereUniqueInput[];
    disconnect?: Prisma.BadgeWhereUniqueInput | Prisma.BadgeWhereUniqueInput[];
    delete?: Prisma.BadgeWhereUniqueInput | Prisma.BadgeWhereUniqueInput[];
    connect?: Prisma.BadgeWhereUniqueInput | Prisma.BadgeWhereUniqueInput[];
    update?: Prisma.BadgeUpdateWithWhereUniqueWithoutProfileInput | Prisma.BadgeUpdateWithWhereUniqueWithoutProfileInput[];
    updateMany?: Prisma.BadgeUpdateManyWithWhereWithoutProfileInput | Prisma.BadgeUpdateManyWithWhereWithoutProfileInput[];
    deleteMany?: Prisma.BadgeScalarWhereInput | Prisma.BadgeScalarWhereInput[];
};
export type BadgeUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: Prisma.XOR<Prisma.BadgeCreateWithoutProfileInput, Prisma.BadgeUncheckedCreateWithoutProfileInput> | Prisma.BadgeCreateWithoutProfileInput[] | Prisma.BadgeUncheckedCreateWithoutProfileInput[];
    connectOrCreate?: Prisma.BadgeCreateOrConnectWithoutProfileInput | Prisma.BadgeCreateOrConnectWithoutProfileInput[];
    upsert?: Prisma.BadgeUpsertWithWhereUniqueWithoutProfileInput | Prisma.BadgeUpsertWithWhereUniqueWithoutProfileInput[];
    createMany?: Prisma.BadgeCreateManyProfileInputEnvelope;
    set?: Prisma.BadgeWhereUniqueInput | Prisma.BadgeWhereUniqueInput[];
    disconnect?: Prisma.BadgeWhereUniqueInput | Prisma.BadgeWhereUniqueInput[];
    delete?: Prisma.BadgeWhereUniqueInput | Prisma.BadgeWhereUniqueInput[];
    connect?: Prisma.BadgeWhereUniqueInput | Prisma.BadgeWhereUniqueInput[];
    update?: Prisma.BadgeUpdateWithWhereUniqueWithoutProfileInput | Prisma.BadgeUpdateWithWhereUniqueWithoutProfileInput[];
    updateMany?: Prisma.BadgeUpdateManyWithWhereWithoutProfileInput | Prisma.BadgeUpdateManyWithWhereWithoutProfileInput[];
    deleteMany?: Prisma.BadgeScalarWhereInput | Prisma.BadgeScalarWhereInput[];
};
export type BadgeCreateWithoutProfileInput = {
    id?: string;
    title: string;
    icon: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BadgeUncheckedCreateWithoutProfileInput = {
    id?: string;
    title: string;
    icon: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BadgeCreateOrConnectWithoutProfileInput = {
    where: Prisma.BadgeWhereUniqueInput;
    create: Prisma.XOR<Prisma.BadgeCreateWithoutProfileInput, Prisma.BadgeUncheckedCreateWithoutProfileInput>;
};
export type BadgeCreateManyProfileInputEnvelope = {
    data: Prisma.BadgeCreateManyProfileInput | Prisma.BadgeCreateManyProfileInput[];
    skipDuplicates?: boolean;
};
export type BadgeUpsertWithWhereUniqueWithoutProfileInput = {
    where: Prisma.BadgeWhereUniqueInput;
    update: Prisma.XOR<Prisma.BadgeUpdateWithoutProfileInput, Prisma.BadgeUncheckedUpdateWithoutProfileInput>;
    create: Prisma.XOR<Prisma.BadgeCreateWithoutProfileInput, Prisma.BadgeUncheckedCreateWithoutProfileInput>;
};
export type BadgeUpdateWithWhereUniqueWithoutProfileInput = {
    where: Prisma.BadgeWhereUniqueInput;
    data: Prisma.XOR<Prisma.BadgeUpdateWithoutProfileInput, Prisma.BadgeUncheckedUpdateWithoutProfileInput>;
};
export type BadgeUpdateManyWithWhereWithoutProfileInput = {
    where: Prisma.BadgeScalarWhereInput;
    data: Prisma.XOR<Prisma.BadgeUpdateManyMutationInput, Prisma.BadgeUncheckedUpdateManyWithoutProfileInput>;
};
export type BadgeScalarWhereInput = {
    AND?: Prisma.BadgeScalarWhereInput | Prisma.BadgeScalarWhereInput[];
    OR?: Prisma.BadgeScalarWhereInput[];
    NOT?: Prisma.BadgeScalarWhereInput | Prisma.BadgeScalarWhereInput[];
    id?: Prisma.StringFilter<"Badge"> | string;
    title?: Prisma.StringFilter<"Badge"> | string;
    icon?: Prisma.StringFilter<"Badge"> | string;
    profileId?: Prisma.StringFilter<"Badge"> | string;
    createdAt?: Prisma.DateTimeFilter<"Badge"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Badge"> | Date | string;
};
export type BadgeCreateManyProfileInput = {
    id?: string;
    title: string;
    icon: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BadgeUpdateWithoutProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BadgeUncheckedUpdateWithoutProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BadgeUncheckedUpdateManyWithoutProfileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BadgeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    icon?: boolean;
    profileId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    profile?: boolean | Prisma.OwnerProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["badge"]>;
export type BadgeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    icon?: boolean;
    profileId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    profile?: boolean | Prisma.OwnerProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["badge"]>;
export type BadgeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    icon?: boolean;
    profileId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    profile?: boolean | Prisma.OwnerProfileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["badge"]>;
export type BadgeSelectScalar = {
    id?: boolean;
    title?: boolean;
    icon?: boolean;
    profileId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type BadgeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "icon" | "profileId" | "createdAt" | "updatedAt", ExtArgs["result"]["badge"]>;
export type BadgeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    profile?: boolean | Prisma.OwnerProfileDefaultArgs<ExtArgs>;
};
export type BadgeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    profile?: boolean | Prisma.OwnerProfileDefaultArgs<ExtArgs>;
};
export type BadgeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    profile?: boolean | Prisma.OwnerProfileDefaultArgs<ExtArgs>;
};
export type $BadgePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Badge";
    objects: {
        profile: Prisma.$OwnerProfilePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string;
        icon: string;
        profileId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["badge"]>;
    composites: {};
};
export type BadgeGetPayload<S extends boolean | null | undefined | BadgeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BadgePayload, S>;
export type BadgeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BadgeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BadgeCountAggregateInputType | true;
};
export interface BadgeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Badge'];
        meta: {
            name: 'Badge';
        };
    };
    findUnique<T extends BadgeFindUniqueArgs>(args: Prisma.SelectSubset<T, BadgeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BadgeClient<runtime.Types.Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BadgeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BadgeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BadgeClient<runtime.Types.Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BadgeFindFirstArgs>(args?: Prisma.SelectSubset<T, BadgeFindFirstArgs<ExtArgs>>): Prisma.Prisma__BadgeClient<runtime.Types.Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BadgeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BadgeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BadgeClient<runtime.Types.Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BadgeFindManyArgs>(args?: Prisma.SelectSubset<T, BadgeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BadgeCreateArgs>(args: Prisma.SelectSubset<T, BadgeCreateArgs<ExtArgs>>): Prisma.Prisma__BadgeClient<runtime.Types.Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BadgeCreateManyArgs>(args?: Prisma.SelectSubset<T, BadgeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BadgeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BadgeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BadgeDeleteArgs>(args: Prisma.SelectSubset<T, BadgeDeleteArgs<ExtArgs>>): Prisma.Prisma__BadgeClient<runtime.Types.Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BadgeUpdateArgs>(args: Prisma.SelectSubset<T, BadgeUpdateArgs<ExtArgs>>): Prisma.Prisma__BadgeClient<runtime.Types.Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BadgeDeleteManyArgs>(args?: Prisma.SelectSubset<T, BadgeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BadgeUpdateManyArgs>(args: Prisma.SelectSubset<T, BadgeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BadgeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BadgeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BadgeUpsertArgs>(args: Prisma.SelectSubset<T, BadgeUpsertArgs<ExtArgs>>): Prisma.Prisma__BadgeClient<runtime.Types.Result.GetResult<Prisma.$BadgePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BadgeCountArgs>(args?: Prisma.Subset<T, BadgeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BadgeCountAggregateOutputType> : number>;
    aggregate<T extends BadgeAggregateArgs>(args: Prisma.Subset<T, BadgeAggregateArgs>): Prisma.PrismaPromise<GetBadgeAggregateType<T>>;
    groupBy<T extends BadgeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BadgeGroupByArgs['orderBy'];
    } : {
        orderBy?: BadgeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BadgeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBadgeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BadgeFieldRefs;
}
export interface Prisma__BadgeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    profile<T extends Prisma.OwnerProfileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OwnerProfileDefaultArgs<ExtArgs>>): Prisma.Prisma__OwnerProfileClient<runtime.Types.Result.GetResult<Prisma.$OwnerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BadgeFieldRefs {
    readonly id: Prisma.FieldRef<"Badge", 'String'>;
    readonly title: Prisma.FieldRef<"Badge", 'String'>;
    readonly icon: Prisma.FieldRef<"Badge", 'String'>;
    readonly profileId: Prisma.FieldRef<"Badge", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Badge", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Badge", 'DateTime'>;
}
export type BadgeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BadgeSelect<ExtArgs> | null;
    omit?: Prisma.BadgeOmit<ExtArgs> | null;
    include?: Prisma.BadgeInclude<ExtArgs> | null;
    where: Prisma.BadgeWhereUniqueInput;
};
export type BadgeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BadgeSelect<ExtArgs> | null;
    omit?: Prisma.BadgeOmit<ExtArgs> | null;
    include?: Prisma.BadgeInclude<ExtArgs> | null;
    where: Prisma.BadgeWhereUniqueInput;
};
export type BadgeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type BadgeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type BadgeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type BadgeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BadgeSelect<ExtArgs> | null;
    omit?: Prisma.BadgeOmit<ExtArgs> | null;
    include?: Prisma.BadgeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BadgeCreateInput, Prisma.BadgeUncheckedCreateInput>;
};
export type BadgeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BadgeCreateManyInput | Prisma.BadgeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BadgeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BadgeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BadgeOmit<ExtArgs> | null;
    data: Prisma.BadgeCreateManyInput | Prisma.BadgeCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BadgeIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BadgeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BadgeSelect<ExtArgs> | null;
    omit?: Prisma.BadgeOmit<ExtArgs> | null;
    include?: Prisma.BadgeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BadgeUpdateInput, Prisma.BadgeUncheckedUpdateInput>;
    where: Prisma.BadgeWhereUniqueInput;
};
export type BadgeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BadgeUpdateManyMutationInput, Prisma.BadgeUncheckedUpdateManyInput>;
    where?: Prisma.BadgeWhereInput;
    limit?: number;
};
export type BadgeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BadgeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BadgeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BadgeUpdateManyMutationInput, Prisma.BadgeUncheckedUpdateManyInput>;
    where?: Prisma.BadgeWhereInput;
    limit?: number;
    include?: Prisma.BadgeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BadgeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BadgeSelect<ExtArgs> | null;
    omit?: Prisma.BadgeOmit<ExtArgs> | null;
    include?: Prisma.BadgeInclude<ExtArgs> | null;
    where: Prisma.BadgeWhereUniqueInput;
    create: Prisma.XOR<Prisma.BadgeCreateInput, Prisma.BadgeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BadgeUpdateInput, Prisma.BadgeUncheckedUpdateInput>;
};
export type BadgeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BadgeSelect<ExtArgs> | null;
    omit?: Prisma.BadgeOmit<ExtArgs> | null;
    include?: Prisma.BadgeInclude<ExtArgs> | null;
    where: Prisma.BadgeWhereUniqueInput;
};
export type BadgeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BadgeWhereInput;
    limit?: number;
};
export type BadgeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BadgeSelect<ExtArgs> | null;
    omit?: Prisma.BadgeOmit<ExtArgs> | null;
    include?: Prisma.BadgeInclude<ExtArgs> | null;
};
export {};
