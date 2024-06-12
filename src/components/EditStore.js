import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './AddVehicle.css';
import { Link, useParams } from 'react-router-dom';

const EditStore = () => {
    const { id } = useParams();
    const [token] = useState(localStorage.getItem('token') || '');
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {}
    });

    useEffect(() => {
        const fetchStoreData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/store/${id}`);

                setValue('name', response.data.store.name);
                //setValue('password', response.data.store.password)
                setValue('phone', response.data.store.phone);
                setValue('street', response.data.store.street);
                setValue('number', response.data.store.number);
                setValue('neighborhood', response.data.store.neighborhood);
                setValue('city', response.data.store.city);
                setValue('state', response.data.store.state);
                setValue('images', response.data.store.image1[0]);
            } catch (error) {
                console.error('Error fetching store data:', error);
            }
        };

        fetchStoreData();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('password', data.password);
        formData.append('phone', data.phone);
        formData.append('street', data.street);
        formData.append('number', data.number);
        formData.append('neighborhood', data.neighborhood);
        formData.append('city', data.city);
        formData.append('state', data.state);
        if (data.image1 && data.image1[0]) formData.append('images', data.image1[0]);

        try {
            const response = await axios.put(`http://localhost:5000/store/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${JSON.parse(token)}`
                }
            });
            console.log('Store updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating store:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Editar Loja</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input id="name" {...register('name', { required: true })} />
                    {errors.name && <span>Nome é obrigatório</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <input id="password" {...register('password', { required: true })} />
                    {errors.password && <span>Senha é obrigatório</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Telefone</label>
                    <input id="phone" {...register('phone', { required: true })} />
                    {errors.phone && <span>Telefone é obrigatório</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="street">Rua</label>
                    <input id="street" {...register('street', { required: true })} />
                    {errors.street && <span>Rua é obrigatória</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="number">Nº</label>
                    <input id="number" {...register('number')} />
                    {errors.number && <span>Número é obrigatório</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="neighborhood">Bairro</label>
                    <input id="neighborhood" {...register('neighborhood', { required: true })} />
                    {errors.neighborhood && <span>Bairro é obrigatório</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="city">Cidade</label>
                    <input id="city" {...register('city', { required: true })} />
                    {errors.city && <span>Cidade é obrigatória</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="state">Estado</label>
                    <input id="state" {...register('state', { required: true })} />
                    {errors.state && <span>Estado é obrigatório</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="image1">Imagem 1</label>
                    <input type="file" id="image1" {...register('image1', { required: true })} />
                    {errors.image1 && <span>Imagem 1 é obrigatória</span>}
                </div>
                <button type="submit">Confirmar</button>
                <Link to={`/store/page/${id}`}><button type="button">Voltar</button></Link>
            </form>
        </div>
    );
};

export default EditStore;
