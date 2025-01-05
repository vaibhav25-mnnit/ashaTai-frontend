import React from "react";

function About() {
  return (
    <>
      <div className="bg-white  dark:bg-gray-900 dark:text-white flex flex-col items-center shadow-white ">
        <h1 className="text-2xl uppercase font-semibold tracking-tight sm:my-10 sm:text-4xl">
          About Us
        </h1>
        <div className="w-[70%]">
          <p className="mb-3 text-gray-500 dark:text-gray-400 first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:me-1 first-letter:float-start">
            A<strong>shaTai</strong> is your one-stop destination for wholesome,
            homemade food delivered right to your doorstep. We believe in the
            joy of homemade meals crafted with love and care. Whether you’re
            craving comforting traditional flavors or a quick, healthy bite,
            we’ve got you covered.
          </p>

          <p className="text-gray-500 dark:text-gray-400">
            {" "}
            Our mission is simple: to bring the warmth of homemade food to your
            table at prices that won’t break the bank. Perfect for busy
            professionals, students, and families alike, our menu is designed to
            offer something for everyone—whether it’s your favorite snacks,
            hearty meals, or sweet treats. We take pride in creating food that
            is not only delicious but also made with the utmost hygiene and
            care. Every meal is a testament to our commitment to quality and
            your satisfaction. Join the AshaTai family today and let us bring a
            slice of home to you, wherever you are!
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
