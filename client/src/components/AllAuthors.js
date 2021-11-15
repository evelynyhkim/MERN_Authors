import React, {useEffect, useState, useContext} from "react"
//import {AuthorContext} from '../context/AuthorContext'
import AuthorContext from '../context/AuthorContext'
import axios from 'axios'
import DisplayAll from './DisplayAll'
import Header from './Header'

function AllAuthors() {
    const [loaded, setLoaded] = useState(false)
    const {authors, setAuthors}  = useContext(AuthorContext)

    function arrOrder(a, b){
        return a.ptype < b.ptype ? -1: (a.ptype > b.ptype ? 1:0)
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors")
        .then(res => {
            console.log(res.data)
            setAuthors(res.data.sort(arrOrder))
            setLoaded(true)
        })
        .catch(err => {
            if(err.response) {
                console.log('Error response ', err.response.data);
        	} else if (err.request) {
			    console.log('Request error ', err.request);
			} else {
			    console.log('Other error', err.message);   
            }
        })
    }, [])

    return (<>
        {loaded && <>
            <Header link={'/authors/new'} linkText={'add an author'} heading={'We have quotes by:'}></Header>
            <DisplayAll authors={authors}/>
        </>}
    </>)
}

export default AllAuthors