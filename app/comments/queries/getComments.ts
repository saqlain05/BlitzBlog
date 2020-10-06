import { SessionContext } from "blitz"
import db, { FindManyCommentArgs } from "db"

type GetCommentsInput = {
  where?: FindManyCommentArgs["where"]
  orderBy?: FindManyCommentArgs["orderBy"]
  skip?: FindManyCommentArgs["skip"]
  take?: FindManyCommentArgs["take"]
  // Only available if a model relationship exists
  // include?: FindManyCommentArgs['include']
}

export default async function getComments(
  { where, orderBy, skip = 0, take }: GetCommentsInput,
  // ctx: { session?: SessionContext } = {}
) {
  // ctx.session!.authorize()

  const comments = await db.comment.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.comment.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    comments,
    nextPage,
    hasMore,
  }
}
