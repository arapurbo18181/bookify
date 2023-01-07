import React, { useState } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';

const ListingPage = () => {

  const firebase = useFirebase();
  const [Name, setName] = useState("");
  const [IsbnNumber, setIsbnNumber] = useState("");
  const [Price, setPrice] = useState();
  const [CoverPic, setCoverPic] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.handleCreateNewListing(Name, IsbnNumber, Price, CoverPic);
    setName("");
    setIsbnNumber("");
    setPrice("");
    setCoverPic(null);
  }

  return (
    <div className="container mt-5">
      { firebase.isLoggedIn ? <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Book Name</Form.Label>
          <Form.Control onChange={(e)=>setName(e.target.value)} value={Name} type="text" placeholder="Enter Book Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ISBN</Form.Label>
          <Form.Control onChange={(e)=>setIsbnNumber(e.target.value)} value={IsbnNumber} type="number" placeholder="Enter ISBN Number" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control onChange={(e)=>setPrice(e.target.value)} value={Price} type="number" placeholder="Enter Price" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cover Pic</Form.Label>
          <Form.Control onChange={(e)=>setCoverPic(e.target.files[0])} type="file" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form> : <Navigate to={"/"} /> }
    </div>
  )
}

export default ListingPage