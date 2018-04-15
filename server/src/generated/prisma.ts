import { Prisma as BasePrisma, BasePrismaOptions } from 'prisma-binding'
import { GraphQLResolveInfo } from 'graphql'

export const typeDefs = `
type Board implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  owner(where: UserWhereInput): User!
  columns(where: ColumnWhereInput, orderBy: ColumnOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Column!]
}

type Column implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  board(where: BoardWhereInput): Board!
  query: String!
  index: Int!
}

type User implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  githubUserId: String!
  name: String
  login: String!
  avatarUrl: String!
  boards(where: BoardWhereInput, orderBy: BoardOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Board!]
}

type AggregateBoard {
  count: Int!
}

type AggregateColumn {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  """
  The number of nodes that have been affected by the Batch operation.
  """
  count: Long!
}

"""
A connection to a list of items.
"""
type BoardConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [BoardEdge]!
  aggregate: AggregateBoard!
}

input BoardCreateInput {
  name: String!
  owner: UserCreateOneWithoutBoardsInput!
  columns: ColumnCreateManyWithoutBoardInput
}

input BoardCreateManyWithoutOwnerInput {
  create: [BoardCreateWithoutOwnerInput!]
  connect: [BoardWhereUniqueInput!]
}

input BoardCreateOneWithoutColumnsInput {
  create: BoardCreateWithoutColumnsInput
  connect: BoardWhereUniqueInput
}

input BoardCreateWithoutColumnsInput {
  name: String!
  owner: UserCreateOneWithoutBoardsInput!
}

input BoardCreateWithoutOwnerInput {
  name: String!
  columns: ColumnCreateManyWithoutBoardInput
}

"""
An edge in a connection.
"""
type BoardEdge {
  """
  The item at the end of the edge.
  """
  node: Board!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum BoardOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
}

type BoardPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
}

type BoardSubscriptionPayload {
  mutation: MutationType!
  node: Board
  updatedFields: [String!]
  previousValues: BoardPreviousValues
}

input BoardSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [BoardSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [BoardSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: BoardWhereInput
}

input BoardUpdateInput {
  name: String
  owner: UserUpdateOneWithoutBoardsInput
  columns: ColumnUpdateManyWithoutBoardInput
}

input BoardUpdateManyWithoutOwnerInput {
  create: [BoardCreateWithoutOwnerInput!]
  connect: [BoardWhereUniqueInput!]
  disconnect: [BoardWhereUniqueInput!]
  delete: [BoardWhereUniqueInput!]
  update: [BoardUpdateWithWhereUniqueWithoutOwnerInput!]
  upsert: [BoardUpsertWithWhereUniqueWithoutOwnerInput!]
}

input BoardUpdateOneWithoutColumnsInput {
  create: BoardCreateWithoutColumnsInput
  connect: BoardWhereUniqueInput
  delete: Boolean
  update: BoardUpdateWithoutColumnsDataInput
  upsert: BoardUpsertWithoutColumnsInput
}

input BoardUpdateWithoutColumnsDataInput {
  name: String
  owner: UserUpdateOneWithoutBoardsInput
}

input BoardUpdateWithoutOwnerDataInput {
  name: String
  columns: ColumnUpdateManyWithoutBoardInput
}

input BoardUpdateWithWhereUniqueWithoutOwnerInput {
  where: BoardWhereUniqueInput!
  data: BoardUpdateWithoutOwnerDataInput!
}

input BoardUpsertWithoutColumnsInput {
  update: BoardUpdateWithoutColumnsDataInput!
  create: BoardCreateWithoutColumnsInput!
}

input BoardUpsertWithWhereUniqueWithoutOwnerInput {
  where: BoardWhereUniqueInput!
  update: BoardUpdateWithoutOwnerDataInput!
  create: BoardCreateWithoutOwnerInput!
}

input BoardWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [BoardWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [BoardWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  owner: UserWhereInput
  columns_every: ColumnWhereInput
  columns_some: ColumnWhereInput
  columns_none: ColumnWhereInput
}

input BoardWhereUniqueInput {
  id: ID
}

"""
A connection to a list of items.
"""
type ColumnConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [ColumnEdge]!
  aggregate: AggregateColumn!
}

input ColumnCreateInput {
  name: String!
  query: String!
  index: Int!
  board: BoardCreateOneWithoutColumnsInput!
}

input ColumnCreateManyWithoutBoardInput {
  create: [ColumnCreateWithoutBoardInput!]
  connect: [ColumnWhereUniqueInput!]
}

input ColumnCreateWithoutBoardInput {
  name: String!
  query: String!
  index: Int!
}

"""
An edge in a connection.
"""
type ColumnEdge {
  """
  The item at the end of the edge.
  """
  node: Column!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum ColumnOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
  query_ASC
  query_DESC
  index_ASC
  index_DESC
}

type ColumnPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  query: String!
  index: Int!
}

type ColumnSubscriptionPayload {
  mutation: MutationType!
  node: Column
  updatedFields: [String!]
  previousValues: ColumnPreviousValues
}

input ColumnSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ColumnSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ColumnSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ColumnWhereInput
}

input ColumnUpdateInput {
  name: String
  query: String
  index: Int
  board: BoardUpdateOneWithoutColumnsInput
}

input ColumnUpdateManyWithoutBoardInput {
  create: [ColumnCreateWithoutBoardInput!]
  connect: [ColumnWhereUniqueInput!]
  disconnect: [ColumnWhereUniqueInput!]
  delete: [ColumnWhereUniqueInput!]
  update: [ColumnUpdateWithWhereUniqueWithoutBoardInput!]
  upsert: [ColumnUpsertWithWhereUniqueWithoutBoardInput!]
}

input ColumnUpdateWithoutBoardDataInput {
  name: String
  query: String
  index: Int
}

input ColumnUpdateWithWhereUniqueWithoutBoardInput {
  where: ColumnWhereUniqueInput!
  data: ColumnUpdateWithoutBoardDataInput!
}

input ColumnUpsertWithWhereUniqueWithoutBoardInput {
  where: ColumnWhereUniqueInput!
  update: ColumnUpdateWithoutBoardDataInput!
  create: ColumnCreateWithoutBoardInput!
}

input ColumnWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ColumnWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ColumnWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  query: String
  """
  All values that are not equal to given value.
  """
  query_not: String
  """
  All values that are contained in given list.
  """
  query_in: [String!]
  """
  All values that are not contained in given list.
  """
  query_not_in: [String!]
  """
  All values less than the given value.
  """
  query_lt: String
  """
  All values less than or equal the given value.
  """
  query_lte: String
  """
  All values greater than the given value.
  """
  query_gt: String
  """
  All values greater than or equal the given value.
  """
  query_gte: String
  """
  All values containing the given string.
  """
  query_contains: String
  """
  All values not containing the given string.
  """
  query_not_contains: String
  """
  All values starting with the given string.
  """
  query_starts_with: String
  """
  All values not starting with the given string.
  """
  query_not_starts_with: String
  """
  All values ending with the given string.
  """
  query_ends_with: String
  """
  All values not ending with the given string.
  """
  query_not_ends_with: String
  index: Int
  """
  All values that are not equal to given value.
  """
  index_not: Int
  """
  All values that are contained in given list.
  """
  index_in: [Int!]
  """
  All values that are not contained in given list.
  """
  index_not_in: [Int!]
  """
  All values less than the given value.
  """
  index_lt: Int
  """
  All values less than or equal the given value.
  """
  index_lte: Int
  """
  All values greater than the given value.
  """
  index_gt: Int
  """
  All values greater than or equal the given value.
  """
  index_gte: Int
  board: BoardWhereInput
}

input ColumnWhereUniqueInput {
  id: ID
}

scalar DateTime

"""
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""
An object with an ID
"""
interface Node {
  """
  The id of the object.
  """
  id: ID!
}

"""
Information about pagination in a connection.
"""
type PageInfo {
  """
  When paginating forwards, are there more items?
  """
  hasNextPage: Boolean!
  """
  When paginating backwards, are there more items?
  """
  hasPreviousPage: Boolean!
  """
  When paginating backwards, the cursor to continue.
  """
  startCursor: String
  """
  When paginating forwards, the cursor to continue.
  """
  endCursor: String
}

"""
A connection to a list of items.
"""
type UserConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  githubUserId: String!
  name: String
  login: String!
  avatarUrl: String!
  boards: BoardCreateManyWithoutOwnerInput
}

input UserCreateOneWithoutBoardsInput {
  create: UserCreateWithoutBoardsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutBoardsInput {
  githubUserId: String!
  name: String
  login: String!
  avatarUrl: String!
}

"""
An edge in a connection.
"""
type UserEdge {
  """
  The item at the end of the edge.
  """
  node: User!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  githubUserId_ASC
  githubUserId_DESC
  name_ASC
  name_DESC
  login_ASC
  login_DESC
  avatarUrl_ASC
  avatarUrl_DESC
}

type UserPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  githubUserId: String!
  name: String
  login: String!
  avatarUrl: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [UserSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateInput {
  githubUserId: String
  name: String
  login: String
  avatarUrl: String
  boards: BoardUpdateManyWithoutOwnerInput
}

input UserUpdateOneWithoutBoardsInput {
  create: UserCreateWithoutBoardsInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutBoardsDataInput
  upsert: UserUpsertWithoutBoardsInput
}

input UserUpdateWithoutBoardsDataInput {
  githubUserId: String
  name: String
  login: String
  avatarUrl: String
}

input UserUpsertWithoutBoardsInput {
  update: UserUpdateWithoutBoardsDataInput!
  create: UserCreateWithoutBoardsInput!
}

input UserWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [UserWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  githubUserId: String
  """
  All values that are not equal to given value.
  """
  githubUserId_not: String
  """
  All values that are contained in given list.
  """
  githubUserId_in: [String!]
  """
  All values that are not contained in given list.
  """
  githubUserId_not_in: [String!]
  """
  All values less than the given value.
  """
  githubUserId_lt: String
  """
  All values less than or equal the given value.
  """
  githubUserId_lte: String
  """
  All values greater than the given value.
  """
  githubUserId_gt: String
  """
  All values greater than or equal the given value.
  """
  githubUserId_gte: String
  """
  All values containing the given string.
  """
  githubUserId_contains: String
  """
  All values not containing the given string.
  """
  githubUserId_not_contains: String
  """
  All values starting with the given string.
  """
  githubUserId_starts_with: String
  """
  All values not starting with the given string.
  """
  githubUserId_not_starts_with: String
  """
  All values ending with the given string.
  """
  githubUserId_ends_with: String
  """
  All values not ending with the given string.
  """
  githubUserId_not_ends_with: String
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  login: String
  """
  All values that are not equal to given value.
  """
  login_not: String
  """
  All values that are contained in given list.
  """
  login_in: [String!]
  """
  All values that are not contained in given list.
  """
  login_not_in: [String!]
  """
  All values less than the given value.
  """
  login_lt: String
  """
  All values less than or equal the given value.
  """
  login_lte: String
  """
  All values greater than the given value.
  """
  login_gt: String
  """
  All values greater than or equal the given value.
  """
  login_gte: String
  """
  All values containing the given string.
  """
  login_contains: String
  """
  All values not containing the given string.
  """
  login_not_contains: String
  """
  All values starting with the given string.
  """
  login_starts_with: String
  """
  All values not starting with the given string.
  """
  login_not_starts_with: String
  """
  All values ending with the given string.
  """
  login_ends_with: String
  """
  All values not ending with the given string.
  """
  login_not_ends_with: String
  avatarUrl: String
  """
  All values that are not equal to given value.
  """
  avatarUrl_not: String
  """
  All values that are contained in given list.
  """
  avatarUrl_in: [String!]
  """
  All values that are not contained in given list.
  """
  avatarUrl_not_in: [String!]
  """
  All values less than the given value.
  """
  avatarUrl_lt: String
  """
  All values less than or equal the given value.
  """
  avatarUrl_lte: String
  """
  All values greater than the given value.
  """
  avatarUrl_gt: String
  """
  All values greater than or equal the given value.
  """
  avatarUrl_gte: String
  """
  All values containing the given string.
  """
  avatarUrl_contains: String
  """
  All values not containing the given string.
  """
  avatarUrl_not_contains: String
  """
  All values starting with the given string.
  """
  avatarUrl_starts_with: String
  """
  All values not starting with the given string.
  """
  avatarUrl_not_starts_with: String
  """
  All values ending with the given string.
  """
  avatarUrl_ends_with: String
  """
  All values not ending with the given string.
  """
  avatarUrl_not_ends_with: String
  boards_every: BoardWhereInput
  boards_some: BoardWhereInput
  boards_none: BoardWhereInput
}

input UserWhereUniqueInput {
  id: ID
  githubUserId: String
  login: String
}

type Mutation {
  createUser(data: UserCreateInput!): User!
  createBoard(data: BoardCreateInput!): Board!
  createColumn(data: ColumnCreateInput!): Column!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateBoard(data: BoardUpdateInput!, where: BoardWhereUniqueInput!): Board
  updateColumn(data: ColumnUpdateInput!, where: ColumnWhereUniqueInput!): Column
  deleteUser(where: UserWhereUniqueInput!): User
  deleteBoard(where: BoardWhereUniqueInput!): Board
  deleteColumn(where: ColumnWhereUniqueInput!): Column
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertBoard(where: BoardWhereUniqueInput!, create: BoardCreateInput!, update: BoardUpdateInput!): Board!
  upsertColumn(where: ColumnWhereUniqueInput!, create: ColumnCreateInput!, update: ColumnUpdateInput!): Column!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyBoards(data: BoardUpdateInput!, where: BoardWhereInput): BatchPayload!
  updateManyColumns(data: ColumnUpdateInput!, where: ColumnWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyBoards(where: BoardWhereInput): BatchPayload!
  deleteManyColumns(where: ColumnWhereInput): BatchPayload!
}

type Query {
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  boards(where: BoardWhereInput, orderBy: BoardOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Board]!
  columns(where: ColumnWhereInput, orderBy: ColumnOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Column]!
  user(where: UserWhereUniqueInput!): User
  board(where: BoardWhereUniqueInput!): Board
  column(where: ColumnWhereUniqueInput!): Column
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  boardsConnection(where: BoardWhereInput, orderBy: BoardOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BoardConnection!
  columnsConnection(where: ColumnWhereInput, orderBy: ColumnOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ColumnConnection!
  """
  Fetches an object given its ID
  """
  node("""
  The ID of an object
  """
  id: ID!): Node
}

type Subscription {
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  board(where: BoardSubscriptionWhereInput): BoardSubscriptionPayload
  column(where: ColumnSubscriptionWhereInput): ColumnSubscriptionPayload
}
`

