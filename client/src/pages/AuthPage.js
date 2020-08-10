import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';
import {
  Container, Row, Col, Jumbotron, Button,
  Form, FormGroup, Label, Input
} from 'reactstrap';

const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, error, request, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Jumbotron className="mt-5">
            <h1 className="display-5">Authorization</h1>
            <Form>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="email" className="mr-sm-2">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="test@mail.ru"
                  value={form.email}
                  onChange={changeHandler}
                />
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="password" className="mr-sm-2">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  value={form.password}
                  onChange={changeHandler}                
                />
              </FormGroup>
            </Form>
            <hr className="my-3" />
            <p className="lead">
              <Button
                color="primary"
                className="mr-1"
                disabled={loading}
                onClick={loginHandler}
              >Login</Button>
              <Button
                color="secondary"
                disabled={loading}
                onClick={registerHandler}              
              >Sign up</Button>
            </p>
          </Jumbotron>
          {/* <Toast>
          <ToastHeader>
            Reactstrap
          </ToastHeader>
          <ToastBody>
            This is a toast on a white background — check it out!
          </ToastBody>
        </Toast> */}
        </Col>
      </Row>
    </Container>
  );
}

export default AuthPage;

