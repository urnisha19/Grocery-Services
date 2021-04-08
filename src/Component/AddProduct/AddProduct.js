import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import './AddProduct.css';

const AddProduct = () => {
    const { register, handleSubmit } = useForm();
    const [imageURL, setIMageURL] = useState(null);

    const onSubmit = data => {
        const productData = {
            name: data.value_name,
            weight: data.value_weight,
            price: data.value_price,
            imageURL: imageURL
        };
        const url = `https://warm-dusk-99296.herokuapp.com/addProduct`;

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
            .then(res => console.log('server side response', res))
    };

    const handleImageUpload = product => {
        console.log(product.target.files[0])
        const imageData = new FormData();
        imageData.set('key', 'e42c992b0cd0b74ccee4110ad7eefc6d');
        imageData.append('image', product.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(response => {
                setIMageURL(response.data.data.display_url);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="add-Product">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Product Name: <input required name="name" defaultValue="New Product" {...register('value_name')} /></label>
                <br />
                <label>Weight: <input required name="weight" defaultValue="0.00" {...register('value_weight')} /></label>
                <br />
                <label>Price: $<input required name="price" defaultValue="0.00" {...register('value_price')} /></label>
                <br />
                <label>Product Image: <input name="exampleRequired" type="file" onChange={handleImageUpload} /></label>
                <br />
                <input type="submit" className="submit-btn" />
            </form>
        </div>
    );
};

export default AddProduct;