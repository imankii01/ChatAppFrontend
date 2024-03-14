import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Home.css";
import { FaBehance, FaDribbble } from "react-icons/fa";
import { IoMailOutline, IoChevronForwardCircle, IoStar } from "react-icons/io5";
import { IconContext } from "react-icons";
import Card from "./Cards";
import Login from "./Login";
import { Modal } from "antd";

const Home = () => {
  let easeing = [0.6, -0.05, 0.01, 0.99];

  const stagger = {
    animate: {
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  };

  const fadeInUp = {
    initial: {
      y: -60,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: easeing,
      },
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: easeing,
      },
    },
  };
  const appTitleVariants = {
    initial: {
      y: -20,
    },
    animate: {
      y: 0,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.04,
        staggerDirection: -1,
      },
    },
    exit: {
      y: -20,
      transition: {
        staggerChildren: 0.04,
        staggerDirection: -1,
      },
    },
  };
  const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

  const firstName = {
    initial: {
      y: -20,
    },
    animate: {
      y: 0,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.04,
        staggerDirection: -1,
        repeat: Infinity, // Add repeat property for continuous animation
        repeatDelay: 2, // Delay before the animation starts again
      },
    },
    exit: {
      y: -20,
      transition: {
        delay: 2, // Delay before the animation starts again
        staggerChildren: 0.04,
        staggerDirection: -1,
      },
    },
  };

  const lastName = {
    initial: {
      y: -20,
    },
    animate: {
      y: 0,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.04,
        staggerDirection: 1,
        repeat: Infinity, // Add repeat property for continuous animation
        repeatDelay: 2, // Delay before the animation starts again
      },
    },
  };

  const letter = {
    initial: {
      y: 400,
    },
    animate: {
      y: 0,
      transition: { duration: 1, ...transition },
    },
  };

  const btnGroup = {
    initial: {
      y: -60,
      opacity: 0,
      transition: { duration: 0.6, ease: easeing },
    },
    animate: {
      y: 0,
      opacity: 1,
      animation: {
        duration: 0.6,
        ease: easeing,
      },
    },
  };
  const star = {
    initial: {
      y: 60,
      opacity: 0,
      transition: { duration: 0.8, ease: easeing },
    },
    animate: {
      y: 0,
      opacity: 1,
      animation: {
        duration: 0.6,
        ease: easeing,
      },
    },
  };

  const header = {
    initial: {
      y: -60,
      opacity: 0,
      transition: { duration: 0.05, ease: easeing },
    },
    animate: {
      y: 0,
      opacity: 1,
      animation: {
        duration: 0.6,
        ease: easeing,
      },
    },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div initial="initial" animate="animate">
        <motion.header variants={stagger}>
          <motion.div className="logo_wrapper" variants={header}>
            Gup<span>Chup</span>
          </motion.div>
          <motion.div className="menu_container" variants={stagger}>
            <motion.span variants={header}>
              <IconContext.Provider
                value={{
                  color: "#000",
                  size: "18px",
                  className: "icons_container",
                }}
              >
                <div className="icon">
                  <FaBehance />
                </div>
                <div className="icon">
                  <FaDribbble />
                </div>
              </IconContext.Provider>
            </motion.span>
            <motion.span variants={header}>
              <IconContext.Provider value={{ color: "#000", size: "18px" }}>
                <div className="icon">
                  <IoMailOutline />
                </div>
                gupchup161@gmail.com
              </IconContext.Provider>
            </motion.span>
            <motion.span className="menu" variants={header}>
              <span></span>
              <span></span>
              <span></span>
            </motion.span>
          </motion.div>
        </motion.header>

        <motion.div
          className="content_wrapper"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: easeing }}
        >
          <div className="left_content_wrapper">
            <motion.h2>
              <motion.span
                variants={firstName}
                initial="initial"
                animate="animate"
                className="first"
              >
                <motion.span variants={letter}>G</motion.span>
                <motion.span variants={letter}>u</motion.span>
                <motion.span variants={letter}>p</motion.span>
                <motion.span variants={letter}>C</motion.span>
                <motion.span variants={letter}>h</motion.span>
                <motion.span variants={letter}>u</motion.span>
                <motion.span variants={letter}>p</motion.span>
                <motion.span variants={letter} className="second">
                  H
                </motion.span>
                <motion.span variants={letter}>i</motion.span>
                <motion.span variants={letter}>g</motion.span>
                <motion.span variants={letter}>h</motion.span>
                <motion.span variants={letter}>l</motion.span>
                <motion.span variants={letter}>y</motion.span>
              </motion.span>
              <motion.span
                variants={lastName}
                initial="initial"
                animate="animate"
                className="last"
              >
                <motion.span variants={letter}>S</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>c</motion.span>
                <motion.span variants={letter}>u</motion.span>
                <motion.span variants={letter}>r</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter} className="second">
                  C
                </motion.span>
                <motion.span variants={letter}>h</motion.span>
                <motion.span variants={letter}>a</motion.span>
                <motion.span variants={letter}>t</motion.span>
                <motion.span variants={letter} className="second">
                  A
                </motion.span>
                <motion.span variants={letter}>p</motion.span>
                <motion.span variants={letter}>p</motion.span>
              </motion.span>
            </motion.h2>

            <motion.p variants={fadeInUp}>
              Join GupChup today and experience seamless communication with{" "}
              <br /> the peace of mind that your conversations are protected by
              top-notch security measures
            </motion.p>

            <motion.div className="btn_group" variants={stagger}>
              <motion.div
                className="btn btn_primary"
                variants={btnGroup}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={showModal}
              >
                Login
                <IconContext.Provider
                  value={{ color: "#14da8f", size: "25px" }}
                >
                  <IoChevronForwardCircle />
                </IconContext.Provider>
              </motion.div>
              <motion.div
                className="btn btn_secondary"
                variants={btnGroup}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={showModal}
              >
                Singup
              </motion.div>
            </motion.div>

            <motion.div className="review_container" variants={stagger}>
              <motion.p className="total_review" variants={star}>
                64+ Reviews
              </motion.p>
              <IconContext.Provider value={{ color: "#fff", size: "18px" }}>
                <motion.span
                  variants={star}
                  whileHover={{
                    scale: 1.2,
                    rotate: 180,
                    borderRadius: "100%",
                    cursor: "pointer",
                  }}
                >
                  <IoStar />
                </motion.span>
                <motion.span
                  variants={star}
                  whileHover={{
                    scale: 1.2,
                    rotate: 180,
                    borderRadius: "100%",
                    cursor: "pointer",
                  }}
                >
                  <IoStar />
                </motion.span>
                <motion.span
                  variants={star}
                  whileHover={{
                    scale: 1.2,
                    rotate: 180,
                    borderRadius: "100%",
                    cursor: "pointer",
                  }}
                >
                  <IoStar />
                </motion.span>
                <motion.span
                  variants={star}
                  whileHover={{
                    scale: 1.2,
                    rotate: 180,
                    borderRadius: "100%",
                    cursor: "pointer",
                  }}
                >
                  <IoStar />
                </motion.span>
                <motion.span
                  variants={star}
                  whileHover={{
                    scale: 1.2,
                    rotate: 180,
                    borderRadius: "100%",
                    cursor: "pointer",
                  }}
                >
                  <IoStar />
                </motion.span>
              </IconContext.Provider>
              <motion.p className="more_review" variants={star}>
                More then 50+ people taking services.
              </motion.p>
            </motion.div>
          </div>

          <motion.div className="right_content_wrapper">
            <motion.img
              src="https://academy.avast.com/hs-fs/hubfs/New_Avast_Academy/the_most_secure_messaging_apps_academy/secure-messaging-01.png?width=1320&height=600&name=secure-messaging-01.png"
              alt="bg"
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            />
          </motion.div>
        </motion.div>

        <Card />
      </motion.div>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Login />
      </Modal>
    </motion.div>
    </>
  );
};

export default Home;
