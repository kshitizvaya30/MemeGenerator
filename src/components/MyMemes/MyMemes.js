import React, { useEffect, useState } from "react";
import { UserData } from "../../fire";
import Gallery from "./Gallery";

const MyMemes = (props) => {
  const [data,setData] = useState([]);

  useEffect(() => {
    async function dataF() {
      const val = await UserData(props.user);
      console.log("val ", val)
      if(val.length === 0){
        alert("No Memes Saved");
      } else {
        setData(val);
      }
    }
    
    dataF();
  }, []);


  return (
    <div>
      <h1 style={{ textAlign: "center" }}>MEME Gallery</h1>
      <Gallery data={data} />
    </div>
  );
};

export default MyMemes;
