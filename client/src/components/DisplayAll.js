import React, {useEffect, useState, useContext} from "react"
import {navigate, Link} from '@reach/router'
import DeleteAuthor from "./DeleteAuthor"

function DisplayAll({authors, handleLike}) {
    return (
        <table className='tableAll'>
            <thead>
                <tr>
                    <th>Name</th><th>Actions available</th>
                </tr>
            </thead>
            <tbody>
                {authors? (authors.map((author, idx) => ( 
                    <tr key={idx}>
                        <td style={{color: "#a0f"}}>{author.aname}</td>
                        <td>
                            <button className="btnEdit" onClick={()=>navigate(`/authors/${author._id}/edit`)}>Edit</button>&nbsp;
                            <DeleteAuthor author={author}/>
                        </td>
                    </tr>
                ))): <tr><td>No authors available now</td></tr>}
            </tbody>
        </table>
    )
}
export default DisplayAll
