import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
  deleteTodo: Todo;
  toggleDone: Todo;
  updateTodo: Todo;
};


export type MutationCreateTodoArgs = {
  input: NewTodo;
};


export type MutationDeleteTodoArgs = {
  id: Scalars['ID'];
};


export type MutationToggleDoneArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateTodoArgs = {
  id: Scalars['ID'];
  input: UpdateTodo;
};

export type NewTodo = {
  description: Scalars['String'];
  todo: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  todo: Todo;
  todos: Array<Todo>;
};


export type QueryTodoArgs = {
  id: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  todoAdded?: Maybe<Todo>;
  todoDeleted?: Maybe<Todo>;
  todoUpdated?: Maybe<Todo>;
};


export type SubscriptionTodoDeletedArgs = {
  id: Scalars['ID'];
};


export type SubscriptionTodoUpdatedArgs = {
  id: Scalars['ID'];
};

export type Todo = {
  __typename?: 'Todo';
  _id: Scalars['ID'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  done: Scalars['Boolean'];
  todo: Scalars['String'];
};

export type UpdateTodo = {
  description?: InputMaybe<Scalars['String']>;
  todo?: InputMaybe<Scalars['String']>;
};

export type TodoFragFragment = { __typename: 'Todo', _id: string, todo: string, description: string, done: boolean, createdAt: string };

export type TodosQueryVariables = Exact<{ [key: string]: never; }>;


export type TodosQuery = { __typename?: 'Query', todos: Array<{ __typename: 'Todo', _id: string, todo: string, description: string, done: boolean, createdAt: string }> };

export type CreateTodoMutationVariables = Exact<{
  todo: Scalars['String'];
  desc: Scalars['String'];
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTodo: { __typename: 'Todo', _id: string } };

export type UpdateTodoMutationVariables = Exact<{
  id: Scalars['ID'];
  todo?: InputMaybe<Scalars['String']>;
  desc?: InputMaybe<Scalars['String']>;
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo: { __typename: 'Todo', _id: string } };

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo: { __typename: 'Todo', _id: string } };

export type TodoAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TodoAddedSubscription = { __typename?: 'Subscription', todoAdded?: { __typename: 'Todo', _id: string, todo: string, description: string, done: boolean, createdAt: string } | null };

export type TodoUpdatedSubscriptionVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TodoUpdatedSubscription = { __typename?: 'Subscription', todoUpdated?: { __typename: 'Todo', _id: string, todo: string, description: string, done: boolean, createdAt: string } | null };

export type TodoDeletedSubscriptionVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TodoDeletedSubscription = { __typename?: 'Subscription', todoDeleted?: { __typename: 'Todo', _id: string, todo: string, description: string, done: boolean, createdAt: string } | null };

export const TodoFragFragmentDoc = gql`
    fragment TodoFrag on Todo {
  __typename
  _id
  todo
  description
  done
  createdAt
}
    `;
export const TodosDocument = gql`
    query Todos {
  todos {
    ...TodoFrag
  }
}
    ${TodoFragFragmentDoc}`;

export function useTodosQuery(options?: Omit<Urql.UseQueryArgs<TodosQueryVariables>, 'query'>) {
  return Urql.useQuery<TodosQuery>({ query: TodosDocument, ...options });
};
export const CreateTodoDocument = gql`
    mutation CreateTodo($todo: String!, $desc: String!) {
  createTodo(input: {todo: $todo, description: $desc}) {
    __typename
    _id
  }
}
    `;

export function useCreateTodoMutation() {
  return Urql.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument);
};
export const UpdateTodoDocument = gql`
    mutation UpdateTodo($id: ID!, $todo: String, $desc: String) {
  updateTodo(id: $id, input: {todo: $todo, description: $desc}) {
    __typename
    _id
  }
}
    `;

export function useUpdateTodoMutation() {
  return Urql.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument);
};
export const DeleteTodoDocument = gql`
    mutation DeleteTodo($id: ID!) {
  deleteTodo(id: $id) {
    __typename
    _id
  }
}
    `;

export function useDeleteTodoMutation() {
  return Urql.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument);
};
export const TodoAddedDocument = gql`
    subscription TodoAdded {
  todoAdded {
    ...TodoFrag
  }
}
    ${TodoFragFragmentDoc}`;

export function useTodoAddedSubscription<TData = TodoAddedSubscription>(options: Omit<Urql.UseSubscriptionArgs<TodoAddedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<TodoAddedSubscription, TData>) {
  return Urql.useSubscription<TodoAddedSubscription, TData, TodoAddedSubscriptionVariables>({ query: TodoAddedDocument, ...options }, handler);
};
export const TodoUpdatedDocument = gql`
    subscription TodoUpdated($id: ID!) {
  todoUpdated(id: $id) {
    ...TodoFrag
  }
}
    ${TodoFragFragmentDoc}`;

export function useTodoUpdatedSubscription<TData = TodoUpdatedSubscription>(options: Omit<Urql.UseSubscriptionArgs<TodoUpdatedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<TodoUpdatedSubscription, TData>) {
  return Urql.useSubscription<TodoUpdatedSubscription, TData, TodoUpdatedSubscriptionVariables>({ query: TodoUpdatedDocument, ...options }, handler);
};
export const TodoDeletedDocument = gql`
    subscription TodoDeleted($id: ID!) {
  todoDeleted(id: $id) {
    ...TodoFrag
  }
}
    ${TodoFragFragmentDoc}`;

export function useTodoDeletedSubscription<TData = TodoDeletedSubscription>(options: Omit<Urql.UseSubscriptionArgs<TodoDeletedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<TodoDeletedSubscription, TData>) {
  return Urql.useSubscription<TodoDeletedSubscription, TData, TodoDeletedSubscriptionVariables>({ query: TodoDeletedDocument, ...options }, handler);
};