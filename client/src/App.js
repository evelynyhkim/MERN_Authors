import './App.css';
import React, {useEffect, useState} from 'react'
import AuthorContext from './context/AuthorContext'
import {Router, navigate} from '@reach/router'
import AllAuthors from './components/AllAuthors'
import NewAuthor from './components/NewAuthor'
import UpdateAuthor from './components/UpdateAuthor'
import io from 'socket.io-client'
import axios from 'axios'

function App() {
  
  const [authors, setAuthors] = useState([])
  const [socket] = useState(()=>io('http://localhost:5000'))
  
  const initialAuthor = {
    aname: "",
  }
  
  useEffect(()=>{
    console.log("App (re)rendered")
    
    socket.on("connect", ()=>{
      console.log("connecting socket")
      
      socket.on("UpdateLikes", arg=>{
        console.log("Update likes for author _id: " + arg._id)
      
        axios.get("http://localhost:8000/api/authors")
        .then(res => {
            console.log(res.data)
            setAuthors(res.data.sort(arrOrder))
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
      })
     
      function arrOrder(a, b){
        return a.ptype < b.ptype ? -1: (a.ptype > b.ptype ? 1:0)
      }
      socket.on("DeleteAuthor", arg=>{
        console.log("Delete author with _id: " + arg._id)
        axios.get("http://localhost:8000/api/authors")
        .then(res => {
            console.log(res.data)
            setAuthors(res.data.sort(arrOrder))
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
      })
    })

    return ()=>{socket.disconnect(true)}
    
  }, [socket])

  return (
    <div className="App">
      <AuthorContext.Provider value={{authors, setAuthors, initialAuthor, socket}}>
        <Router>
          <AllAuthors path="/"/>
          <NewAuthor path="/authors/new"/>
          <UpdateAuthor path="/authors/:id/edit"/>

        </Router>
      </AuthorContext.Provider>

    </div>
    );
}
export default App;
      // <h1>Favorite authors</h1>
      // <p><Link to='/authors/new'>Add a author</Link><Link to='/'>See All</Link></p>
      // <hr/>
      