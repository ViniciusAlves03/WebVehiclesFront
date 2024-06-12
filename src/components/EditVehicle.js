import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './AddVehicle.css';
import { Link, useParams } from 'react-router-dom';

const EditVehicle = () => {

  const { id, type, storeId } = useParams();
  const [token] = useState(localStorage.getItem('token') || '');
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {}
  });

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/vehicle/${id}`);

        setValue('name', response.data.vehicle.name);
        setValue('engine', response.data.vehicle.engine);
        setValue('plate', response.data.vehicle.plate);
        setValue('color', response.data.vehicle.color);
        setValue('brand', response.data.vehicle.brand);
        setValue('year', response.data.vehicle.year);
        setValue('km', response.data.vehicle.km);
        setValue('brakes', response.data.vehicle.brakes);
        setValue('price', response.data.vehicle.price);
        setValue('transmission', response.data.vehicle.transmission);
        setValue('startingSystem', response.data.vehicle.startingSystem);
        setValue('numSeats', response.data.vehicle.numSeats);
        setValue('numDoors', response.data.vehicle.numDoors);
        setValue('cargoCapacity', response.data.vehicle.cargoCapacity);
        setValue('numAxles', response.data.vehicle.numAxles);
        setValue('images', response.data.vehicle.image1[0]);
        setValue('images', response.data.vehicle.image2[0]);
        setValue('images', response.data.vehicle.image3[0]);

      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    };

    fetchVehicleData();
  }, [id, setValue]);


  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('engine', data.engine);
    formData.append('plate', data.plate);
    formData.append('color', data.color);
    formData.append('brand', data.brand);
    formData.append('year', data.year);
    formData.append('km', data.km);
    formData.append('brakes', data.brakes);
    formData.append('price', data.price);
    formData.append('transmission', data.transmission);
    if (data.image1 && data.image1[0]) formData.append('images', data.image1[0]);
    if (data.image2 && data.image2[0]) formData.append('images', data.image2[0]);
    if (data.image3 && data.image3[0]) formData.append('images', data.image3[0]);

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
      const response = await axios.put(`http://localhost:5000/vehicle/${id}/store/${storeId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${JSON.parse(token)}`
        }
      });
      console.log('Vehicle updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Editar Veículo</h2>
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
        <button type="submit">Confirmar</button>
        <Link to={`/store/page/${storeId}`}><button>Voltar</button></Link>
      </form>
    </div>
  );
};

export default EditVehicle;
