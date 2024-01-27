import React, { useState } from "react";
import { FaBars, FaUserAlt, FaCommentAlt } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { AiFillFile } from "react-icons/ai";
import { IoLogOutSharp } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./StudentPage.css";
const StudentPage = () => {
  let para=useParams();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const returnClass = () => {
    return isOpen ? "dark-body" : "light-body";
  };

  const returnClass2 = () => {
    return isOpen ? "sidebar-open" : "sidebar-close";
  };
  const menuItem = [
    {
      path: `/student/${para.id}/`,
      name: "About",
      icon: <FaUserAlt />,
    },
    {
      path: `/student/${para.id}/payments`,
      name: "Payments",
      icon: <MdPayments />,
    },
    {
      path: `/student/${para.id}/complaints`,
      name: "Complaints",
      icon: <FaCommentAlt />,
    },
    {
      path: `/student/${para.id}/bonafide`,
      name: "Bonafide",
      icon: <AiFillFile />,
    },
  ];

  const classes = `{container-fluid g-0 d-flex  ${returnClass()}`;

  return (
    <div className={classes}>
      <div style={{ width: isOpen ? "350px" : "50px" }} className="sidebar">
        <div className="top_section">
          <div style={{ marginLeft: "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
          <h1
            style={{ display: isOpen ? "block" : "none", marginLeft: "150px" }}
            className="menu"
          >
            Menu
          </h1>
        </div>
        <div>
          <div>
            {menuItem.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                className="link"
                activeclassName="active"
                title={"mahitha"}
              >
                <div className="icon" title={item.name}>
                  {item.icon}
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  {item.name}
                </div>
              </Link>
            ))}
            <div
              className="profile"
              style={{ width: isOpen ? "350px" : "60px" }}
            >
              <div className="profile_details">
                <img
                  style={{ display: isOpen ? "block" : "none" }}
                  src=""
                  alt="profile"
                />
                <div className="profile_content">
                  <div
                    className="name"
                    style={{ display: isOpen ? "block" : "none" }}
                  >
                    Shravya
                  </div>
                  <div
                    className="designation"
                    style={{ display: isOpen ? "block" : "none" }}
                  >
                    student
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <main className={returnClass2()}>
        <Outlet />
      </main>
    </div>
  );
};

export default StudentPage;
