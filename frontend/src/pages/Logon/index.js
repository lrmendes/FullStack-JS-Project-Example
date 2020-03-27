import React, { useState } from 'react';
import './styles.css'
import { Link, useHistory } from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'
import heroImg from '../../assets/heroes.png';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', {id});

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (err) {
            alert('Login Error! This ID does not exists.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="People hugging"/>
                <form onSubmit={handleLogin}>
                    <h1>Do Your Login</h1>
                    <input value={id} onChange={e=> setId(e.target.value)} placeholder="Your ID:" />
                    <button className="button" type="submit">Login</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        I want to register.
                    </Link>
                    
                </form>
            </section>
            <img src={heroImg} alt="People hugging"/>
        </div>
    );
}