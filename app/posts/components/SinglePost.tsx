import deleteComment from "app/comments/mutations/deleteComment"
import updateComment from "app/comments/mutations/updateComment"
import getComment from "app/comments/queries/getComment"
import getComments from "app/comments/queries/getComments"
import getPost from "app/posts/queries/getPost"
import { Link, useParam, useQuery, useRouter, useSession } from "blitz"
import { Comment } from "./Comment"
import styles from './SinglePost.module.scss'
import { useState } from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const SinglePost = () => {
    const router = useRouter()
const user = useSession();
const userID= useSession().userId;
    const postId = useParam("postId", "number")
    const [post] = useQuery(getPost, { where: { id: postId } })
    const [{comments}] = useQuery(getComments, { where: { postId: postId } })
    const [count, setCount] = useState(0);
    return (
        <div className={styles.singlePost}>
            <div className={styles.date}>
            <h3>Posted By (User Id) : {post.userId}</h3>
            <h3>Dated : {post.createdAt.toLocaleString()}</h3>
            </div>
            <img className={styles.singlePostimg} src={post.imageUrl} alt={post.title} />
            <div style={{display:"flex", justifyContent:"space-around", width:'10%'}}>
            <p style={{color: 'black', cursor:"pointer"}} onClick={()=>setCount(count + 1)}><FavoriteIcon color="secondary" /></p> 
            <p style={{color: 'black', cursor:"pointer"}} onClick={()=>setCount(count - 1)}> <FavoriteBorderIcon  color="black" /></p>
            <p>{count}</p>
            </div>

            <h2 className={styles.title}>{post.title}</h2>

            
            <p>{post.description}</p>
            <br/>
            <hr/>
                <br/>
                {
                comments.map((comments) => (
                  <div>
            <p style={{display:'flex', justifyContent:"space-between",marginBottom:'2px'}}><div>
                Name {comments.userId} : <b>{comments.commentName}</b></div>
              {
            comments.userId ===userID && userID  ? <div style={{display:"flex", alignItems:'center'}}>
                <button onClick={async()=>alert("under maintainerce")}>update</button>
                {/* <Link href="/comment" >
                            <a className="edit">update</a>
                        </Link> */}
            <button style={{background:'transparent', color: 'red'}}
            className="delete"
            type="button"
            onClick={async () => {
                if (window.confirm("This will be deleted")) {
                    await deleteComment({ where: { id: comments.id } })
                    // router.push("/author")
                }
            }}>
            Delete
        </button> 
           
        
        </div> : <p></p>
            }
            
            </p>
                      
            </div>
                ))
            }
            

            <Comment />
        </div>
    )
}

export default SinglePost
