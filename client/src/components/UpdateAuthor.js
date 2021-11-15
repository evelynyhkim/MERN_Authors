import React, {useState, useContext, useEffect} from "react"
//import styles from "./authors/NewAuthor.module.css"
import axios from 'axios'
import FormAuthor from "./FormAuthor"
import Header from './Header'
import {navigate, Link} from '@reach/router'
import AuthorContext from "../context/AuthorContext"

function UpdateAuthor({id}) {
    const [loaded, setLoaded] = useState(false)
	const [author, setAuthor] = useState()
    const [errs, setErrs] = useState()
    const [noAuthorErr, setNoAuthorErr] = useState(false)

	useEffect(()=>{
        axios.get('http://localhost:8000/api/authors/' + id)
        .then(res=>{
            console.log('got one author')
            setAuthor(res.data)
            setLoaded(true)
        })
		.catch(err => {
			if (err.response) {
			    console.log('Error response ', err);
                setErrs(err.response.data)
                setNoAuthorErr(true)
			} else if (err.request) {
			    console.log('Request error ', err.request);
			} else {
			    console.log('Other error', err.message);
			}

		})
    }, [])

	function handleUpdate(e) {
		e.preventDefault()
        axios.put('http://localhost:8000/api/authors/' + author._id + '/edit', author)
		.then(res=>{
			console.log(res.data)
            navigate('/')
		})
		.catch(err => {
			if (err.response) {
			    console.log('Error response ', err.response.data);
                setErrs(err.response.data)
			} else if (err.request) {
			    console.log('Request error ', err.request);
			} else {
			    console.log('Other error', err.message);
			}
		})
	}
	return (<>
		{noAuthorErr && <>
			<Header heading="We're sorry, but we could not find the author you are looking for. Would you like to add an author to our database?"/>
        	<Link to="/authors/new">Add a author</Link>
		</>}
        {loaded && (<>
			<Header heading={'Edit this author:'} link='/' linkText='Home'/>
			<FormAuthor handleSubmit={handleUpdate} oneAuthor={author} author={author} setAuthor={setAuthor} submitText="Submit" errs={errs}/>
		</>)}
    </>)
}

export default UpdateAuthor