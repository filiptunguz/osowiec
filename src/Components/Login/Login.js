import React, {useState} from 'react';
import {useHistory} from "react-router";
import Cookies from "universal-cookie/lib";
import axios from "axios";

import './Login.scss';

const Login = (props) => {
    const history = useHistory();
    const cookies = new Cookies();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState();

    const onSubmit = (event) => {
        event.preventDefault();
        let json = JSON.stringify({
            email: email,
            password: password
        });
        axios.post('https://osowiec.000webhostapp.com/login.php', json)
            .then(res => {
                if (res.data !== '') {
                    cookies.set('userApiKey', res.data.userApiKey);
                    props.onUserLogin(res.data);
                    history.push('/');
                } else {
                    setLoginError(<span>Lozinka ili email adresa nisu ispravne!</span>);
                }
            })
    }

    const emailChangeHandler = (event) => {
        let email = event.target.value;

        setEmail(email);
    }

    const passwordChangeHandler = (event) => {
        let password = event.target.value;

        setPassword(password);
    }

    return (
        <div className="login">
            <h1>Ulogujte se</h1>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="Vasa email adresa..." onChange={emailChangeHandler}/>
                <input type="password" placeholder="Vasa lozinka..." onChange={passwordChangeHandler}/>
                <button>Uloguj se</button>
                {loginError}
            </form>
        </div>
    );
};

export default Login;