import { Link } from 'react-router-dom'
import styles from './InterRegister.module.css'

function InterRegister() {

    return (
        <div className={styles.registration}>
            <div className={styles.registration_option}>
                <Link to='/client/register'>
                    <h2>Cadastro Pessoa Física</h2>
                    <p>(Comprador)</p>
                </Link>
            </div>
            <div className={styles.registration_option}>
                <Link to='/store/register'>
                    <h2>Cadastro Lojista</h2>
                    <p>(Vendedor)</p>
                </Link>
            </div>
        </div >
    );
}

export default InterRegister
