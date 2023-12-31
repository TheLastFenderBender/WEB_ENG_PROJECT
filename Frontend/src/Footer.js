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
                    <h2 id="titleLogo">A v i o</h2>
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