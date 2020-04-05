import React, {FormEvent, SyntheticEvent, useState} from "react";
import {navigate, RouteComponentProps} from "@reach/router";
import SEO from "../../components/SEO";
import styled from "styled-components";
import Container from "../../components/Container";
import {Button, Input, InputAddonGroup, InputGroup, Select} from "../../components/FormControls";
import {Separator} from "../../components/Utils";
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
`;
const RowGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1em;
    margin-bottom: 2em;
`
type CreateWorkspaceProps = RouteComponentProps
const Payment = (props: CreateWorkspaceProps) => {
    const complete = () => {
        navigate('/app/order-confirmation')
    }
    return (
        <AppLayout goBack={"/app/shipment"}>
            <SEO title={"Nowe zamówienie"}/>
            <Container>
                <h1>Czas dostawy</h1>
                <RowGrid>
                    <div>
                        <Select>
                            <option>Niedziela 5.04</option>
                            <option>Poniedziałek 6.04</option>
                            <option>Wtorek 7.04</option>
                            <option>Środa 8.04</option>
                            <option>Czwartek 9.04</option>
                            <option>Piątek 10.04</option>
                        </Select>
                    </div>
                    <div>
                        <Select>
                            <option>8:00-9:00</option>
                            <option>9:00-10:00</option>
                            <option>10:00-11:00</option>
                            <option>11:00-12:00</option>
                            <option>12:00-13:00</option>
                            <option>13:00-14:00</option>
                            <option>14:00-15:00</option>
                            <option>15:00-16:00</option>
                            <option>16:00-17:00</option>
                            <option>17:00-18:00</option>
                            <option>18:00-19:00</option>
                            <option>19:00-20:00</option>
                            <option>20:00-21:00</option>
                            <option>21:00-22:00</option>
                        </Select>
                    </div>
                </RowGrid>
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
        </AppLayout>
    )
}

export default  Payment
