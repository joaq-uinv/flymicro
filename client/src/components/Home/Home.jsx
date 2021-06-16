import React from "react";
import col from "../../assets/col.jpg";
import cor from "../../assets/cor.jpg";
import juj from "../../assets/juj.jpg";
import lan from "../../assets/lan.jpg";
import ptg from "../../assets/ptg.jpg";
import sal from "../../assets/sal.jpg";
import "./styles.css";

const Home = () => {
  const imagesOne = [
    { img: col, txt: "Purmamarca" },
    { img: cor, txt: "Córdoba" },
    { img: juj, txt: "Jujuy" },
  ];

  const imagesTwo = [
    { img: lan, txt: "Villa La Angostura" },
    { img: ptg, txt: "Bariloche" },
    { img: sal, txt: "Salta" },
  ];
  return (
    <>
      <div className="heading">
        <h2>Destinos Flymicro</h2>
        <p>
          Reencontrate con los que más querés. Creá anécdotas con amigos. Ideá
          nuevos negocios. Conocé lugares nuevos y animate a empezar una nueva
          aventura.
        </p>
      </div>
      <section className="img_container">
        <div className="imgs_container_sec">
          {imagesOne.map((img) => (
            <div
              style={{ backgroundImage: `url(${img.img})` }}
              className="img_card"
            >
              <p>{img.txt}</p>
            </div>
          ))}
        </div>
        <div className="imgs_container_sec">
          {imagesTwo.map((img) => (
            <div
              style={{ backgroundImage: `url(${img.img})` }}
              className="img_card"
            >
              <p>{img.txt}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
