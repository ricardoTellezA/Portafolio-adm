import { useState } from "react";
import {
  Button,
  Card,
  Form,
  FormLayout,
  Page,
  TextField,
} from "@shopify/polaris";
import { Register as InterfaceRegister } from "../../../interfaces/Register";
import "./Register.css";
import { CREATE_USER } from "../../../gql/gql";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import Snipper from "../../Snipper/Snipper";

const Register = () => {
  const [register, setRegister] = useState<InterfaceRegister>({
    email: "",
    password: "",
    name: "",
    username: "",
  });

  const [createUser, { loading }] = useMutation(CREATE_USER);

  const handleChange = (name: string, value: string) => {
    setRegister({ ...register, [name]: value });
  };

  const handleSendUser = async () => {
    if (
      !register.email ||
      !register.password ||
      !register.name ||
      !register.username
    ) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      await createUser({
        variables: {
          input: {
            username: register.username,
            email: register.email,
            name: register.name,
            password: register.password,
          },
        },
      });
      toast.success("Usuario creado correctamente");
    } catch (err) {
      toast.error(
        "Hubo un error al crear el usuario, es posible que el usuario ya exista"
      );
    }
  };
  return (
    <>
      <div className="container">
        <Page>
          <Card title="Registrarse">
            <Card.Section>
              <Form onSubmit={handleSendUser}>
                <FormLayout.Group>
                  <TextField
                    label="username"
                    placeholder="Username"
                    type="text"
                    autoComplete="off"
                    value={register.username}
                    onChange={(e) => handleChange("username", e)}
                  />
                  <TextField
                    label="Nombre completo"
                    placeholder="Nombre"
                    type="text"
                    autoComplete="off"
                    value={register.name}
                    onChange={(e) => handleChange("name", e)}
                  />
                </FormLayout.Group>

                <FormLayout.Group>
                  <TextField
                    autoComplete="off"
                    placeholder="Email"
                    value={register.email}
                    label="Email"
                    type="email"
                    onChange={(e) => handleChange("email", e)}
                  />
                  <TextField
                    autoComplete="off"
                    label="Password"
                    placeholder="Password"
                    type="password"
                    value={register.password}
                    onChange={(e) => handleChange("password", e)}
                  />
                </FormLayout.Group>

                <FormLayout.Group>
                  {loading ? (
                    <Snipper />
                  ) : (
                    <Button submit fullWidth>
                      Registrarse
                    </Button>
                  )}
                </FormLayout.Group>
              </Form>
            </Card.Section>
          </Card>
        </Page>
      </div>
    </>
  );
};

export default Register;
