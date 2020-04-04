import React from 'react';
import styled from "styled-components";
import Container from "./Container";


const NavbarWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    // background: #FFECE6;
`;
const Nav = styled.nav`
    display: flex;
    align-items: center;
    padding: 2em 0;
    font-family: Sen;
`;
const Brand = styled.span`
    font-size: 2em;
    color: ${props => props.theme.colors.primary};
`;
const Menu = styled.ul`
    display: flex;
    align-items: center;
    margin: 0;
`;
const MenuItem = styled.li`
    display: block;
    font-size: 1.1em;
    margin: 0 1em;
`;
const Navbar = () => {
    return (
        <NavbarWrapper>
            <Container>
                <Nav>
                    <Brand>Outwork.</Brand>
                    <Menu>
                        <MenuItem>Home</MenuItem>
                        <MenuItem>App</MenuItem>
                    </Menu>
                </Nav>
            </Container>
        </NavbarWrapper>
    );
};

export default Navbar;
