import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, Navigate, redirect } from 'react-router-dom';
import api from '../components/utils/api';
import styles from './StoreScreen.module.css';
import { Context } from './context/UserContext';

const StorePage = () => {
    const { id } = useParams();
    const [store, setStore] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const { authenticated, logout } = useContext(Context)
    const [token] = useState(localStorage.getItem('token'));

    useEffect(() => {
        api.get(`/store/${id}`)
            .then(response => setStore(response.data.store))
            .catch(error => console.error("Error fetching store details:", error));

        api.get(`/vehicle/store/${id}`)
            .then(response => setVehicles(response.data.vehicles))
            .catch(error => console.error("Error fetching vehicles:", error));
    }, [id]);

    if (!store) return <p>Loading...</p>;

    const handleDelete = async () => {
        try {
            await api.delete(`/store/${id}`, {
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
                    <img src={`http://localhost:5000/images/${store.image1}`} alt={store.name} className={styles.store_logo} />
                    <div className={styles.store_details}>
                        <h1>{store.name}</h1>
                        <p>Contato: {store.phone}</p>
                        <p>Endereço: {`${store.street}, ${store.number}, ${store.city} - ${store.state} `}</p>
                        {authenticated && (
                            <div className={styles.buttons}>
                                <Link to={`/store/edit/${id}`} className={styles.edit_button}>Editar</Link>
                                <Link to={`/`} className={styles.delete_button} onClick={handleDelete}>Excluir</Link>
                                <Link to={`/`} className={styles.initial_button}>Tela inicial</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.container_vehicles}>
                <div className={styles.vehicles}>
                    <div className={styles.buttons}>
                        <Link to={`/vehicle/car/store/${store.id}`} className={styles.delete_button}>+ adicionar carro</Link>
                        <Link to={`/vehicle/truck/store/${store.id}`} className={styles.delete_button}>+ adicionar caminhão</Link>
                        <Link to={`/vehicle/motorcycle/store/${store.id}`} className={styles.delete_button}>+ adicionar moto</Link>
                    </div>
                    <div className={styles.vehicles_list}>
                        {vehicles.map(vehicle => (
                            <Link to={`/myvehicle/${vehicle.id}`} key={vehicle.id}>
                                <VehicleCard
                                    name={vehicle.name}
                                    brand={vehicle.brand}
                                    price={vehicle.price}
                                    year={vehicle.year}
                                    image={vehicle.image1}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const VehicleCard = ({ name, price, year, image, brand }) => (
    <div className={styles.vehicle_card}>
        <img src={`http://localhost:5000/images/${image}`} alt={name} />
        <div className={styles.vehicle_info}>
            <h3>{name}</h3>
            <p>{brand}</p>
            <p>{`R$ ${price}`}</p>
            <p>{year}</p>
        </div>
    </div>
);

export default StorePage;
