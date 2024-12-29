import { AtSign, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { ReactSocialMediaIcons } from "react-social-media-icons";
import Logo from "./Logo";

const Footer = () => {
  const quickLinks = [
    { name: "Men Eyeglasses", link: "#" },
    { name: "Women Eyeglasses", link: "#" },
    { name: "Men Sunglasses", link: "#" },
    { name: "Women Sunglasses", link: "#" },
  ];
  const company = [
    { name: "Our Blog", link: "#" },
    { name: "Return & Exchange Policy", link: "#" },
    { name: "Reviews", link: "#" },
    { name: "Privacy Policy", link: "#" },
    { name: "Terms And Conditions", link: "#" },
  ];

  return (
    <footer className="">
      <div className="border border-zinc-200 flex flex-col md:flex-row gap-4 justify-between px-4 md:px-16 py-16">
        <div className="flex flex-col items-center md:items-start">
          <Logo />
          <div className="mt-12 flex flex-col gap-4">
            <p className="flex gap-1">
              <MapPin />
              Address ABC, New York,
              <br /> Unites States
            </p>
            <p className="flex gap-1">
              <Phone />
              Help Line & Whatsapp: <br /> +123 456 789
            </p>
            <p className="flex gap-1">
              <AtSign />
              someaddress@gmail.com
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 font-medium text-center md:text-left mt-8 md:mt-0">
          <h3 className="font-medium text-2xl mb-6">Quick Links</h3>
          {quickLinks.map((item) => (
            <Link key={item.name} className="hoverable" to={item.link}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3 font-medium text-center md:text-left mt-8 md:mt-0">
          <h3 className="font-medium text-2xl mb-6">Company</h3>
          {company.map((item) => (
            <Link key={item.name} className="hoverable" to={item.link}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className="mt-8 md:mt-0">
          <h3 className="font-medium text-2xl mb-6 text-center md:text-left">
            Contact Us
          </h3>
          <div className="flex gap-1 justify-center md:justify-normal">
            <ReactSocialMediaIcons
              borderColor="rgba(0,0,0,0)"
              icon="instagram"
              iconColor="rgba(20,20,20,1)"
              backgroundColor="rgba(26,166,233,0)"
              url="#"
              size="48"
            />
            <ReactSocialMediaIcons
              borderColor="rgba(0,0,0,0)"
              icon="facebook"
              iconColor="rgba(20,20,20,1)"
              backgroundColor="rgba(26,166,233,0)"
              url="#"
              size="48"
            />
            <ReactSocialMediaIcons
              borderColor="rgba(0,0,0,0)"
              icon="twitter"
              iconColor="rgba(20,20,20,1)"
              backgroundColor="rgba(26,166,233,0)"
              url="#"
              size="48"
            />
            <ReactSocialMediaIcons
              borderColor="rgba(0,0,0,0)"
              icon="pinterest"
              iconColor="rgba(20,20,20,1)"
              backgroundColor="rgba(26,166,233,0)"
              url="#"
              size="48"
            />
          </div>
          <div className="mt-6 text-center md:text-left">
            <div className="flex gap-1 justify-center md:justify-normal">
              <input
                className="newsletter-input px-4 py-3 transition duration-200 ring-2 ring-transparent focus:ring-accent bg-neutral-50 focus:bg-white placeholder:text-neutral-600"
                type="email"
                placeholder="Enter your email..."
              />
              <button className="px-4 py-2 bg-neutral-800 hover:bg-black transition duration-200 text-white">
                Sign up
              </button>
            </div>
            <p className="mt-2">Sign up to our newsletter!</p>
          </div>
        </div>
      </div>
      <div className="bg-zinc-100 p-4">
        <p className="text-center">
          © Copyright 2024 GlassGalore All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
