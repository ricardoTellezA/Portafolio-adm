import { useState } from "react";
import "./ProjectsCard.css";
import ProyectCardForm from "./ProyectCardForm";

interface ProjectsCardProps {
  title: string;
  description: string;
  url: string;
}

const ProjectsCard = () => {
  const [imagen, setImagen] = useState<string>("");

  const [proyectInformation, setProyectInformation] =
    useState<ProjectsCardProps>({
      title: "",
      description: "",
      url: "",
    });

  const [technologies, setTechnologies] = useState([]);

  return (
    <>
      <ProyectCardForm
        proyectInfo={setProyectInformation}
        proyectInformation={proyectInformation}
        setTechnologies={setTechnologies}
        technologies={technologies}
        imagen={imagen}
        setImagen={setImagen}
      />
      <div className="card-container">
        <div className="card-image">
          <img
            src="https://www.uba.ar/internacionales/archivos/TEST.jpg"
            alt=""
          />
        </div>

        <div className="card-content">
          <div className="card-content-title">
            <h2>Titulo</h2>
          </div>
          <div className="card-content-description">
            <p>Descripcion</p>
          </div>
          <div className="card-content-tec">
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsCard;
