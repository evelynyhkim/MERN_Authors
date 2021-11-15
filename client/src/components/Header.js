import React from 'react'
import {Link, navigate} from '@reach/router'
import DeleteAuthor from './DeleteAuthor'

function Header({link, linkText, heading, author}){
    if(!link) {
        link = '/'
        linkText = 'back to home'
    }
    return (<>
        <div>
            <h1>Favorite authors</h1>
            <Link to={link}>{linkText}</Link>
        </div>
        <div className="flexContainer">
            <p className='heading'>{heading}</p>
        </div>
    </>)
}

export default Header