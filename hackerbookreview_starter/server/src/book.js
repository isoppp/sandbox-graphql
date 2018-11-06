import query from './db'
import { groupBy, map } from 'ramda'
import DataLoader from 'dataloader';

async function findBooksIds(ids) {
  const sql = `
  select *
  from hb.book
  where hb.book.id = ANY($1)
  `

  const params = [ids]

  try {
    const result = await query(sql, params)
    const rowsById = groupBy(book => book.id, result.rows)
    return map(id => {
      const book = rowsById[id] ? rowsById[id][0] : null
      return book
    }, ids)
  } catch (err) {
    console.log(err)
    throw err
  }
}

export function findBooksByIdsLoader () {
  return new DataLoader(findBooksIds)

}

export async function findBookById(id) {
  const sql = `
  select *
  from hb.book
  where hb.book.id = $1;
  `

  const params = [id]

  try {
    const result = await query(sql, params)
    return result.rows[0]
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const allBooks = async () => {
  const sql = `
  select * from hb.book;
`

  try {
    const result = await query(sql)
    return result.rows
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const imageUrl = (size, id) => {
  const zoom = size === 'SMALL' ? 1 : 0
  return `http://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=${zoom}&source=gbs_api`
}
