import { SessionContext } from "blitz"
import db, { CommentDeleteArgs } from "db"

type DeleteCommentInput = {
  where: CommentDeleteArgs["where"]
}

export default async function deleteComment(
  { where }: DeleteCommentInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const comment = await db.comment.delete({ where })

  return comment
}
