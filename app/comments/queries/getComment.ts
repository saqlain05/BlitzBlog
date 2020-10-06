import { NotFoundError, SessionContext } from "blitz"
import db, { FindOneCommentArgs } from "db"

type GetCommentInput = {
  where: FindOneCommentArgs["where"]
  // Only available if a model relationship exists
  // include?: FindOneCommentArgs['include']
}

export default async function getComment(
  { where /* include */ }: GetCommentInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const comment = await db.comment.findOne({ where })

  if (!comment) throw new NotFoundError()

  return comment
}