export type UserOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'githubUserId_ASC' |
  'githubUserId_DESC' |
  'name_ASC' |
  'name_DESC' |
  'login_ASC' |
  'login_DESC' |
  'avatarUrl_ASC' |
  'avatarUrl_DESC'

export type BoardOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'name_ASC' |
  'name_DESC'

export type ColumnOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'name_ASC' |
  'name_DESC' |
  'query_ASC' |
  'query_DESC' |
  'index_ASC' |
  'index_DESC'

export type MutationType = 
  'CREATED' |
  'UPDATED' |
  'DELETED'

export interface UserCreateOneWithoutBoardsInput {
  create?: UserCreateWithoutBoardsInput
  connect?: UserWhereUniqueInput
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  githubUserId?: String
  githubUserId_not?: String
  githubUserId_in?: String[] | String
  githubUserId_not_in?: String[] | String
  githubUserId_lt?: String
  githubUserId_lte?: String
  githubUserId_gt?: String
  githubUserId_gte?: String
  githubUserId_contains?: String
  githubUserId_not_contains?: String
  githubUserId_starts_with?: String
  githubUserId_not_starts_with?: String
  githubUserId_ends_with?: String
  githubUserId_not_ends_with?: String
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  login?: String
  login_not?: String
  login_in?: String[] | String
  login_not_in?: String[] | String
  login_lt?: String
  login_lte?: String
  login_gt?: String
  login_gte?: String
  login_contains?: String
  login_not_contains?: String
  login_starts_with?: String
  login_not_starts_with?: String
  login_ends_with?: String
  login_not_ends_with?: String
  avatarUrl?: String
  avatarUrl_not?: String
  avatarUrl_in?: String[] | String
  avatarUrl_not_in?: String[] | String
  avatarUrl_lt?: String
  avatarUrl_lte?: String
  avatarUrl_gt?: String
  avatarUrl_gte?: String
  avatarUrl_contains?: String
  avatarUrl_not_contains?: String
  avatarUrl_starts_with?: String
  avatarUrl_not_starts_with?: String
  avatarUrl_ends_with?: String
  avatarUrl_not_ends_with?: String
  boards_every?: BoardWhereInput
  boards_some?: BoardWhereInput
  boards_none?: BoardWhereInput
}

