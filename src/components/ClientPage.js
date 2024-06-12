import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, Navigate, redirect } from 'react-router-dom';
import api from '../components/utils/api';
import styles from './StoreScreen.module.css';
import { Context } from './context/UserContext';

const ClientPage = () => {
    const { id } = useParams();
    const [client, setClient] = useState([]);
    const { authenticated, logout } = useContext(Context)
    const [token] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        api.get(`/client/${id}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`
            }
        })
            .then(response => setClient(response.data.client))
            .catch(error => console.error("Error fetching store details:", error));
    }, [id]);

    const handleDelete = async () => {
        try {
            await api.delete(`/client/${id}`, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(token)}`
                }
            });

            logout()
        } catch (error) {
            console.error("Error deleting client:", error);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.container_store}>
                <div className={styles.store_info}>
                    <div className={styles.store_details}>
                        <h1>{client.name}</h1>
                        <p>Contato: {client.phone}</p>
                        {authenticated && (
                            <div className={styles.buttons}>
                                <Link to={`/client/edit/${id}`} className={styles.edit_button}>Editar</Link>
                                <Link to={`/`} className={styles.delete_button} onClick={handleDelete}>Excluir</Link>
                                <Link to={`/`} className={styles.initial_button}>Tela inicial</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientPage;
