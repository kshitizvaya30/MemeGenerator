import React, { useState, useEffect } from "react";
import { CreateUserDocument, UserData } from "../../fire";
import "./FormSuccess.css";
import { CaptionMeme, MemeData, RandomMeme } from "../../util";
import MyMemes from "../MyMemes/MyMemes";

const FormSuccess = (props) => {
  const [imageData, setImageData] = useState({});
  const [topText, setTopText] = useState("Enter Top text");
  const [bottomText, setBottomText] = useState("Enter Bottom text");

  useEffect(() => {
    async function generate() {
      // body...
      await MemeData();
      setImageData(RandomMeme());
    }
    
    generate();
  }, []);

  const [displayMemes, setDispalyMemes] = useState(false);

  const RandomMemeImage = () => {
    setImageData(RandomMeme());
  };

  const GenerateImage = async (e) => {
    e.preventDefault();

    const newURL = await CaptionMeme(imageData.id, topText, bottomText);
    console.log(newURL + "new Url");

    setImageData({
      ...imageData,
      url: newURL,
    });
  };

  const MyMemesPage = () => {
    setDispalyMemes(true);
  };

  return (
    <div className="formSuccess">
      {/* <nav>
        <h2>Welcome</h2>
        <button onClick={props.handleLogout}>Logout</button>
      </nav> */}
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container px-5">
          <a class="navbar-brand" href="#!">
            Memers
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#!" onClick={() => setDispalyMemes(false)}>
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#!" onClick={() => MyMemesPage()}>
                  My Memes
                  {/* (props.user) */}
                </a>
              </li>
            </ul>
            <button
              class=" btn btn-primary btn-sm ms-3"
              onClick={() => props.handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      { !displayMemes ? (
        <div class="container px-4 px-lg-5">
          {/* <!-- Heading Row--> */}
          <form
            class="row gx-4 gx-lg-5 align-items-center my-5"
            onSubmit={(e) => GenerateImage(e)}
          >
            <div class="col-lg-7">
              <img
                class="img-fluid rounded mb-4 mb-lg-0"
                key={imageData.id}
                src={imageData.url}
                alt={imageData.name}
              />
            </div>
            <div class="col-lg-5">
              <h1 class="font-weight-light">
                Start creating the MEME that no one is able to ,My MEMELORD
              </h1>
              <p>Generate Random Memes by clicking on the button below</p>
              <div>
                <input
                  className="form-inputs"
                  type="text"
                  placeholder="Enter Top text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                />
                <input
                  className="form-inputs"
                  type="text"
                  placeholder="Enter Bottom text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                />
              </div>
              <button
                class="btn btn-primary me-2"
                type="button"
                onClick={() => RandomMemeImage()}
              >
                Random Meme
              </button>
              <button class="btn btn-primary me-2" type="submit">
                Generate Meme
              </button>
              <div>
                <button
                  class="btn btn-danger mt-4"
                  type="button"
                  onClick={() => CreateUserDocument(props.user, imageData)}
                >
                  Save Meme
                </button>
              </div>
            </div>
          </form>
          {/* <!-- Call to Action--> */}
          <div class="card text-white bg-secondary my-5 py-4 text-center">
            <div class="card-body">
              <p class="text-white m-0">
                Your Memes Display the "ART OF WORK" that you have done and it
                shows that you have a achieved a higher Rank that no one can
                achieve.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <MyMemes user={props.user}/>
      )}
      {/* <!-- Page Content--> */}

      {/* <!-- Footer--> */}
      <footer class="py-5 bg-dark">
        <div class="container px-4 px-lg-5">
          <p class="m-0 text-center text-white">
            Copyright &copy; Memers.com 2021
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FormSuccess;