export interface ColumnUpsertWithWhereUniqueWithoutBoardInput {
  where: ColumnWhereUniqueInput
  update: ColumnUpdateWithoutBoardDataInput
  create: ColumnCreateWithoutBoardInput
}

export interface BoardUpdateWithoutOwnerDataInput {
  name?: String
  columns?: ColumnUpdateManyWithoutBoardInput
}

export interface ColumnUpdateWithoutBoardDataInput {
  name?: String
  query?: String
  index?: Int
}

export interface BoardCreateOneWithoutColumnsInput {
  create?: BoardCreateWithoutColumnsInput
  connect?: BoardWhereUniqueInput
}

export interface ColumnUpdateWithWhereUniqueWithoutBoardInput {
  where: ColumnWhereUniqueInput
  data: ColumnUpdateWithoutBoardDataInput
}

export interface BoardSubscriptionWhereInput {
  AND?: BoardSubscriptionWhereInput[] | BoardSubscriptionWhereInput
  OR?: BoardSubscriptionWhereInput[] | BoardSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: BoardWhereInput
}

export interface UserCreateInput {
  githubUserId: String
  name?: String
  login: String
  avatarUrl: String
  boards?: BoardCreateManyWithoutOwnerInput
}

export interface BoardUpsertWithoutColumnsInput {
  update: BoardUpdateWithoutColumnsDataInput
  create: BoardCreateWithoutColumnsInput
}

