import React from "react";
import { Container, Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Header = () => {
  return (
    <Container fluid style={{ margin: "20px 0" }}>
      <h1 style={{ fontSize: "60px", fontWeight: "200" }}>Music Library</h1>
    </Container>
  );
};

export default Header;
