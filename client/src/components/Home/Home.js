import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "../../hooks/useLocalStorage";


export function Home({socket}){
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const {setToStorage} = useLocalStorage()
     
    const submitHandler = (e) => {
       e.preventDefault()
       setToStorage('username', username)
       navigate('/chat')
    }

    return (
        <form className="form-container" onSubmit={submitHandler}>
            <h2 className="form-header">Sign up to chat!</h2>
            <label htmlFor="username">Username</label>
            <input 
            type="text"
            minLength={6}
            name="username"
            id="username"
            className="username-input"
            value={username}
            onChange={e => setUsername(e.target.value)}
            />
            <button className="register-btn">Sign up</button>
        </form>
    )
}