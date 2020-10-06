import { Form, Field } from "react-final-form"
import { useParam, useQuery, useRouter } from "blitz"
import updateComment from "app/comments/mutations/updateComment"
import getComments from "app/comments/queries/getComments"



const UpdateComment = () => {
    const router = useRouter()
    const postId = useParam("postId", "number")
    const [post, { mutate }] = useQuery(getComments, { where: { id: postId } })
    // const [{comments}] = useQuery(getComments, { where: { postId: postId } })

    const onSubmit = async (formData) => {
        try {
            const updated = await updateComment({
                where: { id: postId },
                data: { commentName: 'formData.commentName' },
            })
            mutate(post)
            // router.push("/posts/[postId]", `/posts/${updated.id}`)
            router.push("/author")
        } catch (error) {
            alert("Error creating article " + JSON.stringify(error, null, 2))
        }

    }


    return (
        <div style={{
            margin: 'auto',
            width: '50%',
            padding: '10px'
            }}>
            <h1 style={{ marginLeft: "2rem" }}>Edit Post {postId}</h1>
            
            <Form
                onSubmit={onSubmit}
                initialValues={post}
            >
                {({ handleSubmit, submitting, pristine }) => (
                    <form onSubmit={handleSubmit} className="form_control">

                        <div>
                            <Field
                                name="commentName"
                                component="input"
                                type="text"
                                placeholder="Update Comment"
                            />
                        </div>

                      
                        

                        <div className="buttons" style={{display:'flex', justifyContent:'flex-end', alignItems:'flex-end'}}>
                            <button type="submit" disabled={submitting || pristine}>
                                Submit
                            </button>
                        </div>
                    </form>
                )}

            </Form>
        </div>
    )
}

export default UpdateComment
