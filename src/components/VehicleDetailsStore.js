import api from './utils/api';
import styles from './VehicleDetails.module.css';
import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Context } from './context/UserContext';

const VehicleDetailsStore = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null)
    const [store, setStore] = useState(null)
    const { authenticated } = useContext(Context)

    useEffect(() => {
        api.get(`/vehicle/${id}`)
            .then(response => {
                setVehicle(response.data.vehicle);
                return response.data.vehicle.storeId;
            })
            .then(storeId => {
                if (storeId) {
                    api.get(`/store/${storeId}`)
                        .then(response => {
                            setStore(response.data.store);
                        })
                        .catch(error => {
                            console.error("There was an error fetching the store details!", error);
                        });
                }
            })
            .catch(error => {
                console.error("There was an error fetching the vehicle details!", error);
            });
    }, [id]);

    if (!vehicle) return <p>Loading...</p>;

    const getAttributesToShow = () => {
        switch (vehicle.type) {
            case 'car':
                return [
                    ['Portas', vehicle.numDoors],
                    ['Assentos', vehicle.numSeats]
                ];
            case 'truck':
                return [
                    ['Eixo', vehicle.numAxles],
                    ['Capacidade de Carga', `${vehicle.cargoCapacity} Kg`]
                ];
            case 'motorcycle':
                return [['Partida', vehicle.startSystem]];
            default:
                return [];
        }
    };

    const attributesToShow = getAttributesToShow();

    return (
        <div className={styles.vehicle_detail}>
            <div className={styles.vehicle_images}>
                <img key={1} src={`http://localhost:5000/images/${vehicle.image1}`} alt={`${vehicle.name} ${1}`} className={styles.vehicle_image} />
                <img key={2} src={`http://localhost:5000/images/${vehicle.image2}`} alt={`${vehicle.name} ${2}`} className={styles.vehicle_image} />
                <img key={3} src={`http://localhost:5000/images/${vehicle.image1}`} alt={`${vehicle.name} ${3}`} className={styles.vehicle_image} />
            </div>
            <div>
                <h1 className={styles.vehicle_name}>{vehicle.name}</h1>
                {authenticated && (
                    <div className={styles.buttons}>
                        <Link to={`/edit/${id}`} className={styles.edit_button}>Editar</Link>
                        <Link to={`/delete/${id}`} className={styles.delete_button}>Excluir</Link>
                    </div>
                )}
            </div>
            <div className={styles.vehicle_info}>
                <p><strong>Preço:</strong> R$ {vehicle.price}</p>
                <p><strong>Cor:</strong> {vehicle.color}</p>
                <p><strong>Motor:</strong> {vehicle.engine}</p>
                <p><strong>Quilômetros:</strong> {`${vehicle.km} KM`}</p>
                <p><strong>Freios:</strong> {vehicle.brakes}</p>
                <p><strong>Transmissão:</strong> {vehicle.transmission}</p>
                <p><strong>Marca:</strong> {vehicle.brand}</p>
                <p><strong>Ano:</strong> {vehicle.year}</p>
                {attributesToShow.map(([label, value], index) => (
                    <p key={index}><strong>{label}:</strong> {value}</p>
                ))}
                {store && (
                    <div>
                        <p><strong>Nome:</strong> <Link to={`/store/${vehicle.storeId}`}>{store.name}</Link></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VehicleDetailsStore;
