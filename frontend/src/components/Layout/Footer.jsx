import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import gsap from "gsap";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  const footerRef = useRef([]);
  footerRef.current = [];

  const addToRefs = (el) => {
    if (el && !footerRef.current.includes(el)) {
      footerRef.current.push(el);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      gsap.from(footerRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "bounce.out",
      });
    }
  }, [isAuthorized]);

  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div ref={addToRefs}>
        &copy; All Rights Reserved By Er. Atul Pratap Singh.
      </div>
      <div>
        <Link
          to={"https://www.facebook.com/atulpratap.singh.54738943"}
          target="_blank"
          ref={addToRefs}
        >
          <FaFacebookF />
        </Link>
        <Link
          to={"https://www.youtube.com/@atulcreation6910"}
          target="_blank"
          ref={addToRefs}
        >
          <FaYoutube />
        </Link>
        <Link
          to={"https://www.linkedin.com/in/atulpratapsingh944/"}
          target="_blank"
          ref={addToRefs}
        >
          <FaLinkedin />
        </Link>
        <Link
          to={"https://www.instagram.com/atul_pratap_singh___/"}
          target="_blank"
          ref={addToRefs}
        >
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
