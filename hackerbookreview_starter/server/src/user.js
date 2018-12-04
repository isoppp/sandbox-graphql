import query from './db'
import { groupBy, map } from 'ramda'
import DataLoader from 'dataloader'

async function findUsersIds(ids) {
  const sql = `
  select *
  from hb.user
  where hb.user.id = ANY($1)
  `

  const params = [ids]

  try {
    const result = await query(sql, params)
    const rowsById = groupBy(user => user.id, result.rows)
    return map(id => {
      const user = rowsById[id] ? rowsById[id][0] : null
      return user
    }, ids)
  } catch (err) {
    console.log(err)
    throw err
  }
}

export function findUsersByIdsLoader() {
  return new DataLoader(findUsersIds)
}
