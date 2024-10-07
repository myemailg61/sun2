import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from 'axios'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from '../asset/banner1.avif'
import img2 from '../asset/banner2.webp'
import img3 from '../asset/banner3.png'

function Banner() {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 4000,
        cssEase: "linear"
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get("http://localhost:8000/admin/getBanner")
            } catch (err) { }

        }

        getData();
    }, [])
    return (
        <div className="slider-container w-full overflow-hidden">
            <Slider {...settings}>
                <div>
                    <img src={img1} className="w-8/12 h-[60vh]"></img>
                </div>
                <div>
                    <img src={img2} className="w-8/12 h-[60vh]"></img>
                </div>
                <div>
                    <img src={img3} className="w-8/12 h-[60vh]"></img>
                </div>

            </Slider>
        </div>
    );
}

export default Banner;
