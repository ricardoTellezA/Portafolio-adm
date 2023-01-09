import { useState, useEffect } from "react";
import useToken from "../../context/useToken";
import { useMutation, useQuery } from "@apollo/client";
import {
  Page,
  Card,
  TextField,
  FormLayout,
  Form,
  Frame,
  ContextualSaveBar,
} from "@shopify/polaris";
import "./FormUser.css";
import uploadImages from "../../functions/UpdateImages";
import { User } from "../../interfaces/Register";
import Tecnolgies from "./Tecnolgies";
import ImagenComponent from "../UploadImageComponent/ImagenComponent";
import { toast } from "react-toastify";
import Snipper from "../Snipper/Snipper";
import { UPDATE_USER, GET_USER } from "../../gql/gql";
import { removeToken } from "../../functions/SendToken";
import ProjectsCard from "../ProjectsCard/ProjectsCard";

const FormUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User>({
    name: "",
    presentation: "",
    profession: "",
    about: "",
  });
  const [addTecnology, setAddTecnology] = useState<string[]>([]);
  const auth: any = useToken();

  const { data, loading: loadingUser } = useQuery(GET_USER, {
    variables: {
      username: auth.auth.username,
    },
  });

  const [editUser] = useMutation(UPDATE_USER);

  const [showBar, setShowBar] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  const toggleUpdateImage = async (files: any) => {
    setLoading(true);
    const file = await uploadImages(files);
    if (file) {
      setAddTecnology([...addTecnology, file]);
    }
    setLoading(false);
    setShowBar(true);
  };

  const handleChange = async (value: string, name: string) => {
    setUserInfo({ ...userInfo, [name]: value });
    setShowBar(true);
  };

  const handleUpdatePrincipalImage = async (files: any) => {
    const file = await uploadImages(files);
    if (file) {
      setImage(file);
    }
  };

  const handleForm = async () => {
    try {
      editUser({
        variables: {
          input: {
            username: auth.auth.username,
            name: userInfo.name,
            presentation: userInfo.presentation,
            description: userInfo.about,
            profession: userInfo.profession,
            image: image,
            skills: addTecnology,
          },
        },
      });

      setShowBar(false);
      toast.success("Usuario actualizado correctamente");
    } catch (error) {
      console.log(error);
      toast.error("Hubo un error al actualizar el usuario");
    }
  };

  const clearDates = () => {
    setUserInfo({
      name: "",
      presentation: "",
      profession: "",
      about: "",
    });
    setAddTecnology([]);
    setImage("");
    setShowBar(false);
  };

  useEffect(() => {
    if (data) {
      const { obtenerUsuario } = data;

      setUserInfo({
        name: obtenerUsuario.name,
        presentation: obtenerUsuario.presentation,
        profession: obtenerUsuario.profession,
        about: obtenerUsuario.description,
      });

      setImage(obtenerUsuario.image);
      setAddTecnology(obtenerUsuario.skills);
    }
  }, [data]);


  return (
    <>
      {showBar && (
        <div style={{ height: "250px" }}>
          <Frame
            logo={{
              width: 124,
            }}
          >
            <ContextualSaveBar
              message="Guarda tus cambios"
              saveAction={{
                onAction: handleForm,
                content: "Guardar",
                loading: false,
                disabled: false,
              }}
              discardAction={{
                content: "Descartar",
                onAction: clearDates,
              }}
            />
          </Frame>
        </div>
      )}
      <Page title="Edita tu portafolio" primaryAction={{
        content: "Cerrar Sesión",
        onAction: removeToken,
        primary: false
      }}>
        <Card sectioned>
          <Form onSubmit={handleForm}>
            <Card.Section>
              <FormLayout.Group>
                <TextField
                  label="Nombre Completo"
                  placeholder="Nombre Completo"
                  value={userInfo.name}
                  autoComplete="off"
                  onChange={(value) => handleChange(value, "name")}
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  label="Presentación"
                  placeholder="Presentación"
                  value={userInfo.presentation || ""}
                  autoComplete="off"
                  onChange={(value) => handleChange(value, "presentation")}
                />

                <TextField
                  label="Profesión"
                  placeholder="Profesión"
                  value={userInfo.profession || ""}
                  autoComplete="off"
                  onChange={(value) => handleChange(value, "profession")}
                />
              </FormLayout.Group>

              <FormLayout.Group>
                <TextField
                  label="Sobre mi"
                  placeholder="Sobre mi"
                  value={userInfo.about || ""}
                  autoComplete="off"
                  multiline={4}
                  onChange={(value) => handleChange(value, "about")}
                />
              </FormLayout.Group>

              <ImagenComponent
                onChange={handleUpdatePrincipalImage}
                title="Sube tu foto de presentación"
              />

              {
                <div className="image">
                  {loading ? <Snipper /> : <img src={image} />}
                </div>
              }

              <FormLayout.Group>
                <Tecnolgies files={addTecnology} />
              </FormLayout.Group>

              <ImagenComponent
                onChange={toggleUpdateImage}
                title="Sube tus Skills"
              />
            </Card.Section>
          </Form>
        </Card>

        <Card sectioned>
          <ProjectsCard />
        </Card>
      </Page>
    </>
  );
};

export default FormUser;
