import { SessionContext } from "blitz"
import db, { CommentUpdateArgs } from "db"

type UpdateCommentInput = {
  where: CommentUpdateArgs["where"]
  data: CommentUpdateArgs["data"]
}

export default async function updateComment(
  { where, data }: UpdateCommentInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const comment = await db.comment.update({ where, data })

  return comment
}
