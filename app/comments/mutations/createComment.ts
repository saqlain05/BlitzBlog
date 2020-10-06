import { SessionContext } from "blitz"
import db, { CommentCreateArgs } from "db"

type CreateCommentInput = {
  data: CommentCreateArgs["data"]
}
export default async function createComment(
  { data }: CreateCommentInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const comment = await db.comment.create({ data })

  return comment
}
