import React from "react";
import { useSelector } from "react-redux";
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaDiscord,
  FaQuestionCircle,
} from "react-icons/fa";

const Support = () => {
  const theme = useSelector((state) => state.theme.theme); // Select the theme from Redux

  const personalInfo = {
    name: "Mohd Hashir",
    email: "esport.py.m45@gmail.com",
  };

  const links = [
    { name: "Twitter", icon: FaTwitter, url: "#" },
    { name: "LinkedIn", icon: FaLinkedin, url: "#" },
    { name: "GitHub", icon: FaGithub, url: "#" },
    { name: "Discord", icon: FaDiscord, url: "#" },
  ];

  return (
    <section className={`w-full flex justify-center items-center`}>
      <div
        className={`
          p-8 rounded-lg shadow-lg max-w-lg mx-auto
          ${
            theme === "dark"
              ? "bg-[#000000] text-white border-[#121212]"
              : "bg-white text-black border-gray-200"
          }
        `}
      >
        <div className="flex flex-col items-center mb-6">
          <div className="bg-[#00bcd4] p-4 rounded-full mb-4">
            <FaQuestionCircle className="text-4xl" />
          </div>

          <h3 className="text-2xl font-bold text-center mb-2">
            Contact me for any issue or Support
          </h3>
          <h4 className="text-2xl font-bold text-center mb-2 ">
            {personalInfo.name}
          </h4>
          <p className="text-[#00bcd4] text-lg mb-4">{personalInfo.email}</p>
        </div>
        <div className="space-y-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center p-3 rounded-lg hover:bg-[#00bcd4] transition duration-300 
                ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}
              `}
            >
              <link.icon className="text-[#00bcd4] mr-3 text-xl" />
              <span className="text-lg">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Support;
