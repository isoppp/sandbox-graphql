import { allBooks } from './book'

export default {
  Query: {
    // = type Query in typedefs.js
    books: () => allBooks(),
  },
}
