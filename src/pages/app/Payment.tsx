import React, {FormEvent, SyntheticEvent, useState} from "react";
import {navigate, RouteComponentProps} from "@reach/router";
import SEO from "../../components/SEO";
import styled from "styled-components";
import Container from "../../components/Container";
import {Button, Input, InputAddonGroup, InputGroup, Select} from "../../components/FormControls";
import {Separator} from "../../components/Utils";

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
    outline: none;
    .material-icons{
        margin-right: 10px;
    }
    &:hover{
        background: rgba(0,0,0,0.05);
    }
`
type CreateWorkspaceProps = RouteComponentProps
const Payment = (props: CreateWorkspaceProps) => {
    const complete = () => {
        navigate('/app/order-confirmation')
    }
    return (
        <>
            <SEO title={"Nowe zamówienie"}/>
            <Container>
                <h1>Wybierz formę płatności</h1>
                <CardItem>
                    <span className="material-icons">credit_card</span>
                    <span className="card">karta</span>
                    <span className="no">**** 1234</span>
                </CardItem>
                <Separator text={"lub"} />
                <AddCardButton>
                    <span className="material-icons">add</span>
                    <span className="action">Dodaj kartę</span>
                </AddCardButton>
                <Centered>
                    <Button onClick={complete}>Zapłać</Button>
                </Centered>
            </Container>
        </>
    )
}

export default  Payment
