import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './AddVehicle.css';
import { Link, useParams } from 'react-router-dom';

const AddVehicleForm = () => {
    const { id, type } = useParams();
    const [token] = useState(localStorage.getItem('token') || '');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('engine', data.engine);
        formData.append('type', data.type);
        formData.append('plate', data.plate);
        formData.append('chassis', data.chassis);
        formData.append('color', data.color);
        formData.append('brand', data.brand);
        formData.append('year', data.year);
        formData.append('km', data.km);
        formData.append('brakes', data.brakes);
        formData.append('price', data.price);
        formData.append('transmission', data.transmission);
        formData.append('image1', data.image1[0]);
        formData.append('image2', data.image2[0]);
        formData.append('image3', data.image3[0]);

        if (type === 'motorcycle') {
            formData.append('startingSystem', data.startingSystem);
        } else if (type === 'car') {
            formData.append('numSeats', data.numSeats);
            formData.append('numDoors', data.numDoors);
        } else if (type === 'truck') {
            formData.append('cargoCapacity', data.cargoCapacity);
            formData.append('numAxles', data.numAxles);
        }

        try {
            const response = await axios.post(`http://localhost:5000/vehicle/${type}/store/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${JSON.parse(token)}`
                }
            });
            console.log('Vehicle registered successfully:', response.data);
        } catch (error) {
            console.error('Error registering vehicle:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Cadastro de Veículo</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="engine">Motor</label>
                    <input id="engine" {...register('engine', { required: true })} />
                    {errors.engine && <span>Motor é obrigatório</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input id="name" {...register('name', { required: true })} />
                    {errors.name && <span>Nome é obrigatório</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="transmission">Transmissão</label>
                    <input id="transmission" {...register('transmission', { required: true })} />
                    {errors.transmission && <span>Transmissão é obrigatória</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="type">Tipo</label>
                    <input id="type" {...register('type', { required: true })} />
                    {errors.type && <span>Tipo é obrigatório</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="color">Cor</label>
                    <input id="color" {...register('color', { required: true })} />
                    {errors.color && <span>Cor é obrigatória</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="plate">Placa</label>
                    <input id="plate" {...register('plate')} />
                </div>
                <div className="form-group">
                    <label htmlFor="brand">Marca</label>
                    <input id="brand" {...register('brand', { required: true })} />
                    {errors.brand && <span>Marca é obrigatória</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="year">Ano</label>
                    <input id="year" {...register('year', { required: true })} />
                    {errors.year && <span>Ano é obrigatório</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="chassis">Chassi</label>
                    <input id="chassis" {...register('chassis', { required: true })} />
                    {errors.chassis && <span>Chassi é obrigatório</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="km">Quilometragem</label>
                    <input id="km" {...register('km', { required: true })} />
                    {errors.km && <span>Quilometragem é obrigatória</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="brakes">Freios</label>
                    <input id="brakes" {...register('brakes')} />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Preço</label>
                    <input id="price" {...register('price', { required: true })} />
                    {errors.price && <span>Preço é obrigatório</span>}
                </div>
                {type === 'motorcycle' && (
                    <div className="form-group">
                        <label htmlFor="startingSystem">Sistema de partida</label>
                        <input id="startingSystem" {...register('startingSystem')} />
                    </div>
                )}
                {type === 'car' && (
                    <>
                        <div className="form-group">
                            <label htmlFor="numSeats">Quantidade de assentos</label>
                            <input id="numSeats" {...register('numSeats')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="numDoors">Quantidade de portas</label>
                            <input id="numDoors" {...register('numDoors')} />
                        </div>
                    </>
                )}
                {type === 'truck' && (
                    <>
                        <div className="form-group">
                            <label htmlFor="cargoCapacity">Capacidade de Carga</label>
                            <input id="cargoCapacity" {...register('cargoCapacity')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="numAxles">Eixos</label>
                            <input id="numAxles" {...register('numAxles')} />
                        </div>
                    </>
                )}
                <div className="form-group">
                    <label htmlFor="image1">Imagem 1</label>
                    <input type="file" id="image1" {...register('image1', { required: true })} />
                    {errors.image1 && <span>Imagem 1 é obrigatória</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="image2">Imagem 2</label>
                    <input type="file" id="image2" {...register('image2', { required: true })} />
                    {errors.image2 && <span>Imagem 2 é obrigatória</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="image3">Imagem 3</label>
                    <input type="file" id="image3" {...register('image3', { required: true })} />
                    {errors.image3 && <span>Imagem 3 é obrigatória</span>}
                </div>
                <Link to={`/store/page/${id}`}><button type="submit">Confirmar</button></Link>
            </form>
        </div>
    );
};

export default AddVehicleForm;
