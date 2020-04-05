import React from 'react';
import {Redirect, RouteComponentProps, Router} from "@reach/router";
import styled from "styled-components";
import NewOrder from "./NewOrder";
import Shipment from "./Shipment";
import Payment from "./Payment";
import OrderConfirmation from "./OrderConfirmation";

type AppProps = RouteComponentProps;

const App = (props: AppProps) => {
    return (
        <Router>
            <NewOrder path={"/new-order"}/>
            <Shipment path={"/shipment"} />
            <Payment path={"/payment"} />
            <OrderConfirmation path={"/order-confirmation"} />
            <Redirect noThrow from={"/"} to={"/app/new-order"} />
        </Router>
    );
};

export default App;
