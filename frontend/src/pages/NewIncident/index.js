import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg'
import api from '../../services/api';


import './styles.css';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })

            history.push('/profile');
        } catch(err) {
            alert("An error occurred while trying to register! Try again later.")
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo"/>
                    <h1>Register Incident</h1>
                    <p>Write a full description of the incident to find a hero who can help.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Back to Dashboard.
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Incident's Title" value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea 
                        placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                    <input 
                        placeholder="Amount (R$)" value={value} onChange={e => setValue(e.target.value)} />
                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}