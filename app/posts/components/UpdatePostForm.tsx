import { Form, Field } from "react-final-form"
import { useParam, useQuery, useRouter } from "blitz"
import getPost from "../queries/getPost"
import updatePost from "../mutations/updatePost"



const UpdatePostForm = () => {
    const router = useRouter()
    const postId = useParam("postId", "number")
    const [post, { mutate }] = useQuery(getPost, { where: { id: postId } })

    const onSubmit = async (formData) => {
        try {
            const updated = await updatePost({
                where: { id: post.id },
                data: { title: formData.title, imageUrl: formData.imageUrl, description: formData.description },
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
            <h1 style={{ marginLeft: "2rem" }}>Edit Post {post.id}</h1>
            
            <Form
                onSubmit={onSubmit}
                initialValues={post}
            >
                {({ handleSubmit, submitting, pristine }) => (
                    <form onSubmit={handleSubmit} className="form_control">

                        <div>
                            <Field
                                name="title"
                                component="input"
                                type="text"
                                placeholder="Blog Title"
                            />
                        </div>

                        <div>
                            <Field
                                name="imageUrl"
                                component="input"
                                type="text"
                                placeholder="Image Url"
                            />
                        </div>

                        <div>
                            <Field name="description" component="textarea" placeholder="Blog Description" />
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

export default UpdatePostForm
