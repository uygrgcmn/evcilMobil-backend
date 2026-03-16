import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SitterModel = runtime.Types.Result.DefaultSelection<Prisma.$SitterPayload>;
export type AggregateSitter = {
    _count: SitterCountAggregateOutputType | null;
    _avg: SitterAvgAggregateOutputType | null;
    _sum: SitterSumAggregateOutputType | null;
    _min: SitterMinAggregateOutputType | null;
    _max: SitterMaxAggregateOutputType | null;
};
export type SitterAvgAggregateOutputType = {
    rating: number | null;
    reviewCount: number | null;
    pricePerDay: number | null;
    pricePerHour: number | null;
};
export type SitterSumAggregateOutputType = {
    rating: number | null;
    reviewCount: number | null;
    pricePerDay: number | null;
    pricePerHour: number | null;
};
export type SitterMinAggregateOutputType = {
    id: string | null;
    fullName: string | null;
    city: string | null;
    district: string | null;
    rating: number | null;
    reviewCount: number | null;
    pricePerDay: number | null;
    pricePerHour: number | null;
    avatarUrl: string | null;
    isFeatured: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SitterMaxAggregateOutputType = {
    id: string | null;
    fullName: string | null;
    city: string | null;
    district: string | null;
    rating: number | null;
    reviewCount: number | null;
    pricePerDay: number | null;
    pricePerHour: number | null;
    avatarUrl: string | null;
    isFeatured: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SitterCountAggregateOutputType = {
    id: number;
    fullName: number;
    city: number;
    district: number;
    rating: number;
    reviewCount: number;
    pricePerDay: number;
    pricePerHour: number;
    avatarUrl: number;
    isFeatured: number;
    tags: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type SitterAvgAggregateInputType = {
    rating?: true;
    reviewCount?: true;
    pricePerDay?: true;
    pricePerHour?: true;
};
export type SitterSumAggregateInputType = {
    rating?: true;
    reviewCount?: true;
    pricePerDay?: true;
    pricePerHour?: true;
};
export type SitterMinAggregateInputType = {
    id?: true;
    fullName?: true;
    city?: true;
    district?: true;
    rating?: true;
    reviewCount?: true;
    pricePerDay?: true;
    pricePerHour?: true;
    avatarUrl?: true;
    isFeatured?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SitterMaxAggregateInputType = {
    id?: true;
    fullName?: true;
    city?: true;
    district?: true;
    rating?: true;
    reviewCount?: true;
    pricePerDay?: true;
    pricePerHour?: true;
    avatarUrl?: true;
    isFeatured?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SitterCountAggregateInputType = {
    id?: true;
    fullName?: true;
    city?: true;
    district?: true;
    rating?: true;
    reviewCount?: true;
    pricePerDay?: true;
    pricePerHour?: true;
    avatarUrl?: true;
    isFeatured?: true;
    tags?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type SitterAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SitterWhereInput;
    orderBy?: Prisma.SitterOrderByWithRelationInput | Prisma.SitterOrderByWithRelationInput[];
    cursor?: Prisma.SitterWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SitterCountAggregateInputType;
    _avg?: SitterAvgAggregateInputType;
    _sum?: SitterSumAggregateInputType;
    _min?: SitterMinAggregateInputType;
    _max?: SitterMaxAggregateInputType;
};
export type GetSitterAggregateType<T extends SitterAggregateArgs> = {
    [P in keyof T & keyof AggregateSitter]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSitter[P]> : Prisma.GetScalarType<T[P], AggregateSitter[P]>;
};
export type SitterGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SitterWhereInput;
    orderBy?: Prisma.SitterOrderByWithAggregationInput | Prisma.SitterOrderByWithAggregationInput[];
    by: Prisma.SitterScalarFieldEnum[] | Prisma.SitterScalarFieldEnum;
    having?: Prisma.SitterScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SitterCountAggregateInputType | true;
    _avg?: SitterAvgAggregateInputType;
    _sum?: SitterSumAggregateInputType;
    _min?: SitterMinAggregateInputType;
    _max?: SitterMaxAggregateInputType;
};
export type SitterGroupByOutputType = {
    id: string;
    fullName: string;
    city: string;
    district: string;
    rating: number;
    reviewCount: number;
    pricePerDay: number;
    pricePerHour: number;
    avatarUrl: string;
    isFeatured: boolean;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    _count: SitterCountAggregateOutputType | null;
    _avg: SitterAvgAggregateOutputType | null;
    _sum: SitterSumAggregateOutputType | null;
    _min: SitterMinAggregateOutputType | null;
    _max: SitterMaxAggregateOutputType | null;
};
type GetSitterGroupByPayload<T extends SitterGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SitterGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SitterGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SitterGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SitterGroupByOutputType[P]>;
}>>;
export type SitterWhereInput = {
    AND?: Prisma.SitterWhereInput | Prisma.SitterWhereInput[];
    OR?: Prisma.SitterWhereInput[];
    NOT?: Prisma.SitterWhereInput | Prisma.SitterWhereInput[];
    id?: Prisma.StringFilter<"Sitter"> | string;
    fullName?: Prisma.StringFilter<"Sitter"> | string;
    city?: Prisma.StringFilter<"Sitter"> | string;
    district?: Prisma.StringFilter<"Sitter"> | string;
    rating?: Prisma.FloatFilter<"Sitter"> | number;
    reviewCount?: Prisma.IntFilter<"Sitter"> | number;
    pricePerDay?: Prisma.IntFilter<"Sitter"> | number;
    pricePerHour?: Prisma.IntFilter<"Sitter"> | number;
    avatarUrl?: Prisma.StringFilter<"Sitter"> | string;
    isFeatured?: Prisma.BoolFilter<"Sitter"> | boolean;
    tags?: Prisma.StringNullableListFilter<"Sitter">;
    createdAt?: Prisma.DateTimeFilter<"Sitter"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Sitter"> | Date | string;
};
export type SitterOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    pricePerDay?: Prisma.SortOrder;
    pricePerHour?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    isFeatured?: Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SitterWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SitterWhereInput | Prisma.SitterWhereInput[];
    OR?: Prisma.SitterWhereInput[];
    NOT?: Prisma.SitterWhereInput | Prisma.SitterWhereInput[];
    fullName?: Prisma.StringFilter<"Sitter"> | string;
    city?: Prisma.StringFilter<"Sitter"> | string;
    district?: Prisma.StringFilter<"Sitter"> | string;
    rating?: Prisma.FloatFilter<"Sitter"> | number;
    reviewCount?: Prisma.IntFilter<"Sitter"> | number;
    pricePerDay?: Prisma.IntFilter<"Sitter"> | number;
    pricePerHour?: Prisma.IntFilter<"Sitter"> | number;
    avatarUrl?: Prisma.StringFilter<"Sitter"> | string;
    isFeatured?: Prisma.BoolFilter<"Sitter"> | boolean;
    tags?: Prisma.StringNullableListFilter<"Sitter">;
    createdAt?: Prisma.DateTimeFilter<"Sitter"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Sitter"> | Date | string;
}, "id">;
export type SitterOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    pricePerDay?: Prisma.SortOrder;
    pricePerHour?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    isFeatured?: Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.SitterCountOrderByAggregateInput;
    _avg?: Prisma.SitterAvgOrderByAggregateInput;
    _max?: Prisma.SitterMaxOrderByAggregateInput;
    _min?: Prisma.SitterMinOrderByAggregateInput;
    _sum?: Prisma.SitterSumOrderByAggregateInput;
};
export type SitterScalarWhereWithAggregatesInput = {
    AND?: Prisma.SitterScalarWhereWithAggregatesInput | Prisma.SitterScalarWhereWithAggregatesInput[];
    OR?: Prisma.SitterScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SitterScalarWhereWithAggregatesInput | Prisma.SitterScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Sitter"> | string;
    fullName?: Prisma.StringWithAggregatesFilter<"Sitter"> | string;
    city?: Prisma.StringWithAggregatesFilter<"Sitter"> | string;
    district?: Prisma.StringWithAggregatesFilter<"Sitter"> | string;
    rating?: Prisma.FloatWithAggregatesFilter<"Sitter"> | number;
    reviewCount?: Prisma.IntWithAggregatesFilter<"Sitter"> | number;
    pricePerDay?: Prisma.IntWithAggregatesFilter<"Sitter"> | number;
    pricePerHour?: Prisma.IntWithAggregatesFilter<"Sitter"> | number;
    avatarUrl?: Prisma.StringWithAggregatesFilter<"Sitter"> | string;
    isFeatured?: Prisma.BoolWithAggregatesFilter<"Sitter"> | boolean;
    tags?: Prisma.StringNullableListFilter<"Sitter">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Sitter"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Sitter"> | Date | string;
};
export type SitterCreateInput = {
    id?: string;
    fullName: string;
    city: string;
    district: string;
    rating: number;
    reviewCount: number;
    pricePerDay: number;
    pricePerHour: number;
    avatarUrl: string;
    isFeatured: boolean;
    tags?: Prisma.SitterCreatetagsInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SitterUncheckedCreateInput = {
    id?: string;
    fullName: string;
    city: string;
    district: string;
    rating: number;
    reviewCount: number;
    pricePerDay: number;
    pricePerHour: number;
    avatarUrl: string;
    isFeatured: boolean;
    tags?: Prisma.SitterCreatetagsInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SitterUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    pricePerDay?: Prisma.IntFieldUpdateOperationsInput | number;
    pricePerHour?: Prisma.IntFieldUpdateOperationsInput | number;
    avatarUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    tags?: Prisma.SitterUpdatetagsInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SitterUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    pricePerDay?: Prisma.IntFieldUpdateOperationsInput | number;
    pricePerHour?: Prisma.IntFieldUpdateOperationsInput | number;
    avatarUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    tags?: Prisma.SitterUpdatetagsInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SitterCreateManyInput = {
    id?: string;
    fullName: string;
    city: string;
    district: string;
    rating: number;
    reviewCount: number;
    pricePerDay: number;
    pricePerHour: number;
    avatarUrl: string;
    isFeatured: boolean;
    tags?: Prisma.SitterCreatetagsInput | string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SitterUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    pricePerDay?: Prisma.IntFieldUpdateOperationsInput | number;
    pricePerHour?: Prisma.IntFieldUpdateOperationsInput | number;
    avatarUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    tags?: Prisma.SitterUpdatetagsInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SitterUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    district?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    pricePerDay?: Prisma.IntFieldUpdateOperationsInput | number;
    pricePerHour?: Prisma.IntFieldUpdateOperationsInput | number;
    avatarUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    tags?: Prisma.SitterUpdatetagsInput | string[];
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type SitterCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    pricePerDay?: Prisma.SortOrder;
    pricePerHour?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    isFeatured?: Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SitterAvgOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    pricePerDay?: Prisma.SortOrder;
    pricePerHour?: Prisma.SortOrder;
};
export type SitterMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    pricePerDay?: Prisma.SortOrder;
    pricePerHour?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    isFeatured?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SitterMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    district?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    pricePerDay?: Prisma.SortOrder;
    pricePerHour?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    isFeatured?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SitterSumOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    pricePerDay?: Prisma.SortOrder;
    pricePerHour?: Prisma.SortOrder;
};
export type SitterCreatetagsInput = {
    set: string[];
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type SitterUpdatetagsInput = {
    set?: string[];
    push?: string | string[];
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type SitterSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    city?: boolean;
    district?: boolean;
    rating?: boolean;
    reviewCount?: boolean;
    pricePerDay?: boolean;
    pricePerHour?: boolean;
    avatarUrl?: boolean;
    isFeatured?: boolean;
    tags?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["sitter"]>;
export type SitterSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    city?: boolean;
    district?: boolean;
    rating?: boolean;
    reviewCount?: boolean;
    pricePerDay?: boolean;
    pricePerHour?: boolean;
    avatarUrl?: boolean;
    isFeatured?: boolean;
    tags?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["sitter"]>;
export type SitterSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    city?: boolean;
    district?: boolean;
    rating?: boolean;
    reviewCount?: boolean;
    pricePerDay?: boolean;
    pricePerHour?: boolean;
    avatarUrl?: boolean;
    isFeatured?: boolean;
    tags?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["sitter"]>;
export type SitterSelectScalar = {
    id?: boolean;
    fullName?: boolean;
    city?: boolean;
    district?: boolean;
    rating?: boolean;
    reviewCount?: boolean;
    pricePerDay?: boolean;
    pricePerHour?: boolean;
    avatarUrl?: boolean;
    isFeatured?: boolean;
    tags?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type SitterOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "fullName" | "city" | "district" | "rating" | "reviewCount" | "pricePerDay" | "pricePerHour" | "avatarUrl" | "isFeatured" | "tags" | "createdAt" | "updatedAt", ExtArgs["result"]["sitter"]>;
export type $SitterPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Sitter";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        fullName: string;
        city: string;
        district: string;
        rating: number;
        reviewCount: number;
        pricePerDay: number;
        pricePerHour: number;
        avatarUrl: string;
        isFeatured: boolean;
        tags: string[];
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["sitter"]>;
    composites: {};
};
export type SitterGetPayload<S extends boolean | null | undefined | SitterDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SitterPayload, S>;
export type SitterCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SitterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SitterCountAggregateInputType | true;
};
export interface SitterDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Sitter'];
        meta: {
            name: 'Sitter';
        };
    };
    findUnique<T extends SitterFindUniqueArgs>(args: Prisma.SelectSubset<T, SitterFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SitterClient<runtime.Types.Result.GetResult<Prisma.$SitterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SitterFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SitterFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SitterClient<runtime.Types.Result.GetResult<Prisma.$SitterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SitterFindFirstArgs>(args?: Prisma.SelectSubset<T, SitterFindFirstArgs<ExtArgs>>): Prisma.Prisma__SitterClient<runtime.Types.Result.GetResult<Prisma.$SitterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SitterFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SitterFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SitterClient<runtime.Types.Result.GetResult<Prisma.$SitterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SitterFindManyArgs>(args?: Prisma.SelectSubset<T, SitterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SitterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SitterCreateArgs>(args: Prisma.SelectSubset<T, SitterCreateArgs<ExtArgs>>): Prisma.Prisma__SitterClient<runtime.Types.Result.GetResult<Prisma.$SitterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SitterCreateManyArgs>(args?: Prisma.SelectSubset<T, SitterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SitterCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SitterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SitterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SitterDeleteArgs>(args: Prisma.SelectSubset<T, SitterDeleteArgs<ExtArgs>>): Prisma.Prisma__SitterClient<runtime.Types.Result.GetResult<Prisma.$SitterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SitterUpdateArgs>(args: Prisma.SelectSubset<T, SitterUpdateArgs<ExtArgs>>): Prisma.Prisma__SitterClient<runtime.Types.Result.GetResult<Prisma.$SitterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SitterDeleteManyArgs>(args?: Prisma.SelectSubset<T, SitterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SitterUpdateManyArgs>(args: Prisma.SelectSubset<T, SitterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SitterUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SitterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SitterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SitterUpsertArgs>(args: Prisma.SelectSubset<T, SitterUpsertArgs<ExtArgs>>): Prisma.Prisma__SitterClient<runtime.Types.Result.GetResult<Prisma.$SitterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SitterCountArgs>(args?: Prisma.Subset<T, SitterCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SitterCountAggregateOutputType> : number>;
    aggregate<T extends SitterAggregateArgs>(args: Prisma.Subset<T, SitterAggregateArgs>): Prisma.PrismaPromise<GetSitterAggregateType<T>>;
    groupBy<T extends SitterGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SitterGroupByArgs['orderBy'];
    } : {
        orderBy?: SitterGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SitterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSitterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SitterFieldRefs;
}
export interface Prisma__SitterClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SitterFieldRefs {
    readonly id: Prisma.FieldRef<"Sitter", 'String'>;
    readonly fullName: Prisma.FieldRef<"Sitter", 'String'>;
    readonly city: Prisma.FieldRef<"Sitter", 'String'>;
    readonly district: Prisma.FieldRef<"Sitter", 'String'>;
    readonly rating: Prisma.FieldRef<"Sitter", 'Float'>;
    readonly reviewCount: Prisma.FieldRef<"Sitter", 'Int'>;
    readonly pricePerDay: Prisma.FieldRef<"Sitter", 'Int'>;
    readonly pricePerHour: Prisma.FieldRef<"Sitter", 'Int'>;
    readonly avatarUrl: Prisma.FieldRef<"Sitter", 'String'>;
    readonly isFeatured: Prisma.FieldRef<"Sitter", 'Boolean'>;
    readonly tags: Prisma.FieldRef<"Sitter", 'String[]'>;
    readonly createdAt: Prisma.FieldRef<"Sitter", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Sitter", 'DateTime'>;
}
export type SitterFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SitterSelect<ExtArgs> | null;
    omit?: Prisma.SitterOmit<ExtArgs> | null;
    where: Prisma.SitterWhereUniqueInput;
};
export type SitterFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SitterSelect<ExtArgs> | null;
    omit?: Prisma.SitterOmit<ExtArgs> | null;
    where: Prisma.SitterWhereUniqueInput;
};
export type SitterFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SitterSelect<ExtArgs> | null;
    omit?: Prisma.SitterOmit<ExtArgs> | null;
    where?: Prisma.SitterWhereInput;
    orderBy?: Prisma.SitterOrderByWithRelationInput | Prisma.SitterOrderByWithRelationInput[];
    cursor?: Prisma.SitterWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SitterScalarFieldEnum | Prisma.SitterScalarFieldEnum[];
};
export type SitterFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SitterSelect<ExtArgs> | null;
    omit?: Prisma.SitterOmit<ExtArgs> | null;
    where?: Prisma.SitterWhereInput;
    orderBy?: Prisma.SitterOrderByWithRelationInput | Prisma.SitterOrderByWithRelationInput[];
    cursor?: Prisma.SitterWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SitterScalarFieldEnum | Prisma.SitterScalarFieldEnum[];
};
export type SitterFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SitterSelect<ExtArgs> | null;
    omit?: Prisma.SitterOmit<ExtArgs> | null;
    where?: Prisma.SitterWhereInput;
    orderBy?: Prisma.SitterOrderByWithRelationInput | Prisma.SitterOrderByWithRelationInput[];
    cursor?: Prisma.SitterWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SitterScalarFieldEnum | Prisma.SitterScalarFieldEnum[];
};
export type SitterCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SitterSelect<ExtArgs> | null;
    omit?: Prisma.SitterOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SitterCreateInput, Prisma.SitterUncheckedCreateInput>;
};
export type SitterCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SitterCreateManyInput | Prisma.SitterCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SitterCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SitterSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SitterOmit<ExtArgs> | null;
    data: Prisma.SitterCreateManyInput | Prisma.SitterCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SitterUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SitterSelect<ExtArgs> | null;
    omit?: Prisma.SitterOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SitterUpdateInput, Prisma.SitterUncheckedUpdateInput>;
    where: Prisma.SitterWhereUniqueInput;
};
export type SitterUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SitterUpdateManyMutationInput, Prisma.SitterUncheckedUpdateManyInput>;
    where?: Prisma.SitterWhereInput;
    limit?: number;
};
export type SitterUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SitterSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SitterOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SitterUpdateManyMutationInput, Prisma.SitterUncheckedUpdateManyInput>;
    where?: Prisma.SitterWhereInput;
    limit?: number;
};
export type SitterUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SitterSelect<ExtArgs> | null;
    omit?: Prisma.SitterOmit<ExtArgs> | null;
    where: Prisma.SitterWhereUniqueInput;
    create: Prisma.XOR<Prisma.SitterCreateInput, Prisma.SitterUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SitterUpdateInput, Prisma.SitterUncheckedUpdateInput>;
};
export type SitterDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SitterSelect<ExtArgs> | null;
    omit?: Prisma.SitterOmit<ExtArgs> | null;
    where: Prisma.SitterWhereUniqueInput;
};
export type SitterDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SitterWhereInput;
    limit?: number;
};
export type SitterDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SitterSelect<ExtArgs> | null;
    omit?: Prisma.SitterOmit<ExtArgs> | null;
};
export {};
