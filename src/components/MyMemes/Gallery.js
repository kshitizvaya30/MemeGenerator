import React, { useEffect, useState } from "react";
// import i1 from "../../images1/1c1uej.jpg";
// import i2 from "../../images1/28j0te.jpg";
// import i3 from "../../images1/63n7am.jpg";
// import i4 from "../../images1/63n79e.jpg";
import "../Styles/Gallery.css";
import CloseIcon from "@material-ui/icons/Close";
import { UserData } from "../../fire";

const Gallery = ({ data }) => {
  console.log("data:::", data);

  const [model, setModel] = useState(false);
  const [tempingSrc, setTempingSrc] = useState("");

  const getImg = (imgSrc) => {
    setTempingSrc(imgSrc);
    setModel(true);
  };

  return (
    <>
      <div className={model ? "model open" : "model"}>
        <img src={tempingSrc} />
        <CloseIcon onClick={() => setModel(false)} />
      </div>
      <div className="gallery">
        {data.map((item, index) => {
          return (
            <div
              className="pics"
              key={index}
              onClick={() => getImg(item.url)}
            >
              <img src={item.url} className="gallery_img" />
            </div>
          );
        })}
      </div>
      ;
    </>
  );
};

export default Gallery;
