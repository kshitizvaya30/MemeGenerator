import axios from "axios";

export const MemeData = () => {
  var config = {
    method: "get",
    url: "https://api.imgflip.com/get_memes",
    headers: {},
  };

  axios(config)
    .then(function (response) {
      localStorage.setItem("memes", JSON.stringify(response.data.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const RandomMeme = () => {
  var random = Math.floor(Math.random() * (50 + 1));
  var memeData = JSON.parse(localStorage.getItem("memes")).memes[random];
  return memeData;
};

export const CaptionMeme = async(template_id,text0,text1) => {
  var data = "";    

  var config = {
    method: "post",
    url: `https://api.imgflip.com/caption_image?template_id=${template_id}&username=5050ritik&password=Buj!v6.6ErJeQvd&text0=${text0}&text1=${text1}`,
    headers: {
      Cookie: "claim_key=BWbsAkAOCM0U7bGMM4Eqa59Od6pko6B6",
    },
    data: data,
  };

  const g = await axios.post(`https://api.imgflip.com/caption_image?template_id=${template_id}&username=5050ritik&password=Buj!v6.6ErJeQvd&text0=${text0}&text1=${text1}`,
    data, {
        headers: {
            Cookie: "claim_key=BWbsAkAOCM0U7bGMM4Eqa59Od6pko6B6",
        }
    });
    console.log("Data :: ", g.data);
    return g.data.data.url;
};
