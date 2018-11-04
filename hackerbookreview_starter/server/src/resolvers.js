import { allBooks, imageUrl } from './book'

export default {
  Book: {
    imageUrl: (book, { size }) => imageUrl(size, book.googleId),
    authors: (book, args, context) => {
      const { loaders } = context
      const { findAuthorsByBookIdsLoader } = loaders
      return findAuthorsByBookIdsLoader.load(book.id)
    },
  },
  Query: {
    books: () => allBooks(),
  },
}
