import { useState, useEffect } from "react";
import { checkUser } from "../redux/apiCalls/authApiCalls";
import {  useDispatch } from "react-redux";
import ImageFull from "../components/ImageFull"
import axios from "axios";
import "../styles/home.css";
const REACT_APP_HOST = process.env.REACT_APP_HOST
const Home = () => {
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [imgPublicacion, setimgPublicacion] = useState("")
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [show, setShow] = useState(false)
  const [showId, setShowId] = useState("");
  const [load, setLoad] = useState(false);
  const [loadDelete, setLoadDelete] = useState(false);
  const obtener = async () => {
    await axios
      .get(REACT_APP_HOST+"/nota/get/image")
      .then((res) => {
        setImages(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const change = (id) => {
    setimgPublicacion(id)
    setShow(!show)
  }
  const uploadImage = async (e) => {
    e.preventDefault();
    setError("");
    setLoad(true);
    if (image) {
      const file = new FormData();
      file.append("image", image);
      await axios
        .post(REACT_APP_HOST+"/nota/upload/image", file)
        .then((res) => {
          setLoad(false);
          console.log(res.data);
          setImage();
          setError("");
          document.getElementById("form-image").reset();
          obtener();
        })
        .catch((error) => {
          console.log(error.message);
          setLoad(false);
        });
    } else {
      setLoad(false);
      setError("Primero debes seleccionar una imagen!");
    }
  };
  const eliminar = async (id, idPublic) => {
    setShowId(id);
    setLoadDelete(true);
    await axios
      .delete(REACT_APP_HOST+"/nota/delete/image/" + id + "/" + idPublic)
      .then((res) => {
        setLoadDelete(false);
        obtener();
      })
      .catch((error) => {
        setLoadDelete(false);
        console.log(error);
      });
  };
  useEffect(() => {
    obtener();
  }, []);
  useEffect(() => {
    checkUser(dispatch);
  }, []);
  return (
    <div className="home">
      {error ? <small>{error}</small> : null}
      <form id="form-image" className="form">
        <input
          accept="image/png,image/jpeg,image/jpg"
          type="file"
          name="image"
          readOnly={load?"true":""}
          disabled={load?"true":""}
          onChange={(e) => setImage(e.target.files[0])}
          className="form-control"
          id="formFile"
        />

        {!load ? (
          <button
            className="btn btn-success enviar-image"
            onClick={uploadImage}
          >
            Publicar
          </button>
        ) : (
          <div className="load"></div>
        )}
      </form>
      <div className="images-grid">
        {images?.map((i) => {
          return (
            <div className="grid-inter-images">
              <button id="btn-a" onClick={()=>change(i.imgPublicacion)}><img src={i.imgPublicacion} alt="Imagen" className="img" /></button>
              {show?<ImageFull img={imgPublicacion} close={change} />: null}
              {loadDelete && i._id === showId ? (
                <div className="load load-button-image"></div>
              ) : (
                <button
                  onClick={() => eliminar(i._id, i.idPublic)}
                  className="btn   button btn-danger"
                >
                  Eliminar
                </button>
              )}
            </div>
          );
        })}
        </div>
    </div>
  );
};

export default Home;
