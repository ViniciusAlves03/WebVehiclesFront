import api from './utils/api'
import styles from './Category.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function AllVehicles() {

    const [vehicles, setVehicles] = useState([])

    useEffect(() => {
        api.get('/vehicle/')
            .then((response) => {
                setVehicles(response.data.vehicles)
                console.log(response)
            })
    }, [])

    return (
        <div className={styles.home}>
            <div className={styles.vehicles}>
                <div className={styles.vehicles_list}>
                    {vehicles.map(vehicle => (
                        <Link to={`/vehicle/${vehicle.id}`}>
                            <VehicleCard
                                key={vehicle.id}
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
    );
}

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

export default AllVehicles
