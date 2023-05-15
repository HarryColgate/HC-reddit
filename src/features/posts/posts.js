import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import './posts.css'
import { changeSelectedPost, fetchFeed } from "../feed/feedSlice";
import { changeHidden, resetArray, fetchComments } from '../feed/feedSlice'
import Loading from "../loading/loading";
import Failed from "../failed/failed";
import Comments from "../comments/comments";

export default function Posts() {

    const dispatch = useDispatch();
    const feed = useSelector((state) => state.feed);
    const { selectedSubreddit, filter, isLoading, error, activeArray, selectedPost, comments, commentsIsLoading} = feed;

    useEffect(() => {
        dispatch(fetchFeed({selectedSubreddit, filter}))
    }, [selectedSubreddit, filter]);

    useEffect(() => {
        dispatch(fetchComments(selectedPost))
    }, [selectedPost]);

    const expandPost = (postNum, commentLink) => {
        if (activeArray[postNum]) {
            dispatch(resetArray());
            dispatch(changeSelectedPost(""));
        } else {
            dispatch(changeSelectedPost(commentLink));
            dispatch(resetArray());
            dispatch(changeHidden(postNum));
        }
    }


    if(isLoading) {
        return(
            <Loading />
        )
    } 

    if (error) {
        return(
            <Failed />
        )
    }

    else {
        return(
            <div className="posts">
                <h1>r/{selectedSubreddit}</h1>
                {/* goes through the feed array to make each post */}
                {feed.feed.map((post, index) => (
                    <div className="post">
                        {/*adjusts what post is being viewed and adjusting what comments are loaded*/}
                        <div className="banner" onClick={() => expandPost(index, post.permalink)}>
                            <div className="votes">
                                <i className="fas fa-caret-up"></i>
                                    <span>{post.score}</span>
                                <i className="fas fa-caret-down"></i>
                            </div>
                            <div className="media">
                                {post.post_hint === 'image' ? <img className="redditImage" src={post.url}/> : null}
                                {post.post_hint === 'video' ? <img className="redditVideo" src={post.url} /> : null}
                            </div>
                            <div className="content">
                                <p className="postInfo">submitted to <span>r/{post.subreddit}</span> by <span>u/{post.author}</span></p>
                                <h2>{post.title}</h2>
                                <div className="comments">
                                    <i className="fas fa-comment"></i>
                                    {post.num_comments}
                                </div>
                            </div>
                        </div>
                        <div className={ activeArray[index] ? "expanded" : "donotshow"}>
                            <div className={post.post_hint === 'image' || post.post_hint === 'video' ? "expandedMediaContainer" : "donotshow"}>
                                {post.post_hint === 'image' ? <img className="expandedImage expandedMedia" src={post.url}/> : null}
                            </div>
                            {/*using object value in system called hidden that is always default false*/}
                            <div className="expandedComments">
                                <Comments />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}