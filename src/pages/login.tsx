import { NextPage } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLock } from '@fortawesome/free-solid-svg-icons';
import {
  Button, Col, Container, Form, InputGroup, Row,
} from 'react-bootstrap';
import Link from 'next/link';
import { SyntheticEvent, useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
import { useRouter } from 'next/navigation';
import axios from 'axios';


const Login: NextPage = () => {
  const router = useRouter();
  // const navigator = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   // console.log("useEffect triggered, isLoggedIn:", isLoggedIn);
  //   if (isLoggedIn && router.pathname !== '/') {
  //     // console.log("Redirecting to home page...");
  //     router.push('/');
  //   }
  
  //   return () => console.log("Cleanup called");
  // }, [isLoggedIn, router]);



  const login = async (e: SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);
   

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const telephone = formData.get('telephone') as string;
    const password = formData.get('password') as string;

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/login/', { telephone, password }, { withCredentials: true });
      if (res.status === 200) {
        localStorage.setItem('isLoggedIn', 'true');
        router.push("/");
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      <Container>
        <Row className="justify-content-center align-items-center px-3">
          <Col lg={8}>
            <Row>
              <Col md={7} className="bg-white border p-5">
                <div className="">
                  <h1>Login</h1>
                  <p className="text-black-50">Sign In to your account</p>

                  {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                  <form onSubmit={login}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faPhone} fixedWidth />
                      </InputGroup.Text>
                      <Form.Control
                        name="telephone"
                        required
                        disabled={submitting}
                        placeholder="Telephone"
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faLock} fixedWidth />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        name="password"
                        required
                        disabled={submitting}
                        placeholder="Password"
                      />
                    </InputGroup>

                    <Row>
                      <Col xs={6}>
                        <Button className="px-4" variant="primary" type="submit" disabled={submitting}>Login</Button>
                      </Col>
                      <Col xs={6} className="text-end">
                        <Button className="px-0" variant="link" type="submit">
                          Forgot password?
                        </Button>
                      </Col>
                    </Row>
                  </form>
                </div>
              </Col>
              <Col
                md={5}
                className="bg-primary text-white d-flex align-items-center justify-content-center p-5"
              >
                <div className="text-center">
                  <h2>Sign up</h2>
                  <p>
                    Bienvenue à FuelGes, la première solution informatique en Mauritanie pour la gestion des stations de carburant. Gérez efficacement vos pompistes, stocks de cuves, et ventes avec nos outils avancés. Profitez de statistiques détaillées pour optimiser vos revenus.
                  </p>
                  <Link href="/register">
                    <button className="btn btn-lg btn-outline-light mt-3" type="button">
                      Register Now!
                    </button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
