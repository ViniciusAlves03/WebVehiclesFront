import React, { useState, useContext } from 'react';
import styles from './Register.module.css';
import { Link } from 'react-router-dom';
import Input from './form/Input'
import { Context } from './context/UserContext';

function ClientRegister() {

    const [user, setUser] = useState({})
    const { register } = useContext(Context)

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        register(user)
    }

    return (
        <section className={styles.container}>
            <h2>Crie sua conta</h2>
            <h4>Já possui a cadastro ? faça <Link to="/client/login">login</Link></h4>
            <form onSubmit={handleSubmit}>
                <Input text="E-mail" type="email" name="email" placeholder="Digite o seu e-mail" handleOnChange={handleChange} />
                <Input text="Nome" type="text" name="name" placeholder="Digite o seu nome" handleOnChange={handleChange} />
                <Input text="Telefone" type="text" name="phone" placeholder="Digite o seu Telefone" handleOnChange={handleChange} />
                <Input text="CPF" type="text" name="cpf" placeholder="Digite o seu CPF" handleOnChange={handleChange} />
                <Input text="Senha" type="password" name="password" placeholder="Digite a senha" handleOnChange={handleChange} />
                <input type="submit" value="Cadastrar" />
            </form>
        </section>
    )
}

export default ClientRegister
