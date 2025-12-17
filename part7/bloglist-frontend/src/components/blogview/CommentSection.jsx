import CommentForm from "./CommentForm"
import CommentList from "./CommentList"

const CommentSection = ({blog}) => {
    return (
        <div>
            <h4>Comments:</h4>
            <CommentForm blog={blog}/>
            <CommentList comments={blog.comments}/>
        </div>
    )
}

export default CommentSection