export interface BoardCreateManyWithoutOwnerInput {
  create?: BoardCreateWithoutOwnerInput[] | BoardCreateWithoutOwnerInput
  connect?: BoardWhereUniqueInput[] | BoardWhereUniqueInput
}

export interface BoardWhereUniqueInput {
  id?: ID_Input
}

export interface BoardCreateWithoutOwnerInput {
  name: String
  columns?: ColumnCreateManyWithoutBoardInput
}

export interface BoardUpdateWithoutColumnsDataInput {
  name?: String
  owner?: UserUpdateOneWithoutBoardsInput
}

export interface ColumnCreateManyWithoutBoardInput {
  create?: ColumnCreateWithoutBoardInput[] | ColumnCreateWithoutBoardInput
  connect?: ColumnWhereUniqueInput[] | ColumnWhereUniqueInput
}

export interface ColumnUpdateInput {
  name?: String
  query?: String
  index?: Int
  board?: BoardUpdateOneWithoutColumnsInput
}

export interface ColumnCreateWithoutBoardInput {
  name: String
  query: String
  index: Int
}

export interface UserUpdateWithoutBoardsDataInput {
  githubUserId?: String
  name?: String
  login?: String
  avatarUrl?: String
}

export interface BoardCreateInput {
  name: String
  owner: UserCreateOneWithoutBoardsInput
  columns?: ColumnCreateManyWithoutBoardInput
}

