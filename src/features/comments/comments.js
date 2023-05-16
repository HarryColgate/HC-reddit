import React from "react";
import Loading from "../loading/loading";
import Failed from "../failed/failed";
import { useSelector } from "react-redux";
import './comments.css'

export default function Comments() {

    const feed = useSelector((state) => state.feed);
    const { comments, commentsIsLoading, commentsIsError} = feed;

    if (commentsIsError) {
        return (
            <Failed />
        )
    }

    if (commentsIsLoading) {
        return (
           <Loading />
        )
    }


    return (
        <ul className="commentList">
            {comments.map(comment => (
                <div className={comment.body ? "commentItem" : "hide"}>
                    <div className="commentUps">
                        <i className="fas fa-caret-up"></i>
                            <span>{comment.score}</span>
                        <i className="fas fa-caret-down"></i>
                    </div>
                    <div className="commentInfo">
                        <li>
                            <p className="author">u/{comment.author}</p>
                            <p className="commentBody">{comment.body}</p>
                        </li>
                    </div>
                </div>
            ))}
        </ul>
    )
}