import { useState } from "react"
import { store } from "../../app/store";
import { useDispatch } from "react-redux";
import { toggleLogin } from "./loginSlice";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        e.preventDefault();
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        e.preventDefault();
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(username === store.getState().login.username && password === store.getState().login.password){
            dispatch(toggleLogin());
        }
        e.preventDefault();
    }
    return(
        <form onSubmit={handleSubmit} className="form">
            <input
            type="text"
            placeholder="username"
            value={username}
            onChange={handleUsernameChange}/>
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}/>
            <button type="submit" className="button primary-button">Submit</button>
        </form>
    )
    
}

export default LoginForm