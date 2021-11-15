import '../App.css';
import {useState, useEffect, useContext} from 'react'
import AuthorContext from '../context/AuthorContext'
import { navigate } from '@reach/router';

function FormAuthor({handleSubmit, oneAuthor, author, setAuthor, submitText, errs}){
    const {initialAuthor}  = useContext(AuthorContext)
    const [loaded, setLoaded] = useState(false)

    useEffect(()=>{
        //filling form with given author data
        if(oneAuthor) setAuthor(oneAuthor)
        setLoaded(true)
    }, [])

    function handleChange(e) {
            const newAuthor = {...author, [e.target.name]:e.target.value}
            setAuthor(newAuthor)
        }

    return (
        <form>
            {loaded && (<>
            <div>
                <p>
                    <label htmlFor="aname" style={{marginRight: "10px"}}>
                        Author Name:
                    </label><br/>
                    <input className={`textInput ${errs?.errors?.aname&&'textInputErr'}`} name="aname" value = {author.aname} onChange = {handleChange} type="text" id="aname"/>
                </p>
                <p className="errMsg">{errs?.errors?.aname?.message}</p>
                <p><button className='submit'onClick={()=>navigate('/')}>Cancel</button>
                    <input className='submit'
                    type="submit"
                    value={submitText}
                    onClick={handleSubmit}
                    />
                </p>
            </div>
            </>)}
        </form>
    )
}

export default FormAuthor
{/* <input type="checkbox" name="instock" checked={author.instock} onChange={handleChange}/>
<label htmlFor="instock">In Stock?</label> */}
