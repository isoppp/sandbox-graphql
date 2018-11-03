import { allBooks, imageUrl } from './book'

export default {
  Book: {
    imageUrl: (book, { size }) => imageUrl(size, book.googleId)
  },
  Query: {
    // = type Query in typedefs.js
    books: () => allBooks(),
  },
}
