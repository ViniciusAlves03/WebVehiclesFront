import React, { useState, useContext } from 'react';
import styles from './Register.module.css';
import { Link } from 'react-router-dom';
import Input from './form/Input'
import { Context } from './context/UserContext';

const ClientLogin = () => {

    const [user, setUser] = useState({})
    const { login } = useContext(Context)

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        login(user)
    }

    return (
        <section className={styles.container}>
            <h2>Bem-Vindo</h2>
            <h4>Faça login e aproveite nosso site!</h4>
            <form onSubmit={handleSubmit}>
                <Input text="E-mail" type="email" name="email" placeholder="Digite o seu e-mail"
                    handleOnChange={handleChange} />
                <Input text="Senha" type="password" name="password" placeholder="Digite sua senha"
                    handleOnChange={handleChange} />
                <input type="submit" value="Entrar" />
            </form>
            <p>
            Não possui cadastro ? cadastre-se <Link to="/intermediate_register">aqui</Link>
            </p>
        </section>
    )
};

export default ClientLogin;
