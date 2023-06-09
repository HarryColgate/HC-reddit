import React from 'react';
import './header.css';
import { setFilter } from '../feed/feedSlice'
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {

    const dispatch = useDispatch();
    const feed = useSelector((state) => state.feed);
    const { filter } = feed;
    let activeFilter = filter;
    const handleClick = (filter) => {
        dispatch(setFilter(filter))
    }

    return(
        <div className='header'>
            <div className='header-content'>
                <ul>
                    {/*uses the set filter from feedSlice to change the current filter*/}
                    <li className={activeFilter === 'hot' ? 'highlight' : 'noHighlight'} onClick={() => handleClick('hot')}>Hot</li>
                    <li className={activeFilter === 'new' ? 'highlight' : 'noHighlight'} onClick={() => handleClick('new')}>New</li>    
                    <li className={activeFilter === 'top' ? 'highlight' : 'noHighlight'} onClick={() => handleClick('top')}>Top</li>               
                </ul>
            </div>
        </div>
    )
}