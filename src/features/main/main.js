import React from 'react';
import Header from '../header/header'
import Posts from '../posts/posts'
import './main.css'

export default function Main() {

    return(
        <div className='main'>
            <Header />
            <Posts />
        </div>
    )
}

    