import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import gsap from "gsap";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const navRef = useRef([]);
  navRef.current = [];

  const addToRefs = (el) => {
    if (el && !navRef.current.includes(el)) {
      navRef.current.push(el);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    }
  }, [isAuthorized]);

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo" ref={addToRefs}>
          <img src="/JobZee-logos__white.png" alt="logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li ref={addToRefs}>
            <Link to={"/"} onClick={() => setShow(false)}>HOME</Link>
          </li>
          <li ref={addToRefs}>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>ALL JOBS</Link>
          </li>
          <li ref={addToRefs}>
            <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {user && user.role === "Employer" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"}
            </Link>
          </li>

          {user && user.role === "Employer" && (
            <>
              <li ref={addToRefs}>
                <Link to={"/job/post"} onClick={() => setShow(false)}>POST NEW JOB</Link>
              </li>
              <li ref={addToRefs}>
                <Link to={"/job/me"} onClick={() => setShow(false)}>VIEW YOUR JOBS</Link>
              </li>
            </>
          )}

          <button onClick={handleLogout} ref={addToRefs}>LOGOUT</button>
        </ul>
        <div className="hamburger" ref={addToRefs}>
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
