import { Link, useQuery,useSession } from 'blitz'
import styles from './PostList.module.scss'
import getPostAll from '../queries/getPostsAll'





const PostList = () => {
    const user = useSession().userId
    const [{ posts }] = useQuery(getPostAll, { orderBy: { createdAt: "desc" } })
    const likeCount="2";
    

    return (
        
        <div className={styles.blog_container}>
            {
                posts.map((post) => (
                    
                    <Link href="/posts/[postId]" as={`/posts/${post.id}`}>
                        <a>
                            <div className={styles.blogCard}>
                                <div className={styles.cardHeader}>
                                    <img src={post.imageUrl} alt="image_Sample" className={styles.blogImg} />
                                    {/* <img src="https://images.unsplash.com/photo-1560123557-7fc399fc0381?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80" alt="image_Sample" className={styles.blogImg} /> */}
                                    <div className={styles.meta}>
                                       <span className={styles.badge1}>Md Saqlain Nasim {post.userId}</span>
                                        {/* <span className={styles.badge2}>12 Novmever 2020</span> */}
                                        <span className={styles.badge2}>{post.createdAt.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className={styles.card_content}>
                                    
                                    {/* <h2 className={styles.blogHeader}>Title</h2>
                                    <p className={styles.blogPara}>Description</p> */}
                                    <h2 className={styles.blogHeader}>{post.title}</h2>
                                    <p className={styles.blogPara}>{post.description}</p>
                                </div>
                            </div>
                        </a>
                     </Link>
                ))
                }
        </div>
    )
}

export default PostList
