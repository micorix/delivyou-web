import React from 'react';
import {Redirect, RouteComponentProps, Router} from "@reach/router";
import styled from "styled-components";
import NewOrder from "./NewOrder";
import Shipment from "./Shipment";
import Payment from "./Payment";
import OrderConfirmation from "./OrderConfirmation";

type AppLayoutProps = RouteComponentProps;
const Layout = styled.div`
    min-height: calc(100vh - 2em);
    padding-bottom: 2em;
    h1{
        font-size: 1.2em;
    }
`;
const Toolbar = styled.div`
    padding: 1em 10px;
    margin-bottom: 1em;
    background: #4E37B2;
    border-bottom-left-radius: 4em;
    border-bottom-right-radius: 4em;
    color: white;
    h4{
        text-align: center;
        margin: 0;
        font-size: 1.2em;
    }
`
const AppLayout = (props: AppLayoutProps) => {
    return (
        <Layout>
            <Toolbar>
                <h4>DelivYou</h4>
            </Toolbar>
            <Router>
                <NewOrder path={"/new-order"}/>
                <Shipment path={"/shipment"} />
                <Payment path={"/payment"} />
                <OrderConfirmation path={"/order-confirmation"} />
                <Redirect noThrow from={"/"} to={"/app/new-order"} />
            </Router>
        </Layout>
    );
};

export default AppLayout;
