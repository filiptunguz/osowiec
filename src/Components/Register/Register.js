import React, {useState} from 'react';

import './Register.scss';
import axios from "axios";

const Register = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [rePasswordError, setRePasswordError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [engagement, setEngagement] = useState('manager');
    const [error, setError] = useState('');

    const inputChangeHandler = (event) => {
        setError('');

        switch (event.target.name) {
            case 'email':
                setEmail(event.target.value.toLowerCase());

                // Email validation check
                const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!event.target.value.toLowerCase().match(regex)) {
                    setEmailError('Email adresa nije validna!');
                } else {
                    setEmailError('');
                }
                break;
            case 'firstName':
                setFirstName(event.target.value);
                break;
            case 'lastName':
                setLastName(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);

                // Check password length
                if (event.target.value && event.target.value.length < 8) {
                    setPasswordError('Lozinka mora da ima minimum 8 karaktera!');
                } else {
                    setPasswordError('');
                }

                // Check passwords matching
                if (rePassword && event.target.value !== rePassword) {
                    setRePasswordError('Lozinke moraju da se poklapaju!');
                } else {
                    setRePasswordError('');
                }
                break;
            case 'rePassword':
                setRePassword(event.target.value);

                // Check passwords matching
                if (event.target.value && password !== event.target.value) {
                    setRePasswordError('Lozinke moraju da se poklapaju!');
                } else {
                    setRePasswordError('');
                }
                break;
            case 'phoneNumber':
                setPhoneNumber(event.target.value);
                break;
            case 'city':
                setCity(event.target.value);
                break;
            case 'address':
                setAddress(event.target.value);
                break;
            case 'engagement':
                setEngagement(event.target.value);
                break;
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (!passwordError && !rePasswordError && !emailError) {
            if (email && password && firstName && lastName &&
                phoneNumber && city && address && engagement) {

                let json = JSON.stringify({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                    phoneNumber: phoneNumber,
                    city: city,
                    address: address,
                    engagement: engagement
                });
                axios.post('https://osowiec.000webhostapp.com/register.php', json)
                    .then(res => {
                        console.log(res);
                    })
            } else {
                setError('Sva polja su obavezna');
            }
        }

    }

    return (
        <div className="register">
            <h1>Registrujte novozaposlenog</h1>
            <form onSubmit={onSubmit}>
                <input name="email"
                       onChange={inputChangeHandler}
                       type="email"
                       placeholder="Email adresa"/>
                {emailError ? <span>{emailError}</span> : null}
                <input name="firstName"
                       onChange={inputChangeHandler}
                       type="text"
                       placeholder="Ime"/>
                <input name="lastName"
                       onChange={inputChangeHandler}
                       type="text"
                       placeholder="Prezime"/>
                <input name="password"
                       onChange={inputChangeHandler}
                       type="password"
                       placeholder="Lozinka"/>
                {passwordError ? <span>{passwordError}</span> : null}
                <input name="rePassword"
                       onChange={inputChangeHandler}
                       type="password"
                       placeholder="Ponovite lozinku"/>
                {rePasswordError ? <span>{rePasswordError}</span> : null}
                <input name="phoneNumber"
                       onChange={inputChangeHandler}
                       type="text"
                       placeholder="Broj telefona"/>
                <input name="city"
                       onChange={inputChangeHandler}
                       type="text"
                       placeholder="Mesto stanovanja"/>
                <input name="address"
                       onChange={inputChangeHandler}
                       type="text"
                       placeholder="Adresa stanovanja"/>
                <select
                    name="engagement"
                    id="engagement"
                    onChange={inputChangeHandler}>
                    <option value="manager">Menadzer</option>
                    <option value="worker">Radnik</option>
                    <option value="admin">Admin</option>
                </select>
                <button>Registruj korisnika</button>
                {error ? <span>{error}</span> : null}
            </form>
        </div>
    );
}

export default Register;