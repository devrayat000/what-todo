import type {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
import type { MercuriusContext } from 'mercurius'
export type Maybe<T> = T | null
export type InputMaybe<T> = T | undefined
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) =>
  | Promise<import('mercurius-codegen').DeepPartial<TResult>>
  | import('mercurius-codegen').DeepPartial<TResult>
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} & { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: Date
  _FieldSet: any
}

export interface Todo {
  __typename?: 'Todo'
  _id: Scalars['ID']
  todo: Scalars['String']
  description: Scalars['String']
  done: Scalars['Boolean']
  createdAt: Scalars['Date']
}

export interface Query {
  __typename?: 'Query'
  todos: Array<Todo>
  todo: Todo
}

export interface QuerytodoArgs {
  id: Scalars['ID']
}

export interface Mutation {
  __typename?: 'Mutation'
  createTodo: Todo
  updateTodo: Todo
  toggleDone: Todo
  deleteTodo: Todo
}

export interface MutationcreateTodoArgs {
  todo: Scalars['String']
  description: Scalars['String']
}

export interface MutationupdateTodoArgs {
  id: Scalars['ID']
  todo?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
}

export interface MutationtoggleDoneArgs {
  id: Scalars['ID']
}

export interface MutationdeleteTodoArgs {
  id: Scalars['ID']
}

export interface Subscription {
  __typename?: 'Subscription'
  todoAdded: Todo
  todoUpdated: Todo
  todoDeleted: Todo
}

export type ResolverTypeWrapper<T> =
  | Promise<T>
  | T
  | (() => Promise<T>)
  | (() => T)

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Date: ResolverTypeWrapper<Scalars['Date']>
  Todo: ResolverTypeWrapper<Todo>
  ID: ResolverTypeWrapper<Scalars['ID']>
  String: ResolverTypeWrapper<Scalars['String']>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Query: ResolverTypeWrapper<{}>
  Mutation: ResolverTypeWrapper<{}>
  Subscription: ResolverTypeWrapper<{}>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Date: Scalars['Date']
  Todo: Todo
  ID: Scalars['ID']
  String: Scalars['String']
  Boolean: Scalars['Boolean']
  Query: {}
  Mutation: {}
  Subscription: {}
}

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type TodoResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']
> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  todo?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  done?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  todos?: Resolver<Array<ResolversTypes['Todo']>, ParentType, ContextType>
  todo?: Resolver<
    ResolversTypes['Todo'],
    ParentType,
    ContextType,
    RequireFields<QuerytodoArgs, 'id'>
  >
}

export type MutationResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createTodo?: Resolver<
    ResolversTypes['Todo'],
    ParentType,
    ContextType,
    RequireFields<MutationcreateTodoArgs, 'todo' | 'description'>
  >
  updateTodo?: Resolver<
    ResolversTypes['Todo'],
    ParentType,
    ContextType,
    RequireFields<MutationupdateTodoArgs, 'id'>
  >
  toggleDone?: Resolver<
    ResolversTypes['Todo'],
    ParentType,
    ContextType,
    RequireFields<MutationtoggleDoneArgs, 'id'>
  >
  deleteTodo?: Resolver<
    ResolversTypes['Todo'],
    ParentType,
    ContextType,
    RequireFields<MutationdeleteTodoArgs, 'id'>
  >
}

export type SubscriptionResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  todoAdded?: SubscriptionResolver<
    ResolversTypes['Todo'],
    'todoAdded',
    ParentType,
    ContextType
  >
  todoUpdated?: SubscriptionResolver<
    ResolversTypes['Todo'],
    'todoUpdated',
    ParentType,
    ContextType
  >
  todoDeleted?: SubscriptionResolver<
    ResolversTypes['Todo'],
    'todoDeleted',
    ParentType,
    ContextType
  >
}

export type Resolvers<ContextType = MercuriusContext> = {
  Date?: GraphQLScalarType
  Todo?: TodoResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
}

type Loader<TReturn, TObj, TParams, TContext> = (
  queries: Array<{
    obj: TObj
    params: TParams
  }>,
  context: TContext & {
    reply: import('fastify').FastifyReply
  }
) => Promise<Array<import('mercurius-codegen').DeepPartial<TReturn>>>
type LoaderResolver<TReturn, TObj, TParams, TContext> =
  | Loader<TReturn, TObj, TParams, TContext>
  | {
      loader: Loader<TReturn, TObj, TParams, TContext>
      opts?: {
        cache?: boolean
      }
    }
export interface Loaders<
  TContext = import('mercurius').MercuriusContext & {
    reply: import('fastify').FastifyReply
  }
> {
  Todo?: {
    _id?: LoaderResolver<Scalars['ID'], Todo, {}, TContext>
    todo?: LoaderResolver<Scalars['String'], Todo, {}, TContext>
    description?: LoaderResolver<Scalars['String'], Todo, {}, TContext>
    done?: LoaderResolver<Scalars['Boolean'], Todo, {}, TContext>
    createdAt?: LoaderResolver<Scalars['Date'], Todo, {}, TContext>
  }
}
declare module 'mercurius' {
  interface IResolvers
    extends Resolvers<import('mercurius').MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
