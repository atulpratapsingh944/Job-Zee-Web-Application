import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    { id: 1, title: "1,23,441", subTitle: "Live Job", icon: <FaSuitcase /> },
    { id: 2, title: "91220", subTitle: "Companies", icon: <FaBuilding /> },
    { id: 3, title: "2,34,200", subTitle: "Job Seekers", icon: <FaUsers /> },
    { id: 4, title: "1,03,761", subTitle: "Employers", icon: <FaUserPlus /> },
  ];

  const imageRef = useRef(null);
  const titleRefs = useRef([]);
  titleRefs.current = [];

  const addToTitleRefs = (el) => {
    if (el && !titleRefs.current.includes(el)) {
      titleRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Animate image with a slight delay
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        delay: 1,
        ease: "power3.out",
      }
    );

    // Animate text from right to left with delay and stagger
    gsap.fromTo(
      titleRefs.current,
      { opacity: 0, x: 120 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        stagger: 0.6,
        delay: 0.4,
        ease: "power3.out",
      }
    );

    // Image hover animations
    const img = imageRef.current;
    const handleImgEnter = () => {
      gsap.to(img, {
        scale: 1.1,
        duration: 1.2,
        ease: "power3.out",
        force3D: true,
      });
    };
    const handleImgLeave = () => {
      gsap.to(img, {
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        force3D: true,
      });
    };
    img.addEventListener("mouseenter", handleImgEnter);
    img.addEventListener("mouseleave", handleImgLeave);

    // Title hover animations
    titleRefs.current.forEach((el) => {
      const handleTitleEnter = () => {
        gsap.to(el, {
          scale: 1.05,
          duration: 0.6,
          ease: "power1.out",
        });
      };
      const handleTitleLeave = () => {
        gsap.to(el, {
          scale: 1,
          duration: 0.6,
          ease: "power1.out",
        });
      };
      el.addEventListener("mouseenter", handleTitleEnter);
      el.addEventListener("mouseleave", handleTitleLeave);

      return () => {
        el.removeEventListener("mouseenter", handleTitleEnter);
        el.removeEventListener("mouseleave", handleTitleLeave);
      };
    });

    return () => {
      img.removeEventListener("mouseenter", handleImgEnter);
      img.removeEventListener("mouseleave", handleImgLeave);
    };
  }, []);

  return (
    <>
      <style>{`
        .title h1 {
          cursor: pointer;
          display: inline-block;
          margin-right: 0.3rem;
          will-change: transform;
        }
        .title p {
          will-change: transform;
        }
        .image img {
          cursor: pointer;
          display: block;
          max-width: 100%;
          will-change: transform;
        }
      `}</style>

      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1 ref={addToTitleRefs}>Find a job that suits</h1>
            <h1 ref={addToTitleRefs}>your interests and skills</h1>
            <p ref={addToTitleRefs}>
              Discover exciting opportunities in tech — from frontend development
              to backend engineering. Start your journey with companies looking
              for passionate coders like you!
            </p>
          </div>
          <div className="image">
            <img ref={imageRef} src="/heroS.jpg" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => (
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="content">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
