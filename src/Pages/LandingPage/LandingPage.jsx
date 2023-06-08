import React, { useEffect, useState } from "react";
import Navbar from "./../../Component/Navbar/Navbar";
import "./LandingPage.css";
import { Player } from "@lottiefiles/react-lottie-player";
import HeaderAnimation from "./../../assets/headerAnim.json";
import f1 from "./../../assets/f5.jpg";
import f2 from "./../../assets/f8.jpg";
import f3 from "./../../assets/f7.jpg";
import f4 from "./../../assets/f6.jpg";
import MyPieChart from "./../../Component/MyPieChart";
import FeatureCard from "./../../Component/FeatureCard/FeatureCard";
import Footer from "./../../Component/Footer/Footer";
import ScrollToTop from "./../../Component/ScrollToTop/ScrollToTop";
import { Container, Row, Col } from "react-bootstrap";
import Roadmap from "../../Component/Roadmap/Roadmap";
const LandingPage = () => {
  const [cryptoRate, setCryptoRate] = useState([]);
  const [width, setWidth] = useState();
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false%22"
      );
      const data = await response.json();
      setCryptoRate(data);
      console.log("cryptoRate", data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      counter.innerText = "0";
      const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / 200;
        if (count < target) {
          counter.innerText = `${Math.ceil(count + increment)}`;
          setTimeout(updateCounter, 1);
        } else counter.innerText = target;
      };
      updateCounter();
    });
  }, []);

  return (
    <>
      <section className="header">
        <Navbar />
        <ScrollToTop />
        <Container>
          <div className="headerContent">
            <Row className="headerRow">
              <Col md="6">
                <h1>
                  Eco Force A Digital Solution for Forexverse & Cryptoverse
                </h1>
                <p>
                  Eco Force is a fintech development company that provides world
                  class software and support services to the financial services
                  industry and digital asset platforms.
                </p>
                <div className="headerButtons">
                  {/* <button
                    className="btnPrimary"
                    style={{ marginRight: "20px" }}
                  >
                    Login
                  </button> */}
                  {/* <button className="btnSecondary">Token Distribution</button> */}
                </div>
              </Col>
              <Col md="6" className="headerAnim">
                <Player
                  autoplay
                  loop
                  src={HeaderAnimation}
                  style={{ height: "100%", width: "100%" }}
                ></Player>
              </Col>
            </Row>
          </div>
        </Container>
        <marquee width="100%" direction="left" height="100px">
          <div className="marqueeData">
            {cryptoRate.map((cryptoData, index) => {
              return (
                <div className="cryptoPrice" key={index}>
                  <img src={cryptoData.image} alt="" />
                  <div>
                    <h1>{cryptoData.name}</h1>
                    <p>${cryptoData.current_price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </marquee>
      </section>
      <section className="about" id="about">
        <Container>
          <Row className="align-items-center" style={{ padding: "40px 0px" }}>
            <Col md="5">
              <div className="aboutContent">
                <h1>About Eco Force</h1>
                <h4>We Empowering A World </h4>
                <p>
                  Eco Force is the world's leading digital crypto & forex verse
                  trading company, registered in Luxemburg & the United Kingdom.
                  We have been in forex trading for 7 years and currently manage
                  morethan 20 million dollars infunds for our worldwide clients.
                  <br />
                  Eco verse is also world's largest provider of financial
                  markets data and infrastructure for decades that cover
                  everything from pre-trade analytics & analysis. Within theEco
                  verse future verse ecosystem, we provide information,
                  &insights, with the combination of Cryptoverse & forex verse
                  technology that enable customers to execute critical
                  investing, trading, and risk decisions with confidence.
                </p>
                <button className="btnPrimary" style={{ marginRight: "20px" }}>
                  Read More{" "}
                </button>
                {/* <button className="btnSecondary btnWatch"><i><FaPlay /></i> Watch video</button> */}
              </div>
            </Col>
            <Col md="7" className="aboutCol">
              {/* <img src={About2} alt="" /> */}
              <Player
                autoplay
                loop
                src="https://assets2.lottiefiles.com/packages/lf20_dufevbi4.json"
                style={{ height: "100%", width: "90%" }}
              ></Player>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="features">
        <Container>
          <h1 className="secHeading">Benefits of Using Our Solution</h1>
          <p className="secSubHeading">
            The future of trading of the crypto forex market is currently the
            largest and most liquid market in the world regarding trading
            volume. With an average daily turnover of $5 trillion.
          </p>
          <Row>
            <Col md="3" className="p-0">
              <FeatureCard
                img={f1}
                heading="Market Access"
                subheading="Eco Force provide direct access to global crypto and forex markets, enabling it to facilitate trading activities for clients."
              />
            </Col>
            <Col md="3" className="p-0">
              <FeatureCard
                img={f2}
                heading="Innovation and Technology"
                subheading="Eco Force focus on innovation can lead to the development of cutting-edge trading platforms, advanced algorithms, and improved user experiences, providing a competitive edge in the market."
              />
            </Col>
            <Col md="3" className="p-0">
              <FeatureCard
                img={f3}
                heading="24/7 Market"
                subheading="Eco Force The digital crypto and forex markets operate 24 hours a day, five days a week, allowing for continuous trading activities."
              />
            </Col>
            <Col md="3" className="p-0">
              <FeatureCard
                img={f4}
                heading="Global Reach"
                subheading="Eco Force help us can attract clients from different countries and regions for trading."
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* <section className="token" id="token">
        <h1 className="secHeading">Token Allocation</h1>
        <p className="secSubHeading">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean cursus
          tincidunt ultrices. Ut quis blandit dolor. Ut laoreet sagittis arcu eu
          tristique.
        </p>
        <MyPieChart />
      </section> */}
      <section className="roadmap" id="roadmap">
        <h1 className="secHeading white">Road Map</h1>
        <p className="secSubHeading white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean cursus tincidunt ultrices. Ut quis blandit dolor. Ut laoreet sagittis arcu eu tristique.</p>
        <Roadmap />
      </section>
      <section className="footer">
        <Footer />
      </section>
    </>
  );
};

export default LandingPage;
