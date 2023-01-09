import { useState } from "react";
import {
  Button,
  Card,
  Form,
  FormLayout,
  Tag,
  TextField,
} from "@shopify/polaris";
import ImagenComponent from "../UploadImageComponent/ImagenComponent";
import uploadImages from "../../functions/UpdateImages";
import { PROJECTS } from "../../gql/gql";
import { useMutation } from "@apollo/client";
import useToken from "../../context/useToken";

interface ProyectCardFormProps {
  proyectInfo: any;
  proyectInformation: any;
  setTechnologies: any;
  technologies: any;
  imagen: string;
  setImagen: any;
}

const ProyectCardForm = ({
  proyectInfo,
  proyectInformation,
  setTechnologies,
  technologies,
  imagen,
  setImagen,
}: ProyectCardFormProps) => {
  const [addTechnology, setAddTechnology] = useState<string>("");
  const auth: any = useToken();

  const [addProject, { loading }] = useMutation(PROJECTS);

  const handleSubmit = async () => {
    try {
      await addProject({
        variables: {
          input: {
            name: proyectInformation.name,
            description: proyectInformation.description,
            technologies: technologies,
            image: imagen,
            url: proyectInformation.url,
            username: auth.auth.username,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (name: string, value: string) => {
    switch (name) {
      case "image":
        const file: string = await uploadImages(value);
        setImagen(file);

        break;
    }

    proyectInfo({ ...proyectInformation, [name]: value });
  };

  console.log(imagen);

  const handleAddTechnology = () => {
    setTechnologies([...technologies, addTechnology]);
    setAddTechnology("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Card.Subsection>
        <FormLayout.Group>
          <TextField
            label="Nombre del proyecto"
            value={proyectInformation.name}
            autoComplete="off"
            onChange={(e) => handleChange("name", e)}
          />
        </FormLayout.Group>

        <FormLayout.Group>
          <TextField
            label="Descripción"
            value={proyectInformation.description}
            autoComplete="off"
            multiline={3}
            onChange={(e) => handleChange("description", e)}
          />
        </FormLayout.Group>

        <FormLayout.Group>
          <TextField
            label="URL del proyecto"
            value={proyectInformation.url}
            autoComplete="off"
            onChange={(e) => handleChange("url", e)}
          />
        </FormLayout.Group>

        <FormLayout.Group>
          <TextField
            label="Tecnologías"
            value={addTechnology}
            autoComplete="off"
            onChange={(e) => setAddTechnology(e)}
            align="center"
          />

          <div style={{ marginTop: "1.5rem" }}>
            <Button onClick={() => handleAddTechnology()}>Añadir</Button>
          </div>
        </FormLayout.Group>

        <FormLayout.Group>
          <div>
            {technologies.map((technology: string, index: number) => (
              <Tag key={index} onRemove={() => {}}>
                {technology}
              </Tag>
            ))}
          </div>
        </FormLayout.Group>

        <FormLayout.Group>
          <ImagenComponent
            title="Imagen"
            onChange={(e) => handleChange("image", e)}
          />
        </FormLayout.Group>

        <FormLayout.Group>
          <div
            style={{ width: "100%", textAlign: "center", marginBottom: "1rem" }}
          >
            <Button fullWidth submit>
              Guardar Proyecto
            </Button>
          </div>
        </FormLayout.Group>
      </Card.Subsection>
    </Form>
  );
};

export default ProyectCardForm;
