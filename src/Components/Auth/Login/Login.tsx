import { useState } from "react";
import {
  Page,
  Card,
  Form,
  Button,
  FormLayout,
  TextField,
} from "@shopify/polaris";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../../gql/gql";
import { Login as LoginInterface } from "../../../interfaces/Register";
import { sendToken } from "../../../functions/SendToken";
import { toast } from "react-toastify";
import './Login.css'

const Login = ({setGoRegister}: any) => {
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const [userLogin, setUserLogin] = useState<LoginInterface>({
    email: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleSendUser = async () => {
    if (!userLogin.email || !userLogin.password) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      const { data } = await loginUser({
        variables: {
          input: {
            email: userLogin.email,
            password: userLogin.password,
          },
        },
      });

      const { token } = data.loginUser;

      sendToken(token);
      toast.success("Usuario logueado correctamente");

      setTimeout(() => {
        window.location.href = "/user";
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error(
        "Hubo un error al loguear el usuario, revisa los datos ingresados"
      );
    }
  };

  const goRegister = (e: any) => {
    e.preventDefault();
    setGoRegister(true)
  }
  return (
    <div className="container">
      <Page>
        <Card title="Login">
          <Card.Section>
            <Form onSubmit={handleSendUser}>
              <FormLayout.Group>
                <TextField
                  label="Correo electrónico"
                  placeholder="Correo electrónico"
                  type="email"
                  autoComplete="off"
                  value={userLogin.email}
                  onChange={(value) => handleChange("email", value)}
                />

                <TextField
                  label="Contraseña"
                  placeholder="Contraseña"
                  type="password"
                  autoComplete="off"
                  value={userLogin.password}
                  onChange={(value) => handleChange("password", value)}
                />
              </FormLayout.Group>
              <div className="register-container">
              <a href="" onClick={(e) => goRegister(e)} className="register">Registrarse</a>
                
              </div>
              <FormLayout.Group>
                
                <Button submit fullWidth>
                  Entrar
                </Button>
              </FormLayout.Group>
            </Form>
          </Card.Section>
        </Card>
      </Page>
    </div>
  );
};

export default Login;
