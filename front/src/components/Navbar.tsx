import React, { useState } from "react";
import styled from "styled-components";

import { Navigate } from "react-router-dom";
import { useAuth } from "../services/Auth";

const NavBar = styled.nav`
  width: 100%;
  margin-top: -1em;
  margin-left: -1em;

  background-color: #333;
  padding: 10px 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 20px 20px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const NavItems = styled.ul<{ isOpen: boolean }>`
  list-style: none;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 20px;
    display: ${(props) => (props.isOpen ? "flex" : "none")};
  }
`;

const NavItem = styled.li`
  margin-left: 20px;
  cursor: pointer;

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: white;
  &:hover {
    text-decoration: underline;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    // Redirige al usuario a la página de inicio de sesión después de cerrar sesión
    return <Navigate to="/login" />;
  };

  return (
    <NavBar>
      <MenuButton onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="white"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z" />
        </svg>
      </MenuButton>
      <NavItems isOpen={isOpen}>
        <NavItem>
          <NavLink href="/#">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/dashboard">Dashboard</NavLink>
        </NavItem>
        {isAuthenticated && (
          <NavItem>
            <NavLink href="#" onClick={handleLogout}>
              Cerrar sesión
            </NavLink>
          </NavItem>
        )}
      </NavItems>
    </NavBar>
  );
};

export default Navbar;
