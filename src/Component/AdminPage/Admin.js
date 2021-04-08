import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.jpg';
import manage from '../../images/icons/grid 1.png';
import addProduct from '../../images/icons/plus 1.png';
import deleteIcon from '../../images/icons/trash.png';
import './Admin.css';
import AddProduct from '../AddProduct/AddProduct';

const Admin = () => {
    const [productList, setProductList] = useState([]);
    const [active, setActive] = useState(true);

    useEffect(() => {
        fetch('https://warm-dusk-99296.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProductList(data);
            })
    }, [])

    const deleteProduct = (id) => {
        fetch(`https://warm-dusk-99296.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    const updateList = productList.filter(item => item._id !== id);
                    setProductList(updateList);
                }
            })
    }

    return (
        <Container>
            <div className="row side-nav">
                <div className="col-md-3 d-flex flex-column">
                    <Link to="/home">
                        <img src={logo} alt="logo" className="w-25" />
                    </Link>
                    <Link to="#" onClick={() => setActive(!active)} className="admin-navLink my-2 font-weight-bold">
                        <img src={manage} alt="manage" />
                        Manage Products
                    </Link>
                    <Link to="#" onClick={() => setActive(!active)} className="admin-navLink my-2 font-weight-bold">
                        <img src={addProduct} alt="addProduct" />
                        Add Product
                    </Link>
                </div>
                {
                    active ?
                        <div className="col-md-9">
                            <h5 className="my-4 ml-2 font-weight-bold text-left">Products</h5>
                            <div className="row">
                                <Table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Weight</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            productList.map(
                                                singleList =>
                                                    <tr key={singleList._id}>
                                                        <td>{singleList.name}</td>
                                                        <td>{singleList.weight}</td>
                                                        <td>{singleList.price}</td>
                                                        <td>
                                                            <button onClick={() => deleteProduct(singleList._id)} className="delete-icon rounded">
                                                                <img className="trash-icon" src={deleteIcon} alt="delete" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        :
                        <div className="col-md-9">
                            <h5 className="my-4 ml-2 font-weight-bold text-left">Add Product</h5>
                            <AddProduct />
                        </div>
                }
            </div>
        </Container>
    );
};

export default Admin;