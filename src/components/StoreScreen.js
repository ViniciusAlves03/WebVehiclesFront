import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../components/utils/api';
import styles from './StoreScreen.module.css';

const StoreScreen = () => {
    const { id } = useParams();
    const [store, setStore] = useState(null);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        api.get(`/store/${id}`)
            .then(response => setStore(response.data.store))
            .catch(error => console.error("Error fetching store details:", error));

        api.get(`/vehicle/store/${id}`)
            .then(response => setVehicles(response.data.vehicles))
            .catch(error => console.error("Error fetching vehicles:", error));
    }, [id]);

    if (!store) return <p>Loading...</p>;

    return (
        <div className={styles.container}>
            <div className={styles.container_store}>
                <div className={styles.store_info}>
                    <img src={`http://localhost:5000/images/${store.image1}`} alt={store.name} className={styles.store_logo} />
                    <div className={styles.store_details}>
                        <h1>{store.name}</h1>
                        <p>Contato: {store.phone}</p>
                        <p>Endereço: {`${store.street}, ${store.number}, ${store.city} - ${store.state} `}</p>
                    </div>
                </div>
            </div>
            <div className={styles.container_vehicles}>
                <div className={styles.vehicles}>
                    <div className={styles.vehicles_list}>
                        {vehicles.map(vehicle => (
                            <Link to={`/vehicle/${vehicle.id}`} key={vehicle.id}>
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

export default StoreScreen;
