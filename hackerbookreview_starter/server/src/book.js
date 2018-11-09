import query from './db'
import { groupBy, map } from 'ramda'
import DataLoader from 'dataloader';

async function findBooksIds (ids) {
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

export async function findBookById (args) {
  const sql = `
  select *
  from hb.book
  where hb.book.id = $1;
  `

  const params = [parseInt(args.id, 10)]

  try {
    const result = await query(sql, params)
    return result.rows[0]
  } catch (err) {
    console.log(err)
    throw err
  }
}

const ORDER_BY = {
  RATING_DESC: 'id desc',
  ID_DESC: 'rating desc',
}

export const allBooks = async (args) => {
  const orderBy = ORDER_BY[args.orderBy]
  const sql = `
  select * from hb.book
  order by ${orderBy};
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
