import { Link } from 'react-router-dom'
import { useContext } from 'react'

import styles from './Navbar.module.css'
import Logo from '../../public/logo.jpg'

import { Context } from '../context/UserContext'


function Navbar() {

    const { authenticated, logout } = useContext(Context)

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <Link to={'/'} >
                    <img src={Logo} alt='Web Vehicles' />
                </Link>
                <Link to={'/'} >
                    <h2>Web Vehicles</h2>
                </Link>
            </div>
            <ul>
                {authenticated ? (
                    <>
                        <li className={styles.navbar_button} onClick={logout}><Link>Sair</Link></li>
                    </>
                ) : (
                    <>
                        <li className={styles.navbar_button}>
                            <Link to={'/intermediate_login'}>Entrar</Link>
                        </li>
                        <li className={styles.navbar_button}>
                            <Link to={'/intermediate_register'}>Cadastrar</Link>
                        </li></>
                )}
            </ul>
        </nav>
    )
}

export default Navbar
