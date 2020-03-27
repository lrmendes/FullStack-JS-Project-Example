import React, { useState, useEffect } from 'react';
import './styles.css'
import { FiTrash2} from 'react-icons/fi';
import { FiPower } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg'

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId] );

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id != id));
        } catch (err) {
            alert('An error occurred while trying to delete.')

        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg}/>
                <span>Welcome, {ongName}!</span>

                <Link className="button" to="/incidents/new">Register a new incident.</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>
            <h1>Registred Incidents</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Incident:</strong>
                        <p>{incident.title}</p>

                        <strong>Description:</strong>
                        <p>{incident.description}</p>

                        <strong>Value:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}