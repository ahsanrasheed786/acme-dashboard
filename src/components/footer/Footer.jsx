import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { FaFacebook, FaGithub, FaInstagram, FaTwitter, FaTwitch } from "react-icons/fa";

const sections = [
  // {
  //   title: "",
  //   items: ["", "", "", "", ""],
  // },
  // {
  //   title: "Support",
  //   items: ["Pricing", "Documentation", "Guides", "API Status"],
  // },
  {
    title: "Menu",
    items: [
      { name: "About Us", link: "/about" },
      { name: "Services", link: "/services" },
      { name: "Case Studies", link: "/casestudies" },
      { name: "Blog", link: "/blog" },
      { name: "Hire", link: "/hire" },
    ],
  },
  // {
  //   title: "Legal",
  //   items: ["Claims", "Privacy", "Terms", "Policies", "Conditions"],
  // },
];

const items = [
  { name: "Facebook", icon: 'FaFacebook', link: "https://www.facebook.com/" },
  { name: "Instagram", icon: 'FaInstagram', link: "https://www.instagram.com/" },
  { name: "Twitter", icon: 'FaTwitter', link: "https://twitter.com/" },
  { name: "Twitch", icon: 'FaTwitch', link: "https://www.twitch.tv/" },
  { name: "Github", icon: 'FaGithub', link: "https://github.com/" },
];

const Footer = () => {
  const [bgImage, setBgImage] = useState("");
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

      // Check if user has scrolled to the bottom
      if (scrollPercentage > 95) {
        setBgImage("https://img.genial.ly/59e059d30b9c21060cb4c2ec/ea44d19b-e9a0-4deb-bcb3-3133356d2890.gif");
      } else {
        setBgImage("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    // <div className="w-full mt-24 bg-[#0c312d] text-gray-800 py-y px-2 bg-img bg-[url('https://i.gifer.com/2zGl.gif')]">
    // <div className="w-full mt-24 bg-[#0c312d] text-gray-800 py-y px-2 bg-img bg-[url('https://help.fanruan.com/finereport-en10.0/uploads/20201230/1609295170644784.gif')]">
    // <div className="w-full mt-24 bg-[#0c312d] text-gray-800 py-y px-2 bg-img bg-[url('https://img.genial.ly/59e059d30b9c21060cb4c2ec/ea44d19b-e9a0-4deb-bcb3-3133356d2890.gif')]">
    <div
      className="w-full  bg-[#2BAEB9] text-white py-y px-2  "
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
    >
      {/* <div className="w-full mt-24 bg-[#d9f6f3] text-gray-800 py-y px-2 bg-img bg-[url('https://assets-v2.lottiefiles.com/a/42f51f18-118a-11ee-af8e-d3d2c254a2db/yTm2O6PVV8.gif')]"> */}
      <div className="max-w-[1240px] mx-auto grid   grid-cols-2 md:flex justify-between border-b-2 border-gray-600 py-8">
       <div className="manu ">
        {sections.map((section, index) => (
          <div key={index}>
            <h6 className="font-bold uppercase pt-2 ">{section.title}</h6>
            <ul>
              {section.items.map((item, i) => (
                <li key={i} className="py-1 text-white hover:text-orange-400">
                  {/* both condation are true    */}
                  {/* {section.title === "Menu" ? <Link to={item.link}>{item.name}</Link> : item} */}
                  {typeof item == `object` ? <Link to={item.link}>{item.name}</Link> : item}
                </li>
              ))}
            </ul>
          </div>
        ))}
</div>
        <div className="col-span-2 pt-8 md:pt-2">
          <p className="font-bold uppercase">Subscribe To Update</p>
          <p className="py-4">The latest news, articles, and resources, sent to your inbox weekly.</p>
          <form className="flex flex-col sm:flex-row">
            <input className="w-full p-2 mr-4 rounded-md mb-4" type="email" placeholder="Enter email.." />
            <button className="p-2 mb-4">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center ">
        <p className="py-4">2024 ACME Solitions Ltd. All rights reserved</p>
        <div className="flex justify-between sm:w-[300px] pt-4 text-2xl">
          {/* {items.map((x, index) => {
            return <x.icon key={index} className="hover:text-orange-400" />;
          })} */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
