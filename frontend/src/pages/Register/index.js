import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg'
import './styles.css'


export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = ({
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        try {
            const response = await api.post('ongs', data);
            alert(`Your Acess ID: ${response.data.id}`);
            
            history.push('/');
            
        } catch (err) {
            alert('Error on register! Try again later.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo"/>
                    <h1>Register</h1>
                    <p>Do your register and help ONGs with their projetcs.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        I'm already registred.
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="ONG's name"/>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" />
                    <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="Whatsapp number" />
                    <div className="input-group">
                        <input value={city} onChange={e => setCity(e.target.value)}  placeholder="city" />
                        <input value={uf} onChange={e => setUf(e.target.value)} placeholder="UF" style={{width:80}} />
                    </div>
                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}