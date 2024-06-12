import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './AddVehicle.css';
import { Link, useParams } from 'react-router-dom';

const EditClient = () => {
    const { id } = useParams();
    const [token] = useState(localStorage.getItem('token') || '');
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {}
    });

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/client/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(token)}`
                    }
                });

                setValue('name', response.data.client.name);
                //setValue('password', response.data.client.password)
                setValue('phone', response.data.client.phone);
            } catch (error) {
                console.error('Error fetching client data:', error);
            }
        };

        fetchClientData();
    }, [id, setValue, token]);

    const onSubmit = async (data) => {
        try {
            const response = await axios.put(`http://localhost:5000/client/${id}`, {
                name: data.name,
                password: data.password,
                phone: data.phone
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(token)}`
                }
            });
            console.log('Client updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating client:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Editar Cliente</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input id="name" {...register('name', { required: true })} />
                    {errors.name && <span>Nome é obrigatório</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <input id="password" {...register('password', { required: true })} />
                    {errors.password && <span>Senha é obrigatória</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Telefone</label>
                    <input id="phone" {...register('phone', { required: true })} />
                    {errors.phone && <span>Telefone é obrigatório</span>}
                </div>
                <button type="submit">Confirmar</button>
                <Link to={`/client/page/${id}`}><button type="button">Voltar</button></Link>
            </form>
        </div>
    );
};

export default EditClient;
