import React, {FormEvent, SyntheticEvent, useState} from "react";
import {navigate, RouteComponentProps} from "@reach/router";
import SEO from "../../components/SEO";
import styled from "styled-components";
import Container from "../../components/Container";
import {Button, Input, InputAddonGroup, InputGroup, Select} from "../../components/FormControls";

const CardItem = styled.div`
    border: 2px solid ${props => props.theme.colors.primary};
    padding: 10px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Centered = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Separator = styled.div`
    margin: 1em 0;
    text-align: center;
    position: relative;
    span{
        background: #e5e5e5;
        padding: 0 10px;
        color: rgba(0, 0, 0, 0.8);
        font-size: .8em;
    }
    &::after{
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 1px;
        background: rgba(0, 0, 0, 0.2);
        z-index: -1;
    }
`;
const AddCardButton = styled.button`
    background: none;
    border: none;
    border-radius: 3px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    margin-top: 1em;
    transition: .2s all;
    .material-icons{
        margin-right: 10px;
    }
    &:hover{
        background: rgba(0,0,0,0.05);
    }
`
type CreateWorkspaceProps = RouteComponentProps
const OrderConfirmation = (props: CreateWorkspaceProps) => {
    const complete = () => {
        navigate('/app')
    }
    return (
        <>
            <SEO title={"Nowe zamówienie"}/>
            <Container>
                <h1>Zamówienie zostało przyjęte</h1>
                <Centered>
                    <Button onClick={complete}>Ok</Button>
                </Centered>
            </Container>
        </>
    )
}

export default  OrderConfirmation
