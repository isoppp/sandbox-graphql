import { allBooks, imageUrl, findBookById } from './book'
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
    book: review => findBookById(review.bookId),
  },
  Query: {
    books: () => allBooks(),
    reviews: () => allReviews(),
  },
}
