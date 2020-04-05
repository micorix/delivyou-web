import React from "react";
import {navigate, RouteComponentProps} from "@reach/router";
import SEO from "../../components/SEO";
import styled from "styled-components";
import Container from "../../components/Container";
import {Button, Input, InputAddonGroup, InputGroup, Select} from "../../components/FormControls";
import AppLayout from "../../components/AppLayout";
import {makeAction} from "../../store/makeAction";
import {RESET} from "../../store/actions";
import {connect} from "react-redux";


const Centered = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Header = styled.h1`
    text-align: center;
`;
const Calc = styled.div`
    background: ${props => props.theme.colors.primary};
    border-radius: 10px;
    padding: 10px 1em;
    margin-top: 2em;
    color: white;
`;
const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    &:last-of-type{
        margin-top: 10px;
        padding-top: 20px;
        border-top: 2px solid white;
        font-weight: bold;
    }
`
type OrderConfirmationProps = RouteComponentProps & {
    persistedItems: any
    reset: any
}
const OrderConfirmation = (props: OrderConfirmationProps) => {
    console.log(props)
    const shoppingPrice = props.persistedItems.reduce((prev: number, curr: any) => curr.quantity * curr.price, 0);
    const complete = () => {
        props.reset();
        navigate('/app')
    }
    return (
        <AppLayout goBack={false}>
            <SEO title={"Nowe zamówienie"}/>
            <Container>
                <Header>Zamówienie zostało przyjęte</Header>
                <Calc>
                    <Row>
                        <span>Koszt zakupów</span>
                        <span>{shoppingPrice} zł</span>
                    </Row>
                    <Row>
                        <span>Cena dostawy</span>
                        <span>7 zł</span>
                    </Row>
                    <Row>
                        <span>Razem</span>
                        <span>{shoppingPrice+7} zł</span>
                    </Row>
                </Calc>
                <Centered>
                    <Button onClick={complete}>Ok</Button>
                </Centered>
            </Container>
        </AppLayout>
    )
}
const mapStateToProps = (state: any) => ({
    persistedItems: state.items
});
const mapDispatchToProps = {
    reset: makeAction(RESET)
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation);
