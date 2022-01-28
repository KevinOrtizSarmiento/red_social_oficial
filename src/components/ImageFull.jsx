import React from "react";
import "../styles/full.css";

const ImageFull = ({ img, close }) => {
  return (
    <div className="modal-full-image">
      <div className="grid">
      <div className="b-close"><button onClick={close} id="iden">
            <i class="bi bi-x-lg"></i>
          </button></div>
          <img src={img} className="img-fluid imview" alt="Imagen" />
        <div className="info-imagen">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi minus iste est!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos magnam doloremque ut accusamus earum consequuntur repellendus vel accusantium.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, vitae repudiandae sint quod cum modi delectus dolores impedit natus laboriosam numquam, porro rerum eveniet temporibus.</p>
          <p>lor</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi minus iste est!</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi minus iste est!</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi minus iste est!</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi minus iste est!</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi minus iste est!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos magnam doloremque ut accusamus earum consequuntur repellendus vel accusantium.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, vitae repudiandae sint quod cum modi delectus dolores impedit natus laboriosam numquam, porro rerum eveniet temporibus.</p>
          <p>lor</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi minus iste est!</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi minus iste est!</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi minus iste est!</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi minus iste est!</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi minus iste est!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos magnam doloremque ut accusamus earum consequuntur repellendus vel accusantium.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, vitae repudiandae sint quod cum modi delectus dolores impedit natus laboriosam numquam, porro rerum eveniet temporibus.</p>
          <p>lor</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi minus iste est!</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi minus iste est!</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi minus iste est!</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi minus iste est!</p>
        </div>
      </div>
    </div>
  );
};

export default ImageFull;
