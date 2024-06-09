import React, { useState, useContext } from 'react';
import styles from './Register.module.css';
import { Link } from 'react-router-dom';
import Input from './form/Input'
import { Context } from './context/UserContext';

function ClientRegister() {

    const [user, setUser] = useState({})
    const { registerStore } = useContext(Context)

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        registerStore(user)
    }

    return (
        <section className={styles.container}>
            <h2>Crie sua conta</h2>
            <h4>Já possui a cadastro ? faça <Link to="/store/login">login</Link></h4>
            <form onSubmit={handleSubmit}>
                <Input text="E-mail" type="email" name="email" placeholder="Digite o seu e-mail" handleOnChange={handleChange} />
                <Input text="Nome" type="text" name="name" placeholder="Digite o seu nome" handleOnChange={handleChange} />
                <Input text="Telefone" type="text" name="phone" placeholder="Digite o seu Telefone" handleOnChange={handleChange} />
                <Input text="CNPJ" type="text" name="cnpj" placeholder="Digite o seu CNPJ" handleOnChange={handleChange} />
                <Input text="Senha" type="password" name="password" placeholder="Digite a senha" handleOnChange={handleChange} />
                <Input text="Rua" type="text" name="street" placeholder="Informe a rua" handleOnChange={handleChange} />
                <Input text="Nº" type="text" name="number" placeholder="Informe o número" handleOnChange={handleChange} />
                <Input text="Bairro" type="text" name="neighborhood" placeholder="Informe o bairro" handleOnChange={handleChange} />
                <Input text="Cidade" type="text" name="city" placeholder="Informe a cidade" handleOnChange={handleChange} />
                <Input text="Estado" type="text" name="state" placeholder="Informe o estado" handleOnChange={handleChange} />
                <input type="submit" value="Cadastrar" />
            </form>
            <p>Já tem conta ? <Link to='/client/login'>Clique aqui</Link></p>
        </section>
    )
}

export default ClientRegister
