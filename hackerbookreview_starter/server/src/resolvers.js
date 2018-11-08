import { allBooks, imageUrl } from './book'
import { allReviews } from './review'

export default {
  Book: {
    imageUrl: (book, { size }) => imageUrl(size, book.googleId),
    authors: (book, args, context) => {
      const { loaders } = context
      const { findAuthorsByBookIdsLoader } = loaders
      return findAuthorsByBookIdsLoader.load(book.id)
    },
  },
  Review: {
    book: (review, args, context) => {
      const { loaders } = context
      const { findBooksByIdsLoader } = loaders
      return findBooksByIdsLoader.load(review.bookId)
    },
    user: (review, args, context) => {
      const { loaders } = context
      const { findUsersByIdsLoader } = loaders
      return findUsersByIdsLoader.load(review.userId)
    },
  },
  Query: {
    books: (root, args) => {
      return allBooks(args)
    },
    reviews: (root, args) => {
      return allReviews(args)
    }
  },
}
