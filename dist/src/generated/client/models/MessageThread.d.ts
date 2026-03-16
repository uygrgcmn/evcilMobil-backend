import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MessageThreadModel = runtime.Types.Result.DefaultSelection<Prisma.$MessageThreadPayload>;
export type AggregateMessageThread = {
    _count: MessageThreadCountAggregateOutputType | null;
    _avg: MessageThreadAvgAggregateOutputType | null;
    _sum: MessageThreadSumAggregateOutputType | null;
    _min: MessageThreadMinAggregateOutputType | null;
    _max: MessageThreadMaxAggregateOutputType | null;
};
export type MessageThreadAvgAggregateOutputType = {
    unreadCount: number | null;
};
export type MessageThreadSumAggregateOutputType = {
    unreadCount: number | null;
};
export type MessageThreadMinAggregateOutputType = {
    id: string | null;
    senderName: string | null;
    avatarUrl: string | null;
    previewText: string | null;
    timeLabel: string | null;
    unreadCount: number | null;
    isOnline: boolean | null;
    isPriority: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MessageThreadMaxAggregateOutputType = {
    id: string | null;
    senderName: string | null;
    avatarUrl: string | null;
    previewText: string | null;
    timeLabel: string | null;
    unreadCount: number | null;
    isOnline: boolean | null;
    isPriority: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MessageThreadCountAggregateOutputType = {
    id: number;
    senderName: number;
    avatarUrl: number;
    previewText: number;
    timeLabel: number;
    unreadCount: number;
    isOnline: number;
    isPriority: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type MessageThreadAvgAggregateInputType = {
    unreadCount?: true;
};
export type MessageThreadSumAggregateInputType = {
    unreadCount?: true;
};
export type MessageThreadMinAggregateInputType = {
    id?: true;
    senderName?: true;
    avatarUrl?: true;
    previewText?: true;
    timeLabel?: true;
    unreadCount?: true;
    isOnline?: true;
    isPriority?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MessageThreadMaxAggregateInputType = {
    id?: true;
    senderName?: true;
    avatarUrl?: true;
    previewText?: true;
    timeLabel?: true;
    unreadCount?: true;
    isOnline?: true;
    isPriority?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MessageThreadCountAggregateInputType = {
    id?: true;
    senderName?: true;
    avatarUrl?: true;
    previewText?: true;
    timeLabel?: true;
    unreadCount?: true;
    isOnline?: true;
    isPriority?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type MessageThreadAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageThreadWhereInput;
    orderBy?: Prisma.MessageThreadOrderByWithRelationInput | Prisma.MessageThreadOrderByWithRelationInput[];
    cursor?: Prisma.MessageThreadWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MessageThreadCountAggregateInputType;
    _avg?: MessageThreadAvgAggregateInputType;
    _sum?: MessageThreadSumAggregateInputType;
    _min?: MessageThreadMinAggregateInputType;
    _max?: MessageThreadMaxAggregateInputType;
};
export type GetMessageThreadAggregateType<T extends MessageThreadAggregateArgs> = {
    [P in keyof T & keyof AggregateMessageThread]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMessageThread[P]> : Prisma.GetScalarType<T[P], AggregateMessageThread[P]>;
};
export type MessageThreadGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageThreadWhereInput;
    orderBy?: Prisma.MessageThreadOrderByWithAggregationInput | Prisma.MessageThreadOrderByWithAggregationInput[];
    by: Prisma.MessageThreadScalarFieldEnum[] | Prisma.MessageThreadScalarFieldEnum;
    having?: Prisma.MessageThreadScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MessageThreadCountAggregateInputType | true;
    _avg?: MessageThreadAvgAggregateInputType;
    _sum?: MessageThreadSumAggregateInputType;
    _min?: MessageThreadMinAggregateInputType;
    _max?: MessageThreadMaxAggregateInputType;
};
export type MessageThreadGroupByOutputType = {
    id: string;
    senderName: string;
    avatarUrl: string;
    previewText: string;
    timeLabel: string;
    unreadCount: number;
    isOnline: boolean;
    isPriority: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: MessageThreadCountAggregateOutputType | null;
    _avg: MessageThreadAvgAggregateOutputType | null;
    _sum: MessageThreadSumAggregateOutputType | null;
    _min: MessageThreadMinAggregateOutputType | null;
    _max: MessageThreadMaxAggregateOutputType | null;
};
type GetMessageThreadGroupByPayload<T extends MessageThreadGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MessageThreadGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MessageThreadGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MessageThreadGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MessageThreadGroupByOutputType[P]>;
}>>;
export type MessageThreadWhereInput = {
    AND?: Prisma.MessageThreadWhereInput | Prisma.MessageThreadWhereInput[];
    OR?: Prisma.MessageThreadWhereInput[];
    NOT?: Prisma.MessageThreadWhereInput | Prisma.MessageThreadWhereInput[];
    id?: Prisma.StringFilter<"MessageThread"> | string;
    senderName?: Prisma.StringFilter<"MessageThread"> | string;
    avatarUrl?: Prisma.StringFilter<"MessageThread"> | string;
    previewText?: Prisma.StringFilter<"MessageThread"> | string;
    timeLabel?: Prisma.StringFilter<"MessageThread"> | string;
    unreadCount?: Prisma.IntFilter<"MessageThread"> | number;
    isOnline?: Prisma.BoolFilter<"MessageThread"> | boolean;
    isPriority?: Prisma.BoolFilter<"MessageThread"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"MessageThread"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MessageThread"> | Date | string;
};
export type MessageThreadOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    senderName?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    previewText?: Prisma.SortOrder;
    timeLabel?: Prisma.SortOrder;
    unreadCount?: Prisma.SortOrder;
    isOnline?: Prisma.SortOrder;
    isPriority?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MessageThreadWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.MessageThreadWhereInput | Prisma.MessageThreadWhereInput[];
    OR?: Prisma.MessageThreadWhereInput[];
    NOT?: Prisma.MessageThreadWhereInput | Prisma.MessageThreadWhereInput[];
    senderName?: Prisma.StringFilter<"MessageThread"> | string;
    avatarUrl?: Prisma.StringFilter<"MessageThread"> | string;
    previewText?: Prisma.StringFilter<"MessageThread"> | string;
    timeLabel?: Prisma.StringFilter<"MessageThread"> | string;
    unreadCount?: Prisma.IntFilter<"MessageThread"> | number;
    isOnline?: Prisma.BoolFilter<"MessageThread"> | boolean;
    isPriority?: Prisma.BoolFilter<"MessageThread"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"MessageThread"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MessageThread"> | Date | string;
}, "id">;
export type MessageThreadOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    senderName?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    previewText?: Prisma.SortOrder;
    timeLabel?: Prisma.SortOrder;
    unreadCount?: Prisma.SortOrder;
    isOnline?: Prisma.SortOrder;
    isPriority?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.MessageThreadCountOrderByAggregateInput;
    _avg?: Prisma.MessageThreadAvgOrderByAggregateInput;
    _max?: Prisma.MessageThreadMaxOrderByAggregateInput;
    _min?: Prisma.MessageThreadMinOrderByAggregateInput;
    _sum?: Prisma.MessageThreadSumOrderByAggregateInput;
};
export type MessageThreadScalarWhereWithAggregatesInput = {
    AND?: Prisma.MessageThreadScalarWhereWithAggregatesInput | Prisma.MessageThreadScalarWhereWithAggregatesInput[];
    OR?: Prisma.MessageThreadScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MessageThreadScalarWhereWithAggregatesInput | Prisma.MessageThreadScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"MessageThread"> | string;
    senderName?: Prisma.StringWithAggregatesFilter<"MessageThread"> | string;
    avatarUrl?: Prisma.StringWithAggregatesFilter<"MessageThread"> | string;
    previewText?: Prisma.StringWithAggregatesFilter<"MessageThread"> | string;
    timeLabel?: Prisma.StringWithAggregatesFilter<"MessageThread"> | string;
    unreadCount?: Prisma.IntWithAggregatesFilter<"MessageThread"> | number;
    isOnline?: Prisma.BoolWithAggregatesFilter<"MessageThread"> | boolean;
    isPriority?: Prisma.BoolWithAggregatesFilter<"MessageThread"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MessageThread"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"MessageThread"> | Date | string;
};
export type MessageThreadCreateInput = {
    id?: string;
    senderName: string;
    avatarUrl: string;
    previewText: string;
    timeLabel: string;
    unreadCount: number;
    isOnline: boolean;
    isPriority: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MessageThreadUncheckedCreateInput = {
    id?: string;
    senderName: string;
    avatarUrl: string;
    previewText: string;
    timeLabel: string;
    unreadCount: number;
    isOnline: boolean;
    isPriority: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MessageThreadUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderName?: Prisma.StringFieldUpdateOperationsInput | string;
    avatarUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    previewText?: Prisma.StringFieldUpdateOperationsInput | string;
    timeLabel?: Prisma.StringFieldUpdateOperationsInput | string;
    unreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isOnline?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isPriority?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageThreadUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderName?: Prisma.StringFieldUpdateOperationsInput | string;
    avatarUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    previewText?: Prisma.StringFieldUpdateOperationsInput | string;
    timeLabel?: Prisma.StringFieldUpdateOperationsInput | string;
    unreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isOnline?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isPriority?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageThreadCreateManyInput = {
    id?: string;
    senderName: string;
    avatarUrl: string;
    previewText: string;
    timeLabel: string;
    unreadCount: number;
    isOnline: boolean;
    isPriority: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MessageThreadUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderName?: Prisma.StringFieldUpdateOperationsInput | string;
    avatarUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    previewText?: Prisma.StringFieldUpdateOperationsInput | string;
    timeLabel?: Prisma.StringFieldUpdateOperationsInput | string;
    unreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isOnline?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isPriority?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageThreadUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderName?: Prisma.StringFieldUpdateOperationsInput | string;
    avatarUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    previewText?: Prisma.StringFieldUpdateOperationsInput | string;
    timeLabel?: Prisma.StringFieldUpdateOperationsInput | string;
    unreadCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isOnline?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isPriority?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MessageThreadCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    senderName?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    previewText?: Prisma.SortOrder;
    timeLabel?: Prisma.SortOrder;
    unreadCount?: Prisma.SortOrder;
    isOnline?: Prisma.SortOrder;
    isPriority?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MessageThreadAvgOrderByAggregateInput = {
    unreadCount?: Prisma.SortOrder;
};
export type MessageThreadMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    senderName?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    previewText?: Prisma.SortOrder;
    timeLabel?: Prisma.SortOrder;
    unreadCount?: Prisma.SortOrder;
    isOnline?: Prisma.SortOrder;
    isPriority?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MessageThreadMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    senderName?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    previewText?: Prisma.SortOrder;
    timeLabel?: Prisma.SortOrder;
    unreadCount?: Prisma.SortOrder;
    isOnline?: Prisma.SortOrder;
    isPriority?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MessageThreadSumOrderByAggregateInput = {
    unreadCount?: Prisma.SortOrder;
};
export type MessageThreadSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    senderName?: boolean;
    avatarUrl?: boolean;
    previewText?: boolean;
    timeLabel?: boolean;
    unreadCount?: boolean;
    isOnline?: boolean;
    isPriority?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["messageThread"]>;
export type MessageThreadSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    senderName?: boolean;
    avatarUrl?: boolean;
    previewText?: boolean;
    timeLabel?: boolean;
    unreadCount?: boolean;
    isOnline?: boolean;
    isPriority?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["messageThread"]>;
export type MessageThreadSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    senderName?: boolean;
    avatarUrl?: boolean;
    previewText?: boolean;
    timeLabel?: boolean;
    unreadCount?: boolean;
    isOnline?: boolean;
    isPriority?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["messageThread"]>;
export type MessageThreadSelectScalar = {
    id?: boolean;
    senderName?: boolean;
    avatarUrl?: boolean;
    previewText?: boolean;
    timeLabel?: boolean;
    unreadCount?: boolean;
    isOnline?: boolean;
    isPriority?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type MessageThreadOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "senderName" | "avatarUrl" | "previewText" | "timeLabel" | "unreadCount" | "isOnline" | "isPriority" | "createdAt" | "updatedAt", ExtArgs["result"]["messageThread"]>;
export type $MessageThreadPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MessageThread";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        senderName: string;
        avatarUrl: string;
        previewText: string;
        timeLabel: string;
        unreadCount: number;
        isOnline: boolean;
        isPriority: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["messageThread"]>;
    composites: {};
};
export type MessageThreadGetPayload<S extends boolean | null | undefined | MessageThreadDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MessageThreadPayload, S>;
export type MessageThreadCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MessageThreadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MessageThreadCountAggregateInputType | true;
};
export interface MessageThreadDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MessageThread'];
        meta: {
            name: 'MessageThread';
        };
    };
    findUnique<T extends MessageThreadFindUniqueArgs>(args: Prisma.SelectSubset<T, MessageThreadFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MessageThreadClient<runtime.Types.Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MessageThreadFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MessageThreadFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MessageThreadClient<runtime.Types.Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MessageThreadFindFirstArgs>(args?: Prisma.SelectSubset<T, MessageThreadFindFirstArgs<ExtArgs>>): Prisma.Prisma__MessageThreadClient<runtime.Types.Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MessageThreadFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MessageThreadFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MessageThreadClient<runtime.Types.Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MessageThreadFindManyArgs>(args?: Prisma.SelectSubset<T, MessageThreadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MessageThreadCreateArgs>(args: Prisma.SelectSubset<T, MessageThreadCreateArgs<ExtArgs>>): Prisma.Prisma__MessageThreadClient<runtime.Types.Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MessageThreadCreateManyArgs>(args?: Prisma.SelectSubset<T, MessageThreadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MessageThreadCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MessageThreadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MessageThreadDeleteArgs>(args: Prisma.SelectSubset<T, MessageThreadDeleteArgs<ExtArgs>>): Prisma.Prisma__MessageThreadClient<runtime.Types.Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MessageThreadUpdateArgs>(args: Prisma.SelectSubset<T, MessageThreadUpdateArgs<ExtArgs>>): Prisma.Prisma__MessageThreadClient<runtime.Types.Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MessageThreadDeleteManyArgs>(args?: Prisma.SelectSubset<T, MessageThreadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MessageThreadUpdateManyArgs>(args: Prisma.SelectSubset<T, MessageThreadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MessageThreadUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MessageThreadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MessageThreadUpsertArgs>(args: Prisma.SelectSubset<T, MessageThreadUpsertArgs<ExtArgs>>): Prisma.Prisma__MessageThreadClient<runtime.Types.Result.GetResult<Prisma.$MessageThreadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MessageThreadCountArgs>(args?: Prisma.Subset<T, MessageThreadCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MessageThreadCountAggregateOutputType> : number>;
    aggregate<T extends MessageThreadAggregateArgs>(args: Prisma.Subset<T, MessageThreadAggregateArgs>): Prisma.PrismaPromise<GetMessageThreadAggregateType<T>>;
    groupBy<T extends MessageThreadGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MessageThreadGroupByArgs['orderBy'];
    } : {
        orderBy?: MessageThreadGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MessageThreadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageThreadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MessageThreadFieldRefs;
}
export interface Prisma__MessageThreadClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MessageThreadFieldRefs {
    readonly id: Prisma.FieldRef<"MessageThread", 'String'>;
    readonly senderName: Prisma.FieldRef<"MessageThread", 'String'>;
    readonly avatarUrl: Prisma.FieldRef<"MessageThread", 'String'>;
    readonly previewText: Prisma.FieldRef<"MessageThread", 'String'>;
    readonly timeLabel: Prisma.FieldRef<"MessageThread", 'String'>;
    readonly unreadCount: Prisma.FieldRef<"MessageThread", 'Int'>;
    readonly isOnline: Prisma.FieldRef<"MessageThread", 'Boolean'>;
    readonly isPriority: Prisma.FieldRef<"MessageThread", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"MessageThread", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"MessageThread", 'DateTime'>;
}
export type MessageThreadFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageThreadSelect<ExtArgs> | null;
    omit?: Prisma.MessageThreadOmit<ExtArgs> | null;
    where: Prisma.MessageThreadWhereUniqueInput;
};
export type MessageThreadFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageThreadSelect<ExtArgs> | null;
    omit?: Prisma.MessageThreadOmit<ExtArgs> | null;
    where: Prisma.MessageThreadWhereUniqueInput;
};
export type MessageThreadFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageThreadSelect<ExtArgs> | null;
    omit?: Prisma.MessageThreadOmit<ExtArgs> | null;
    where?: Prisma.MessageThreadWhereInput;
    orderBy?: Prisma.MessageThreadOrderByWithRelationInput | Prisma.MessageThreadOrderByWithRelationInput[];
    cursor?: Prisma.MessageThreadWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageThreadScalarFieldEnum | Prisma.MessageThreadScalarFieldEnum[];
};
export type MessageThreadFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageThreadSelect<ExtArgs> | null;
    omit?: Prisma.MessageThreadOmit<ExtArgs> | null;
    where?: Prisma.MessageThreadWhereInput;
    orderBy?: Prisma.MessageThreadOrderByWithRelationInput | Prisma.MessageThreadOrderByWithRelationInput[];
    cursor?: Prisma.MessageThreadWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageThreadScalarFieldEnum | Prisma.MessageThreadScalarFieldEnum[];
};
export type MessageThreadFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageThreadSelect<ExtArgs> | null;
    omit?: Prisma.MessageThreadOmit<ExtArgs> | null;
    where?: Prisma.MessageThreadWhereInput;
    orderBy?: Prisma.MessageThreadOrderByWithRelationInput | Prisma.MessageThreadOrderByWithRelationInput[];
    cursor?: Prisma.MessageThreadWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageThreadScalarFieldEnum | Prisma.MessageThreadScalarFieldEnum[];
};
export type MessageThreadCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageThreadSelect<ExtArgs> | null;
    omit?: Prisma.MessageThreadOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MessageThreadCreateInput, Prisma.MessageThreadUncheckedCreateInput>;
};
export type MessageThreadCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MessageThreadCreateManyInput | Prisma.MessageThreadCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MessageThreadCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageThreadSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MessageThreadOmit<ExtArgs> | null;
    data: Prisma.MessageThreadCreateManyInput | Prisma.MessageThreadCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MessageThreadUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageThreadSelect<ExtArgs> | null;
    omit?: Prisma.MessageThreadOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MessageThreadUpdateInput, Prisma.MessageThreadUncheckedUpdateInput>;
    where: Prisma.MessageThreadWhereUniqueInput;
};
export type MessageThreadUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MessageThreadUpdateManyMutationInput, Prisma.MessageThreadUncheckedUpdateManyInput>;
    where?: Prisma.MessageThreadWhereInput;
    limit?: number;
};
export type MessageThreadUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageThreadSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MessageThreadOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MessageThreadUpdateManyMutationInput, Prisma.MessageThreadUncheckedUpdateManyInput>;
    where?: Prisma.MessageThreadWhereInput;
    limit?: number;
};
export type MessageThreadUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageThreadSelect<ExtArgs> | null;
    omit?: Prisma.MessageThreadOmit<ExtArgs> | null;
    where: Prisma.MessageThreadWhereUniqueInput;
    create: Prisma.XOR<Prisma.MessageThreadCreateInput, Prisma.MessageThreadUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MessageThreadUpdateInput, Prisma.MessageThreadUncheckedUpdateInput>;
};
export type MessageThreadDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageThreadSelect<ExtArgs> | null;
    omit?: Prisma.MessageThreadOmit<ExtArgs> | null;
    where: Prisma.MessageThreadWhereUniqueInput;
};
export type MessageThreadDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageThreadWhereInput;
    limit?: number;
};
export type MessageThreadDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageThreadSelect<ExtArgs> | null;
    omit?: Prisma.MessageThreadOmit<ExtArgs> | null;
};
export {};
