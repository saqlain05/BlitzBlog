import React from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, BlitzPage } from "blitz"
import createPost from "app/posts/mutations/createPost"
import PostForm from "app/posts/components/PostForm"
import Header from "app/posts/components/Header"
import Footer from "app/posts/components/Footer"

const NewPostPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>New Post</title>
      </Head>

      <main>
        <Header/>
        

        <PostForm
          initialValues={{}}
          onSubmit={async () => {
            try {
              const post = await createPost({ data: { name: "MyName" } })
              alert("Success!" + JSON.stringify(post))
              router.push("/posts/[postId]", `/posts/${post.id}`)
            } catch (error) {
              alert("Error creating post " + JSON.stringify(error, null, 2))
            }
          }}
        />

        <br/><br/><br/><br/><br/>
<br/>
      <Footer />
      </main>
    </div>
  )
}

NewPostPage.getLayout = (page) => <Layout title={"Create New Post"}>{page}</Layout>

export default NewPostPage
