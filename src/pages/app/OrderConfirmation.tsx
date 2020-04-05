import React from "react";
import {navigate, RouteComponentProps} from "@reach/router";
import SEO from "../../components/SEO";
import styled from "styled-components";
import Container from "../../components/Container";
import {Button} from "../../components/FormControls";
import AppLayout from "../../components/AppLayout";
import {makeAction} from "../../store/makeAction";
import {RESET} from "../../store/actions";
import {connect} from "react-redux";

const Header = styled.h1`
    text-align: center;
`;

type OrderConfirmationProps = RouteComponentProps & {
    reset: any
}
const OrderConfirmation = (props: OrderConfirmationProps) => {
    const complete = () => {
        props.reset()
        navigate('/app')
    }
    return (
        <AppLayout goBack={false}>
            <SEO title={"Zamówienie zostało przyjęte"}/>
            <Container>
                <Header>Zamówienie zostało przyjęte</Header>
                <Button onClick={complete}>Ok</Button>
            </Container>
        </AppLayout>
    )
}

const mapDispatchToProps = {
    reset: makeAction(RESET)
};

export default connect(null, mapDispatchToProps)(OrderConfirmation);
