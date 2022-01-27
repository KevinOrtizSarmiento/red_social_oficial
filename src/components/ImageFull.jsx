import React from "react";
import "../styles/full.css";

const ImageFull = ({ img, close }) => {
  return (
    <div className="modal-full-image">
        <div className="img-and-close">
        <button onClick={close} id="iden"><i  class="bi bi-x-lg"></i></button>
      <img src={img} className="img-fluid full" alt="Imagen" />
      </div>
      <div className="info-imagen"></div>
    </div>
  );
};

export default ImageFull;
