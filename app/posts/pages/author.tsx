import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, BlitzPage, Link, useSession, useQuery } from "blitz"
import Header from "app/posts/components/Header"
import Footer from "app/posts/components/Footer"
import AuthorPostList from "../components/AuthorPostList"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import PostList from "../components/PostList"



const PostsPage: BlitzPage = () => {
    const user = useSession().userId
    // const email = useCurrentUser()?.email

    return (
        <div>
            <Head>
                <title>Posts</title>
            </Head>

            <main>
                <Suspense fallback={<div>Loading...</div>}>
                    <Header />
                </Suspense>
                <br />
                {user ?
                <div className="welcome">
                    <Suspense fallback={<div>Loading...</div>}>
                        <h3 className="user_welcome">Welcome <span className="wel"> {user}</span></h3>
                        {/* <span style={{fontSize:'1.3rem' , color: 'red'}}> {email} </span> */}
                    </Suspense>
                    <Link href="posts/new">
                        <a className="create">Create New Blog</a>
                    </Link>
                </div>
           :
           <div></div>
        }
                <br />
                <br />

                <Suspense fallback={<div>Loading...</div>}>
                {user ?
                    <AuthorPostList />
                    :
                    <PostList />
                }
                </Suspense>
                <br />
                <br />

                <Footer />
            </main>
        </div >
    )
}

PostsPage.getLayout = (page) => <Layout title={"Posts"}>{page}</Layout>

export default PostsPage
