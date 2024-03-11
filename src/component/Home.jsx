import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5, duration: 1.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="home-container"
    >
      <h1>
        Welcome to{" "}
        <motion.span variants={itemVariants}>GupChup Chat App</motion.span>
      </h1>
      <p>
        GupChup is a highly secure chat web application that allows you to
        connect with friends and family. Enjoy seamless communication with
        end-to-end encryption for your privacy.
      </p>
      <motion.h2 variants={itemVariants}>Key Features:</motion.h2>
      <motion.ul variants={itemVariants}>
        <motion.li>Secure and private messaging</motion.li>
        <motion.li>Real-time chat</motion.li>
        <motion.li>Easy-to-use interface</motion.li>
        {/* Add more features here */}
      </motion.ul>
      <p>
        Get started by navigating to the{" "}
        <Link to="/login">
          <motion.span whileHover={{ scale: 1.1, color: "#4CAF50" }}>
            Login
          </motion.span>
        </Link>{" "}
        page and follow the steps to create your account and start chatting
        securely!
      </p>
    </motion.div>
  );
};

export default Home;
