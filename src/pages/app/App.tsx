import React from 'react';
import {Redirect, RouteComponentProps, Router} from "@reach/router";
import styled from "styled-components";
import NewOrder from "./NewOrder";
import Shipment from "./Shipment";
import Payment from "./Payment";
import OrderConfirmation from "./OrderConfirmation";

type AppLayoutProps = RouteComponentProps;
const Layout = styled.div`
    height: 100vh;
`;
const Toolbar = styled.div`
    padding: 1em 10px;
    margin-bottom: 1em;
    border-bottom: 1px solid #aaa;
    h4{
        text-align: center;
        margin: 0;
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
                <Redirect from={"/"} to={"/app/new-order"} />
            </Router>
        </Layout>
    );
};

export default AppLayout;
