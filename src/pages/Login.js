import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";

const Login = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const firebase = useFirebase();
    
    const navigate = useNavigate();
    
    useEffect(() => {
      if (firebase.isLoggedIn) {
        navigate("/");
      }
    }, [firebase.isLoggedIn, navigate])
    

    const login = async (e) => {
        e.preventDefault();
        console.log("Login in user......")
        const result = await firebase.loginUserWithEmailAndPassword(Email, Password);
        console.log(result);
        setEmail("");
        setPassword("");
    }

    const loginWithGoogle = () => {
        firebase.signInWithGoogle();
    }

  return (
    <div className="container mt-5">
      <Form onSubmit={login}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={(e)=>setEmail(e.target.value)} value={Email} type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={(e)=>setPassword(e.target.value)} value={Password} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <h3 className="mt-5 mb-5">or</h3>
      <Button onClick={loginWithGoogle} variant="danger">Sign In With Google</Button>
    </div>
  );
};

export default Login;
