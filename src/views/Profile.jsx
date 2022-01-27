import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkUser } from "../redux/apiCalls/authApiCalls";
import "../styles/profile.css";
import "../styles/home.css";
import axios from "axios";
import ImageFull from "../components/ImageFull";
const REACT_APP_HOST = process.env.REACT_APP_HOST;
const REACT_APP_CLOUD = process.env.REACT_APP_CLOUD;

const Profile = () => {
  const dispatch = useDispatch();
  const [viewFullImage, setViewFullImage] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const [image, setImage] = useState("");
  const [load, setLoad] = useState(false);
  const [des, setDes] = useState(currentUser.des);
  const [loadUpdateUser, setLoadUpdateUser] = useState(false);
  const [bigName, setBigName] = useState(false);
  const [edit, setEdit] = useState(false);
  const [big, setBig] = useState(false);
  const [isVoid, setIsVoid] = useState(false);
  const [imagePrev, setImagePrev] = useState({
    preview: REACT_APP_CLOUD + "/fbnd9t7l3znvim0rp9kl.png",
    raw: "",
  });
  const changeView = () => {
    setViewFullImage(!viewFullImage);
  };
  const inputOpenFileRef = useRef(null);

  const [nameForUpdate, setNameForUpdate] = useState(currentUser.names);

  //Change state for Edit Profile
  const change = () => {
    setEdit(!edit);
  };
  const onButtonClick = () => {
    inputOpenFileRef.current.click();
  };
  const updateUserInfo = async () => {
    setLoadUpdateUser(true);
    if (nameForUpdate.length > 45) {
      setBigName(true);
      setLoadUpdateUser(false);
      setIsVoid(false);
    } else {
      setBigName(false);
      if (des.length > 120) {
        setBig(true);
        setLoadUpdateUser(false);
      } else {
        setBig(false);
        if (nameForUpdate.trim().length > 0) {
          setIsVoid(false);
          await axios
            .put(REACT_APP_HOST + "/cliente/update/user/" + currentUser._id, {
              names: nameForUpdate,
              des: des,
            })
            .then((res) => {
              setLoadUpdateUser(false);
              checkUser(dispatch);
              change();
            })
            .catch((error) => {
              setLoadUpdateUser(false);
              console.log(error);
            });
        } else {
          setIsVoid(true);
          setLoadUpdateUser(false);
          setBigName(false);
        }
      }
    }
  };
  //Update image of user
  const update = async (e) => {
    e.preventDefault();
    console.log(imagePrev.raw);
    setLoad(true);
    if (image) {
      const file = new FormData();
      file.append("image", image);
      await axios
        .put(
          REACT_APP_HOST +
            "/nota/upload/profile/image/" +
            currentUser._id +
            "/" +
            currentUser.idPublic,
          file
        )
        .then((res) => {
          console.log(res.data);
          setImage();
          document.getElementById("form-image").reset();
          checkUser(dispatch);
          setLoad(false);
          setImagePrev({
            preview: REACT_APP_CLOUD + "/fbnd9t7l3znvim0rp9kl.png",
            raw: "",
          });
        })
        .catch((error) => {
          console.log(error.message);
          setLoad(false);
        });
    } else {
      alert("Falta la imagen papu!");
      setLoad(false);
    }
  };
  const close = (e) => {
    e.preventDefault();
    document.getElementById("form-image").reset();
    setImagePrev({
      preview: REACT_APP_CLOUD + "/fbnd9t7l3znvim0rp9kl.png",
      raw: "",
    });
  };
  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      setImagePrev({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      setImage(e.target.files[0]);
    }
  };
  //Check user for check currentUser
  useEffect(() => {
    checkUser(dispatch);
  }, []);
  return (
    <div className="profile">
      {viewFullImage ? (
        <ImageFull close={changeView} img={currentUser.imgProfile} />
      ) : null}
      <div className="info-profile">
        {currentUser ? (
          <>
            <form id="form-image">
              <input
                ref={inputOpenFileRef}
                onChange={handleChange}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                className="i-ocult"
              />
            </form>
            <div className="img-profile">
              <button onClick={changeView} className="btn-profile">
                <img
                  src={currentUser.imgProfile ? currentUser.imgProfile : null}
                  className="img-fluid img-pro"
                  alt={"Foto de perfil de " + currentUser.name}
                />
              </button>
              <button
                onClick={onButtonClick}
                className="btn change-image btn-primary"
              >
                Cambiar imagen
              </button>
            </div>
            {imagePrev.preview !==
            REACT_APP_CLOUD + "/fbnd9t7l3znvim0rp9kl.png" ? (
              <div className="preview">
                <img
                  src={imagePrev.preview}
                  accept="image/png,image/jpeg,image/jpg"
                  className="img-fluid img-p"
                  alt="Imagen"
                />
                <div className="confirm">
                  <div className="previa">
                    <p>
                      <strong>Vista Previa</strong>
                    </p>
                    <button
                      onClick={close}
                      className="btn btn-danger close-img"
                    >
                      <i class="bi bi-x-circle"></i>
                    </button>
                  </div>
                  <div >
                  <p>¿Estas seguro que quieres actualizar tu foto de perfil?</p>
                  <p className="msg-adv"><strong>Advertencia!</strong></p>
                  <p className="adv"><strong >Si la imagen que estas intentando subir sobrepasa las dimensiones establecidas es posible que ocurran errores. Se recomienda dimensiones (300 x 300)</strong></p>
                  </div>
                  {!load ? (
                    <button
                      onClick={update}
                      className="btn update-img btn-primary"
                    >
                      Actualizar Imagen
                    </button>
                  ) : (
                    <div class="load-confirm load" />
                  )}
                </div>
              </div>
            ) : null}
            <div className="info">
              {!edit ? (
                <>
                  <span className="name-me">
                    <i class="bi bi-person-circle"></i>
                    <strong>
                      {" "}
                      {currentUser.names ? currentUser.names : "Cargando..."}
                    </strong>
                  </span>
                  <p className="email">
                    <i class="bi bi-envelope"></i> {currentUser.email}
                  </p>
                  <p className="esp">
                    <strong>Seguidores </strong>(
                    {currentUser.followers
                      ? currentUser.followers.length
                      : "Cargando..."}
                    )
                  </p>
                  <p className="esp">
                    <strong>Seguidos </strong>(
                    {currentUser.following
                      ? currentUser.followers.length
                      : "Cargando..."}
                    )
                  </p>
                  <p className="esp">
                    <strong>Descripcion</strong>
                  </p>
                  <p>
                    {currentUser.des.length > 0
                      ? currentUser.des
                      : "No hay descripcion"}
                  </p>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={nameForUpdate}
                    placeholder="Escribe tu nombre"
                    onChange={(e) => setNameForUpdate(e.target.value)}
                    className={
                      isVoid || bigName
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  <div className="number-and-invalid">
                    <small className={bigName ? "aviso-des" : ""}>
                      Maximo 45 caracteres
                    </small>
                    <small>{nameForUpdate.length + "/45"}</small>
                  </div>
                  {isVoid ? (
                    <small className="aviso">Debes completar este campo!</small>
                  ) : null}

                  <input
                    readOnly
                    type="text"
                    value={currentUser.email}
                    className="esp form-control "
                  />
                  <strong className="esp">Descripcion</strong>
                  <textarea
                    value={des}
                    className={
                      big
                        ? "esp descript form-control is-invalid"
                        : "esp descript form-control"
                    }
                    onChange={(e) => setDes(e.target.value)}
                    placeholder="Añade una descripcion acerca de ti"
                  ></textarea>
                  <div className="number-and-invalid">
                    <small className={big ? "aviso-des" : ""}>
                      Maximo 120 caracteres
                    </small>
                    <small>{des.length + "/120"}</small>
                  </div>
                </>
              )}
              {!edit ? (
                <button
                  onClick={change}
                  className="btn boton-editar-perfil btn-success"
                >
                  Editar Perfil
                </button>
              ) : (
                <>
                  {!loadUpdateUser ? (
                    <button
                      onClick={updateUserInfo}
                      className="btn boton-editar-perfil-act btn-success"
                    >
                      Actualizar
                    </button>
                  ) : (
                    <div className="load loadUpdate"></div>
                  )}
                </>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
