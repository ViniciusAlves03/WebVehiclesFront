import { Link } from 'react-router-dom'
import styles from './InterRegister.module.css'

function InterLogin() {

    return (
        <div className={styles.registration}>
            <div className={styles.registration_option}>
                <Link to='/client/login'>
                    <h2>Login Pessoa Física</h2>
                    <p>(Comprador)</p>
                </Link>
            </div>
            <div className={styles.registration_option}>
                <Link to='/store/login'>
                    <h2>Login Lojista</h2>
                    <p>(Vendedor)</p>
                </Link>
            </div>
        </div >
    );
}

export default InterLogin
