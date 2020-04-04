import React from 'react';
import {RouteComponentProps} from "@reach/router";
import styled from "styled-components";
import Container from "../components/Container";
import SEO from "../components/SEO";
import Navbar from "../components/Navbar";

type LandingPageProps = RouteComponentProps;

const Hero = styled.div`
    background: url('${require('../design/assets/blob1.svg')}');
    background-repeat: no-repeat;
    // clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
    min-height: 100vh;
    background-position: 0 100%;
    background-size: 100vw;
    position: relative;
   &::after{

        display: block;
        position: absolute;
        background:#FFC8B8;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
        opacity: 0.5;
    }
    div{
        padding-top: 20vh;
        // display: flex;
        // justify-content: center;
    }
    h1{
    
        font-size: 10em;
        font-family: Sen;
        margin-top: 0;
        font-weight: normal;
        text-align: left;

        span{
            background: linear-gradient(#FEA345, #FED82C);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
        }
        .brand{
            color: #1D2583;
        }
    }
`;
const AboutSection = styled.div`
    margin-top: 15vh;
    position: relative;
    background: #fee598;
    height: 30vh;
    &::after{
        content: '';
        display: block;
        position: absolute;
        bottom: 100%;
        left: 0;
        width: 100%;
        height: 20vh;
        background: url('${require('../design/assets/wave1.svg')}');
        background-size: cover;
        background-repeat:no-repeat;
    }
`;
const LandingPage = (props: LandingPageProps) => {
    return (
        <>
        <SEO title={"Home"}/>
        <Navbar/>
        <Hero>
                <Container>
                    <h1><span className="brand">Outwork.</span> <br/> <span>just simplified.</span></h1>
                    <p>
                        Gubisz się w systemie e-edukacji? Tyle narzędzi, tyle grup do sprawdzania.
                        Zrobimy to za Ciebie
                    </p>
                </Container>
        </Hero>
        <AboutSection>
            <Container>
                <h2>Jak to działa?</h2>
            </Container>
        </AboutSection>
            </>
    );
};

export default LandingPage;
