const typeDefs = `
schema {
  query: Query
  mutation: Mutation
}

type Query {
  books(orderBy: BooksOrderBy = RATING_DESC): [Book]
  reviews(orderBy: ReviewOrderBy = ID_ASC): [Review]
  book(id: ID!): Book
}

type Mutation {
  createReview(reviewInput: ReviewInput!): Review
}

input ReviewInput {
  bookId: ID!
  rating: Int!
  name: String!
  email: String!
  title: String
  comment: String
}

enum BooksOrderBy {
  RATING_DESC
  ID_DESC
}

enum ReviewOrderBy {
  ID_ASC
  ID_DESC
}

type Review {
  id: ID!
  rating: Int
  title: String
  comment: String
  book: Book
  user: User
}

type User {
  id: ID!
  name: String
  imageUrl(size: Int = 50): String
}

type Book {
  id: ID!
  title: String!
  description: String!
  imageUrl(size: ImageSize = LARGE): String!
  rating: Float
  subtitle: String
  ratingCount: Int
  authors: [Author]
  reviews: [Review]
}

type Author {
  id: ID!
  name: String
}

enum ImageSize {
  SMALL
  LARGE
}
`

export default typeDefs
