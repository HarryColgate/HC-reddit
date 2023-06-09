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
    const { selectedSubreddit, filter, isLoading, error, activeArray, selectedPost, comments} = feed;

    useEffect(() => {
        dispatch(fetchFeed({selectedSubreddit, filter}))
    }, [selectedSubreddit, filter, dispatch]);

    useEffect(() => {
        dispatch(fetchComments(selectedPost))
    }, [selectedPost, dispatch]);

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

    if (feed.length < 1) {
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
                        <div className="banner" onClick={() => expandPost(index, post.permalink)} style={activeArray[index] ? {backgroundColor: "#FF7222"} : null}>
                            <div className="votes">
                                <i className="fas fa-caret-up"></i>
                                    <span>{post.score}</span>
                                <i className="fas fa-caret-down"></i>
                            </div>
                            <div className="media">
                                {post.post_hint === 'image' ? <img className="redditImage" alt="thumbnail" src={post.url}/> : null}
                            </div>
                            <div className="content">
                                <p className="postInfo">submitted to <span>r/{post.subreddit}</span> by <span>u/{post.author}</span></p>
                                <h2>{post.title}</h2>
                                <div className="comments">
                                    <i className="fas fa-comment"></i>
                                    <p>{post.num_comments}</p>
                                </div>
                            </div>
                        </div>
                        <div className={ activeArray[index] ? "expanded" : "donotshow"}>
                            <div className="selftext">
                                <p>{post.selftext}</p>
                            </div>
                            <div className={post.post_hint === 'image' || post.post_hint === 'video' ? "expandedMediaContainer" : "donotshow"}>
                                {post.post_hint === 'image' ? <img className="expandedImage expandedMedia" alt="enlarged media" src={post.url}/> : null}
                            </div>
                            {/*using object value in system called hidden that is always default false*/}
                            <div className="expandedComments" style={comments.length < 1 ? {display: "none"} : null}>
                                <Comments />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}