import React from "react";

const Header = ({ title }) => {
  return (
    <div className="header">
      {title || "Insurance Policy Manager"}
    </div>
  );
};

export default Header;