export interface BoardUpdateInput {
  name?: String
  owner?: UserUpdateOneWithoutBoardsInput
  columns?: ColumnUpdateManyWithoutBoardInput
}

export interface ColumnUpdateManyWithoutBoardInput {
  create?: ColumnCreateWithoutBoardInput[] | ColumnCreateWithoutBoardInput
  connect?: ColumnWhereUniqueInput[] | ColumnWhereUniqueInput
  disconnect?: ColumnWhereUniqueInput[] | ColumnWhereUniqueInput
  delete?: ColumnWhereUniqueInput[] | ColumnWhereUniqueInput
  update?: ColumnUpdateWithWhereUniqueWithoutBoardInput[] | ColumnUpdateWithWhereUniqueWithoutBoardInput
  upsert?: ColumnUpsertWithWhereUniqueWithoutBoardInput[] | ColumnUpsertWithWhereUniqueWithoutBoardInput
}

export interface ColumnSubscriptionWhereInput {
  AND?: ColumnSubscriptionWhereInput[] | ColumnSubscriptionWhereInput
  OR?: ColumnSubscriptionWhereInput[] | ColumnSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ColumnWhereInput
}

export interface UserCreateWithoutBoardsInput {
  githubUserId: String
  name?: String
  login: String
  avatarUrl: String
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface ColumnCreateInput {
  name: String
  query: String
  index: Int
  board: BoardCreateOneWithoutColumnsInput
}

export interface ColumnWhereUniqueInput {
  id?: ID_Input
}

export interface ColumnWhereInput {
  AND?: ColumnWhereInput[] | ColumnWhereInput
  OR?: ColumnWhereInput[] | ColumnWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  query?: String
  query_not?: String
  query_in?: String[] | String
  query_not_in?: String[] | String
  query_lt?: String
  query_lte?: String
  query_gt?: String
  query_gte?: String
  query_contains?: String
  query_not_contains?: String
  query_starts_with?: String
  query_not_starts_with?: String
  query_ends_with?: String
  query_not_ends_with?: String
  index?: Int
  index_not?: Int
  index_in?: Int[] | Int
  index_not_in?: Int[] | Int
  index_lt?: Int
  index_lte?: Int
  index_gt?: Int
  index_gte?: Int
  board?: BoardWhereInput
}

export interface UserUpsertWithoutBoardsInput {
  update: UserUpdateWithoutBoardsDataInput
  create: UserCreateWithoutBoardsInput
}

export interface BoardUpdateWithWhereUniqueWithoutOwnerInput {
  where: BoardWhereUniqueInput
  data: BoardUpdateWithoutOwnerDataInput
}

export interface BoardUpdateManyWithoutOwnerInput {
  create?: BoardCreateWithoutOwnerInput[] | BoardCreateWithoutOwnerInput
  connect?: BoardWhereUniqueInput[] | BoardWhereUniqueInput
  disconnect?: BoardWhereUniqueInput[] | BoardWhereUniqueInput
  delete?: BoardWhereUniqueInput[] | BoardWhereUniqueInput
  update?: BoardUpdateWithWhereUniqueWithoutOwnerInput[] | BoardUpdateWithWhereUniqueWithoutOwnerInput
  upsert?: BoardUpsertWithWhereUniqueWithoutOwnerInput[] | BoardUpsertWithWhereUniqueWithoutOwnerInput
}

export interface UserUpdateInput {
  githubUserId?: String
  name?: String
  login?: String
  avatarUrl?: String
  boards?: BoardUpdateManyWithoutOwnerInput
}

export interface BoardCreateWithoutColumnsInput {
  name: String
  owner: UserCreateOneWithoutBoardsInput
}

export interface UserUpdateOneWithoutBoardsInput {
  create?: UserCreateWithoutBoardsInput
  connect?: UserWhereUniqueInput
  delete?: Boolean
  update?: UserUpdateWithoutBoardsDataInput
  upsert?: UserUpsertWithoutBoardsInput
}

export interface BoardUpdateOneWithoutColumnsInput {
  create?: BoardCreateWithoutColumnsInput
  connect?: BoardWhereUniqueInput
  delete?: Boolean
  update?: BoardUpdateWithoutColumnsDataInput
  upsert?: BoardUpsertWithoutColumnsInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  githubUserId?: String
  login?: String
}

export interface BoardWhereInput {
  AND?: BoardWhereInput[] | BoardWhereInput
  OR?: BoardWhereInput[] | BoardWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  owner?: UserWhereInput
  columns_every?: ColumnWhereInput
  columns_some?: ColumnWhereInput
  columns_none?: ColumnWhereInput
}

export interface BoardUpsertWithWhereUniqueWithoutOwnerInput {
  where: BoardWhereUniqueInput
  update: BoardUpdateWithoutOwnerDataInput
  create: BoardCreateWithoutOwnerInput
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface ColumnPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  name: String
  query: String
  index: Int
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

export interface Board extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  name: String
  owner: User
  columns?: Column[]
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

export interface Column extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  name: String
  board: Board
  query: String
  index: Int
}

export interface AggregateColumn {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface ColumnConnection {
  pageInfo: PageInfo
  edges: ColumnEdge[]
  aggregate: AggregateColumn
}

export interface BatchPayload {
  count: Long
}

/*
 * An edge in a connection.

 */
export interface BoardEdge {
  node: Board
  cursor: String
}

export interface User extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  githubUserId: String
  name?: String
  login: String
  avatarUrl: String
  boards?: Board[]
}

export interface AggregateUser {
  count: Int
}

export interface ColumnSubscriptionPayload {
  mutation: MutationType
  node?: Column
  updatedFields?: String[]
  previousValues?: ColumnPreviousValues
}

export interface UserPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  githubUserId: String
  name?: String
  login: String
  avatarUrl: String
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

export interface BoardSubscriptionPayload {
  mutation: MutationType
  node?: Board
  updatedFields?: String[]
  previousValues?: BoardPreviousValues
}

export interface BoardPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  name: String
}

