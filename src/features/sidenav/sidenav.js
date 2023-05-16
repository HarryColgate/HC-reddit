import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    selectSubreddits, 
    selectMenu,
} from '../subreddits/subredditsSlice';
import { setSelectedSubreddit, setFilter, setSearchTerm } from '../feed/feedSlice'
import './sidenav.css';

export default function Sidenav() {

    const menu = useSelector(selectMenu);
    const subreddits = useSelector(selectSubreddits);
    const dispatch = useDispatch();
    const feed = useSelector((state) => state.feed);
    const { searchTerm } = feed;


    const handleClick = (subName) => {
        dispatch(setSelectedSubreddit(subName))
        dispatch(setFilter("hot"))
    }

    const handleChange = (e) => {
        dispatch(setSearchTerm(e.target.value));
    }

    const setClick = () => {
        dispatch(setSelectedSubreddit(searchTerm));
    }

    return(
        <div className="sidenav">
            <div className='sidenav-logo' >
                <img src="https://www.redditinc.com/assets/images/site/reddit-logo.png" />
            </div>
            <div className='sidenav-search' >
                <input type="text" name="search" placeholder="Search subreddits" onChange={handleChange} />
                <i className='fas fa-search' onClick={() => setClick()}></i>
            </div>
            <div className='sidenav-link'>
                <ul>
                    {/*uses the setSelectedSubreddit from feedSlice to change the current Subreddit*/}
                    {menu.map(obj => (
                        <li>
                            <a 
                            onClick={() => handleClick(obj.name)}>
                                {obj.name}
                            </a>
                        </li>
                    ))}
                </ul>
                <hr />
                <ul>
                    {/*uses the setSelectedSubreddit from feedSlice to change the current Subreddit*/}
                    {subreddits.map(obj => (
                        <li>
                            <a 
                            onClick={() => handleClick(obj.name)}>
                                {obj.name}
                            </a>    
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

