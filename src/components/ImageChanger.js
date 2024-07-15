import React, { useState, useEffect } from "react";
import img1 from "../images/1.png";
import img2 from "../images/2.png";
import img3 from "../images/3.png";

const ImageChanger = () => {
  const imageArray = [img1, img2, img3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => {
          // Increment the index, and loop back to the first image if at the end
          return (prevIndex + 1) % imageArray.length;
        });
        setIsTransitioning(false);
      }, 1000); // Adjust the timeout to match your transition duration
    }, 5000); // Adjust the interval duration (e.g., 2000 milliseconds for 2 seconds)

    return () => clearInterval(interval);
  }, []);

  const currentImage = imageArray[currentImageIndex];

  return (
    <img
      src={currentImage}
      alt="Changing Image"
      className={` h-auto w-auto transition-opacity ease-in-out duration-1000 ${
        isTransitioning ? "opacity-0" : ""
      }`}
    />
  );
};

export default ImageChanger;
