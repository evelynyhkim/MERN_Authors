import React, {useState, useContext} from "react"
import AuthorContext from '../context/AuthorContext'
//import styles from "./authors/NewAuthor.module.css"
import axios from 'axios'
import {navigate} from '@reach/router'

function DeleteAuthor({author, callback}) {
	const {authors, setAuthors, socket} = useContext(AuthorContext)
    const [errs, setErrs] = useState()

	function handleDelete(idToDelete) {
		socket.emit("DeleteRequest", idToDelete)
		navigate('/')
	}

	return (<>
		<button className='btnDelete' onClick={()=>handleDelete(author._id)}>Delete</button>
		{errs && <p>{errs.message}</p>}
	</>)
}

export default DeleteAuthor