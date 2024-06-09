import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";

const Github = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-github"
    viewBox="0 0 16 16"
    style={{ height: "40px", width: "40px" }}
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
  </svg>
);

const Linkedin = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-linkedin"
    viewBox="0 0 16 16"
    style={{ height: "40px", width: "40px" }}
  >
    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
  </svg>
);

export default function Home() {
  const [isLoading, SetLoading] = useState(false);
  const [blob, SetBlob] = useState("");
  const [value, SetValue] = useState("");

  async function getImg() {
    if (isLoading) return;
    var value = document.getElementsByTagName("textarea")[0].value;
    SetLoading(true);
    return await fetch("https://square-mode-2473.aslanferhat16.workers.dev/", {
      method: "POST",
      /*  headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      }, */
      body: value.toString(),
    })
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        var img = URL.createObjectURL(blob);
        // Do whatever with the img
        var el = document.getElementById("pop-up");

        el.style.display = "flex";
        document.getElementById("img").setAttribute("src", img);
        console.log(img);
        SetBlob(img);
        SetLoading(false);
      })
      .catch((e) => console.log(e));
  }

  function close() {
    var el = document.getElementById("pop-up");
    el.style.display = "none";
  }
  function download() {
    var saveImg = document.createElement("a");
    saveImg.href = blob;
    saveImg.download = "blob.jpg";
    saveImg.innerHTML = "some text";
    document.body.appendChild(saveImg);
    saveImg.click();
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Chappie AI Image Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ backgroundColor: "white" }} className="textDiv">
        <span className="text">Generate image with STABLE DIFFUSION</span>
      </div>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <img src="/Chappie_Logo.svg" alt="Chappie" className={styles.logo} />
        </h1>
        <textarea
          placeholder="miyazaki world, palace in the sky, hd, minimalism"
          cols={30}
          rows={4}
          onChange={(e) => SetValue(e.target.value)}
        ></textarea>
        <button
          disabled={isLoading || value.length < 4}
          id="btn-gen"
          onClick={() => {
            getImg();
          }}
        >
          {isLoading ? "Loading... estimated 10s" : "Generate"}
        </button>

        <span>Made in Berlin :)</span>
      </main>
      <footer>
        <a href="https://github.com/ferhat-aslan" target="_blank">
          <Github />
        </a>
        <a href="https://www.linkedin.com/in/aslanferhat/" target="_blank">
          <Linkedin />
        </a>
      </footer>
      <div id="pop-up" style={{ display: "none" }}>
        <img id="img" />
        <button
          id="btn-popup"
          style={{ left: "0px" }}
          onClick={() => download()}
        >
          Download
        </button>
        <button id="btn-popup" style={{ right: "0px" }} onClick={() => close()}>
          ✘
        </button>
      </div>
      <style jsx>{`
        #btn-popup {
          background-color: white;
          position: absolute;
          top: 0px;

          border-radius: 500px;
          padding: 7px 11px;
          outline: none;
          border: none;
          box-shadow: 1px 1px 20px 0px black;
          cursor: pointer;
        }
        #img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        #pop-up {
          position: absolute;
          inset: 0;
          width: 50%;
          height: 50%;
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 1px 1px 20px 0px black;
          border: 10px solid white;
          border-radius: 10px;
        }
        footer {
          position: fixed;
          bottom: 0px;
          width: 100%;
          background-color: white;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          column-gap: 25px;
        }
        .text {
          background-image: linear-gradient(
            to right,
            #00f260,
            #f79d00,
            #8f00ff,
            #64f38c
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;

          background-size: 300%;
          background-position: -100%;

          animation: animatedText 20s infinite alternate-reverse;
          background-color: white;
          font-size: 30px;
          font-weight: bold;
        }
        .textDiv {
          background-color: white;
          margin-bottom: 10px;
          padding: 10px;
          border-radius: 20px;
        }
        @keyframes animatedText {
          to {
            background-position: 100%;
          }
        }
        * {
          font-family: "LXGW WenKai Mono TC", monospace !important;
        }
        main {
          padding: 5rem;
          background-color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 7px;
        }

        textarea {
          background-color: #ebe9e9;
          border: none;
          padding: 1rem;
          color: black;
          width: 100%;
          font-size: 16px;
        }
        #btn-gen {
          margin-top: 10px;
          color: white;
          background-color: blueviolet;
          padding: 10px 10px;
          border-radius: 40px;
          border: none;
          outline: none;
          width: 100%;
          cursor: pointer;
        }
        button:active {
          transform: scale(0.9);
        }
        button:hover {
          opacity: 0.8;
        }

        button:disabled {
          transform: scale(1) !important;
          opacity: 0.8;
          cursor: default;
        }

        span {
          margin-top: 8px;
          font-size: 12px;
        }
      `}</style>

      <style jsx global>{`
        svg {
          width: 30px !important;
          height: 30px !important;
          cursor: pointer;
        }

        svg:hover {
          opacity: 0.8;
          transform: scale(0.9);
        }
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
