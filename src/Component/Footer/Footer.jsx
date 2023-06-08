import React from "react";
import "./Footer.css";
import footerImg from "./../../images/logo.png";
import { Row, Col, Container } from "react-bootstrap";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
const Footer = () => {
  return (
    <React.Fragment>
      <Container>
        <div className="footer">
          <div className="fc1">
            <img src={footerImg}></img>
            <p>
              We believe blockchain and digital assets are finding strategic
              grounds in the investmentspace as they become poised for a
              more regulated and stable presence in the new crypto verse &
              forex verse market.
            </p>
            <h3>Follow us</h3>
            <div className="footerSocials">
              <i id="i1">
                <FaFacebookF />
              </i>
              <i id="i2">
                <FaTwitter />
              </i>
              <i id="i4">
                <FaGooglePlusG />
              </i>
              <i id="i3">
                <FaLinkedinIn />
              </i>
              <i id="i5">
                <FaInstagram />
              </i>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Footer;

// import React from 'react'
// import "./Footer.css"
// import { Container, Row, Col } from "react-bootstrap";
// import { FaFacebookF } from "react-icons/fa"
// import { FaTwitter } from "react-icons/fa"
// import { FaLinkedinIn } from "react-icons/fa"
// const Footer = () => {
//     return (
//         <React.Fragment>
//             <div className="footer">
//                 <Container>
//                     <Row>
//                         <Col md='3' className="fc1">
//                             <h1>CompanyName</h1>
//                             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, temporibus.</p>
//                         </Col>
//                         <Col md="3" className="fc2">
//                             <h2>Contact Us</h2>
//                             <p>Address</p>
//                             <h5>1953 Lorem ipsum dolor sit amet.</h5>
//                             <p>Phone</p>
//                             <h5>+91 47646-94646</h5>
//                             <p>Email</p>
//                             <h5>companyName@gmail.com</h5>
//                         </Col>
//                         <Col md="3" className="fc3">
//                             <h2>Support</h2>
//                             <p>Team of use</p>
//                             <p>Privacy</p>
//                             <p>Help center</p>
//                             <p>Contact</p>
//                         </Col>
//                         <Col md="3" className="fc4">
//                             <h2>Quick Links</h2>
//                             <p>Home</p>
//                             <p>About</p>
//                             <p>Team</p>
//                             <p>Roadmap</p>
//                         </Col>
//                     </Row>
//                     <hr />
//                     <div className="copyright">
//                         <p>Copyright &#169; 2023 designed by Eracom Technologies</p>
//                         <div className="copySocials">
//                             <i><FaFacebookF /></i>
//                             <i><FaTwitter /></i>
//                             <i><FaLinkedinIn /></i>
//                         </div>
//                     </div>
//                 </Container>
//             </div>
//         </React.Fragment>
//     )
// }

// export default Footer
