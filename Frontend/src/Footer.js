import React from "react";
import './Footer.css';
import planeImage from './Images/airplane.png';

import {
    AiFillFacebook,
    AiFillTwitterCircle,
    AiFillInstagram,
} from "react-icons/ai";
import { FaGithub } from "react-icons/fa";

export default function Footer() {

    return (
        <footer>
            <div className="footerContainer">
                <div className="footerComp1">
                    <img src={planeImage} alt="Avio Logo" id="planeLogo"/>
                    <h2>A v i o</h2>
                </div>
                <div className="footerComp2">
                    <a href="#">About Us</a>
                    <a href="#">GitHub</a>
                    <a href="#">Projects</a>
                    <a href="#">Details</a>
                </div>
                <div className="footerCompIMGS">
                    <a href="#"><AiFillFacebook className="logos"/></a>
                    <a href="#"><AiFillInstagram className="logos"/></a>
                    <a href="#"><AiFillTwitterCircle className="logos"/></a>
                    <a href="#"><FaGithub className="logos"/></a>
                </div>
                <p>© 2023 A v i o. All Rights Reserved.</p>
            </div>
        </footer>
    )
}

/*
            <div className="footerContent">
                <h3>
                    © 2023 Avio
                </h3>
                <div className="sub">
                    <table>
                        <tr>
                            <th>About Us</th>
                            <th>Services</th>
                            <th>Authors</th>
                            <th>Contact Us</th>
                        </tr>
                        <tr>
                            <td>Learn More</td>
                            <td>Server Tech</td>
                            <td>Umar Farooq</td>
                            <td>Phone</td>
                        </tr>
                        <tr>
                            <td>Clients</td>
                            <td>Web Development</td>
                            <td>Omer Hashmi</td>
                            <td>GitHub</td>
                        </tr>
                        <tr>
                            <td>Projects</td>
                            <td></td>
                            <td>Hamyl Shiekh</td>
                            <td>Twitter</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Nusrat Rhubab</td>
                            <td>Instagram</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Facebook</td>
                        </tr>
                    </table>

                    
                    <div>
                            <b>Social links</b>
                            <div>
                                <AiFillFacebook />
                                <AiFillTwitterCircle />
                                <AiFillInstagram />
                            </div>
                            <div>
                                <AiFillApple />
                                <FaGooglePlay />
                            </div>
                    </div>
                    </div>
                    </div> 
*/