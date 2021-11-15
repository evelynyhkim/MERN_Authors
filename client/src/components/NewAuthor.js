import React, {useState, useContext, useEffect} from "react"
import AuthorContext from '../context/AuthorContext'
import axios from 'axios'
import Header from './Header'
import FormAuthor from "./FormAuthor"
import {navigate} from '@reach/router'

function NewAuthor({id}) {
    const {initialAuthor} = useContext(AuthorContext)
    const [author, setAuthor] = useState(initialAuthor)
    const [errs, setErrs] = useState()
    
	function handleNew(e) {
		e.preventDefault()
        axios.post('http://localhost:8000/api/authors/new', author)
		.then(res=>{
			console.log(res.data)
			navigate('/')
		})
		.catch(err => {
			if (err.response) {
			    console.log('Error response ', err.response.data);
                setErrs(err.response.data)
			} else if (err.request) {
			    console.log('Request error', err.request);
			} else {
			    console.log('Other error', err.message);
			}
		})
	}
	return (<>
        <Header heading={'Add a new author:'} link='/' linkText='Home'/>
        <FormAuthor handleSubmit={handleNew} oneAuthor={""} author={author} setAuthor={setAuthor} submitText="Submit" errs={errs}/>
    </>)
}

export default NewAuthor