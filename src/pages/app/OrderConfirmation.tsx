import React, {FormEvent, SyntheticEvent, useState} from "react";
import {navigate, RouteComponentProps} from "@reach/router";
import SEO from "../../components/SEO";
import styled from "styled-components";
import Container from "../../components/Container";
import {Button, Input, InputAddonGroup, InputGroup, Select} from "../../components/FormControls";
import AppLayout from "../../components/AppLayout";

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
const Header = styled.h1`
    text-align: center;
`
type CreateWorkspaceProps = RouteComponentProps
const OrderConfirmation = (props: CreateWorkspaceProps) => {
    const complete = () => {
        navigate('/app')
    }
    return (
        <AppLayout goBack={false}>
            <SEO title={"Nowe zamówienie"}/>
            <Container>
                <Header>Zamówienie zostało przyjęte</Header>
                <Centered>
                    <Button onClick={complete}>Ok</Button>
                </Centered>
            </Container>
        </AppLayout>
    )
}

export default  OrderConfirmation
