import { allBooks, imageUrl } from './book'
import { authorsByBookId } from './authors'

export default {
  Book: {
    imageUrl: (book, { size }) => imageUrl(size, book.googleId),
    authors: book => authorsByBookId(book.id),
  },
  Query: {
    books: () => allBooks(),
  },
}
