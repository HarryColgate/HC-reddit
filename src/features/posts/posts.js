import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import './posts.css'
import { fetchFeed } from "../feed/feedSlice";
import { changeHidden } from '../feed/feedSlice'
import Loading from "../loading/loading";
import Failed from "../failed/failed";

export default function Posts() {

    const dispatch = useDispatch();
    const feed = useSelector((state) => state.feed);
    const { selectedSubreddit, filter, isLoading, error } = feed;

    useEffect(() => {
        dispatch(fetchFeed({selectedSubreddit, filter}))
    }, [selectedSubreddit, filter])

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
                {feed.feed.map(post => (
                    <div className="post">
                        <div className="banner">
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
                        <div className={post.hidden ? "expanded" : "donotshow"}>
                            <div className="media">
                                {post.post_hint === 'image' ? <img className="expandedImage" src={post.url}/> : null}
                            </div>
                            {/*using object value in system called hidden that is always default false*/}
                            <div className="comments">
                            
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}