/*
 * An edge in a connection.

 */
export interface ColumnEdge {
  node: Column
  cursor: String
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface BoardConnection {
  pageInfo: PageInfo
  edges: BoardEdge[]
  aggregate: AggregateBoard
}

export interface AggregateBoard {
  count: Int
}

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

export type DateTime = string

export interface Schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

export type Query = {
  users: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<User[]>
  boards: (args: { where?: BoardWhereInput, orderBy?: BoardOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Board[]>
  columns: (args: { where?: ColumnWhereInput, orderBy?: ColumnOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Column[]>
  user: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  board: (args: { where: BoardWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Board | null>
  column: (args: { where: ColumnWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Column | null>
  usersConnection: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<UserConnection>
  boardsConnection: (args: { where?: BoardWhereInput, orderBy?: BoardOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<BoardConnection>
  columnsConnection: (args: { where?: ColumnWhereInput, orderBy?: ColumnOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<ColumnConnection>
  node: (args: { id: ID_Output }, info?: GraphQLResolveInfo | string) => Promise<Node | null>
}

export type Mutation = {
  createUser: (args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  createBoard: (args: { data: BoardCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Board>
  createColumn: (args: { data: ColumnCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Column>
  updateUser: (args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  updateBoard: (args: { data: BoardUpdateInput, where: BoardWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Board | null>
  updateColumn: (args: { data: ColumnUpdateInput, where: ColumnWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Column | null>
  deleteUser: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  deleteBoard: (args: { where: BoardWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Board | null>
  deleteColumn: (args: { where: ColumnWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Column | null>
  upsertUser: (args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  upsertBoard: (args: { where: BoardWhereUniqueInput, create: BoardCreateInput, update: BoardUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Board>
  upsertColumn: (args: { where: ColumnWhereUniqueInput, create: ColumnCreateInput, update: ColumnUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Column>
  updateManyUsers: (args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyBoards: (args: { data: BoardUpdateInput, where?: BoardWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyColumns: (args: { data: ColumnUpdateInput, where?: ColumnWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyUsers: (args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyBoards: (args: { where?: BoardWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyColumns: (args: { where?: ColumnWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
}

export type Subscription = {
  user: (args: { where?: UserSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<UserSubscriptionPayload>>
  board: (args: { where?: BoardSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<BoardSubscriptionPayload>>
  column: (args: { where?: ColumnSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<ColumnSubscriptionPayload>>
}

export class Prisma extends BasePrisma {
  
  constructor({ endpoint, secret, fragmentReplacements, debug }: BasePrismaOptions) {
    super({ typeDefs, endpoint, secret, fragmentReplacements, debug });
  }

  exists = {
    User: (where: UserWhereInput): Promise<boolean> => super.existsDelegate('query', 'users', { where }, {}, '{ id }'),
    Board: (where: BoardWhereInput): Promise<boolean> => super.existsDelegate('query', 'boards', { where }, {}, '{ id }'),
    Column: (where: ColumnWhereInput): Promise<boolean> => super.existsDelegate('query', 'columns', { where }, {}, '{ id }')
  }

  query: Query = {
    users: (args, info): Promise<User[]> => super.delegate('query', 'users', args, {}, info),
    boards: (args, info): Promise<Board[]> => super.delegate('query', 'boards', args, {}, info),
    columns: (args, info): Promise<Column[]> => super.delegate('query', 'columns', args, {}, info),
    user: (args, info): Promise<User | null> => super.delegate('query', 'user', args, {}, info),
    board: (args, info): Promise<Board | null> => super.delegate('query', 'board', args, {}, info),
    column: (args, info): Promise<Column | null> => super.delegate('query', 'column', args, {}, info),
    usersConnection: (args, info): Promise<UserConnection> => super.delegate('query', 'usersConnection', args, {}, info),
    boardsConnection: (args, info): Promise<BoardConnection> => super.delegate('query', 'boardsConnection', args, {}, info),
    columnsConnection: (args, info): Promise<ColumnConnection> => super.delegate('query', 'columnsConnection', args, {}, info),
    node: (args, info): Promise<Node | null> => super.delegate('query', 'node', args, {}, info)
  }

  mutation: Mutation = {
    createUser: (args, info): Promise<User> => super.delegate('mutation', 'createUser', args, {}, info),
    createBoard: (args, info): Promise<Board> => super.delegate('mutation', 'createBoard', args, {}, info),
    createColumn: (args, info): Promise<Column> => super.delegate('mutation', 'createColumn', args, {}, info),
    updateUser: (args, info): Promise<User | null> => super.delegate('mutation', 'updateUser', args, {}, info),
    updateBoard: (args, info): Promise<Board | null> => super.delegate('mutation', 'updateBoard', args, {}, info),
    updateColumn: (args, info): Promise<Column | null> => super.delegate('mutation', 'updateColumn', args, {}, info),
    deleteUser: (args, info): Promise<User | null> => super.delegate('mutation', 'deleteUser', args, {}, info),
    deleteBoard: (args, info): Promise<Board | null> => super.delegate('mutation', 'deleteBoard', args, {}, info),
    deleteColumn: (args, info): Promise<Column | null> => super.delegate('mutation', 'deleteColumn', args, {}, info),
    upsertUser: (args, info): Promise<User> => super.delegate('mutation', 'upsertUser', args, {}, info),
    upsertBoard: (args, info): Promise<Board> => super.delegate('mutation', 'upsertBoard', args, {}, info),
    upsertColumn: (args, info): Promise<Column> => super.delegate('mutation', 'upsertColumn', args, {}, info),
    updateManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyUsers', args, {}, info),
    updateManyBoards: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyBoards', args, {}, info),
    updateManyColumns: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyColumns', args, {}, info),
    deleteManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyUsers', args, {}, info),
    deleteManyBoards: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyBoards', args, {}, info),
    deleteManyColumns: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyColumns', args, {}, info)
  }

  subscription: Subscription = {
    user: (args, infoOrQuery): Promise<AsyncIterator<UserSubscriptionPayload>> => super.delegateSubscription('user', args, {}, infoOrQuery),
    board: (args, infoOrQuery): Promise<AsyncIterator<BoardSubscriptionPayload>> => super.delegateSubscription('board', args, {}, infoOrQuery),
    column: (args, infoOrQuery): Promise<AsyncIterator<ColumnSubscriptionPayload>> => super.delegateSubscription('column', args, {}, infoOrQuery)
  }
}