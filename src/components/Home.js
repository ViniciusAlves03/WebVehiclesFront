import { Link } from 'react-router-dom';
import styles from './Home.module.css';

// Images
import CarImage from '../public/home/car.jpg';
import TruckImage from '../public/home/truck.jpeg';
import MotorcycleImage from '../public/home/motorcycle.jpg';
import civicImage1 from '../public/home/civic.jpeg';
import civicImage2 from '../public/home/civic2.jpeg';
import mt03Image from '../public/home/mt03.jpg';
import fh540Image from '../public/home/volvoFH540.jpg';

function Home() {
    return (
        <div className={styles.home}>
            <div className={styles.categories}>
                <div className={styles.categories_list}>
                    <CategoryCard title="Carros" image={CarImage} url="/vehicle/category/car" />
                    <CategoryCard title="Caminhões" image={TruckImage} url="/vehicle/category/truck" />
                    <CategoryCard title="Motos" image={MotorcycleImage} url="/vehicle/category/motorcycle" />
                </div>
            </div>
            <div className={styles.vehicles}>
                <h2>Veículos</h2>
                <div className={styles.vehicles_list}>
                    <VehicleCard
                        name="Honda Civic"
                        model="2.0 VTI FLEX"
                        price="R$ 200.000"
                        year="2023/2024"
                        location="Campina Grande - PB"
                        image={civicImage1}
                    />
                    <VehicleCard
                        name="Yamaha MT03"
                        model="321cc FLEX"
                        price="R$ 20.000"
                        year="2019/2020"
                        location="Campina Grande - PB"
                        image={mt03Image}
                    />
                    <VehicleCard
                        name="Volvo FH 540"
                        model="6x4 T"
                        price="R$ 610.000"
                        year="2020/2020"
                        location="João Pessoa - PB"
                        image={fh540Image}
                    />
                    <VehicleCard
                        name="Honda Civic"
                        model="2.0 VTI FLEX"
                        price="R$ 80.000"
                        year="2014/2014"
                        location="Recife - PE"
                        image={civicImage2}
                    />
                </div>
                <div className={styles.see_more_container}>
                    <button className={styles.see_more}>
                        <Link to="/vehicle/">Ver mais</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

const CategoryCard = ({ title, image, url }) => (
    <div className={styles.category_card}>
        <a href={url}><img src={image} alt={title} /></a>
        <h3>{title}</h3>
    </div>
);

const VehicleCard = ({ name, model, price, year, location, image }) => (
    <div className={styles.vehicle_card}>
        <img src={image} alt={name} />
        <div className={styles.vehicle_info}>
            <h3>{name}</h3>
            <p>{model}</p>
            <p>{price}</p>
            <p>{year}</p>
            <p>{location}</p>
        </div>
    </div>
);

export default Home;

