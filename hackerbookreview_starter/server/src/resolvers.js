import { allBooks } from './book'

export default {
  Book: {
    ratingCount: book => book.rating_count
  },
  Query: {
    // = type Query in typedefs.js
    books: () => allBooks(),
  },
}
