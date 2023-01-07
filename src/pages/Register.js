import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";

const Register = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const firebase = useFirebase();
    
    const navigate = useNavigate();
    
    useEffect(() => {
      if (firebase.isLoggedIn) {
        navigate("/");
      }
    }, [firebase.isLoggedIn])

    const signUp = async (e) => {
        e.preventDefault();
        console.log("signing in user......")
        const result = await firebase.signupUserWithEmailAndPassword(Email, Password);
        console.log(result);
        setEmail("");
        setPassword("");
    }

  return (
    <div className="container mt-5">
      <Form onSubmit={signUp}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={(e)=>setEmail(e.target.value)} value={Email} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={(e)=>setPassword(e.target.value)} value={Password} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
