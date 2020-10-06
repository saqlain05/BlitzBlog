import React from 'react'
import { Form, Field } from "react-final-form"
import { useQuery, useRouter, useSession, useParam } from "blitz"
import createComment from 'app/comments/mutations/createComment'
import getComments from 'app/comments/queries/getComments'
// import getComment from "app/posts/queries/getComment"

export const Comment = () => {
    const router =  useRouter()
        const session = useSession();
        const Userid = session.userId
        const postId = useParam("postId", "number")
        const [posted] = useQuery(getComments, { where: { id: postId } })
    const onSubmit = async (formobj) => {
        // alert("comment Under Development");
     
        try {
          await createComment({
            data: {
            commentName : formobj.commentName , 
               user: {
                connect: { id: Userid }
              },
              post : {
                  connect: {id: postId}
              }
            }
          })
          // router.push("/posts/${postId}")
          // router.push("/posts/[postId]", `/posts/${[postId]}`)
        } catch (error) {
          // alert("Error creating article " + JSON.stringify(error, null, 2))
          alert( error.message)
        }
    
      }
    return (
        <div>
            <Form
        onSubmit={onSubmit}
        initialValues={{}}
      >
        {({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} className="form_controls">

            <div>
              <Field
                name="commentName"
                component="input"
                type="text"
                placeholder="Type Comment"
              />
            </div>

            

            <div className="buttons">
              <button type="submit" disabled={submitting || pristine} style={{display:'none'}}>
                Submit
            </button>
            </div>
          </form>
        )}

      </Form>
        </div>
    )
}
