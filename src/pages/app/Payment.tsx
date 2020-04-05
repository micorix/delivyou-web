import React from "react";
import {navigate, RouteComponentProps} from "@reach/router";
import SEO from "../../components/SEO";
import styled from "styled-components";
import Container from "../../components/Container";
import {Button, Select} from "../../components/FormControls";
import {Separator} from "../../components/Utils";
import AppLayout from "../../components/AppLayout";
import {makeAction} from "../../store/makeAction";
import {SAVE_DELIVERY_DATA} from "../../store/actions";
import {connect} from "react-redux";
import {useForm} from "react-hook-form";

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
type PaymentProps = RouteComponentProps & {
    persistData: any
    persistedItems: any
    persistedData: any
}
const Payment = (props: PaymentProps) => {
    const { register, handleSubmit} = useForm({
        defaultValues: props.persistedData
    });
    const shoppingPrice = props.persistedItems.reduce((prev: number, curr: any) => prev+(curr.quantity * curr.price), 0);

    const complete = (values: any) => {
        props.persistData(values);
        navigate('/app/order-confirmation')
    }
    return (
        <AppLayout goBack={"/app/shipment"}>
            <SEO title={"Nowe zamówienie - Płatność"}/>
            <Container>
                <form onSubmit={handleSubmit(complete)}>
                <h1>Czas dostawy</h1>
                <RowGrid>
                    <div>
                        <Select name={"date"} ref={register}>
                            <option value={"nd"}>Niedziela 5.04</option>
                            <option value={"pn"}>Poniedziałek 6.04</option>
                            <option value={"wt"}>Wtorek 7.04</option>
                            <option value={"sr"}>Środa 8.04</option>
                            <option value={"cz"}>Czwartek 9.04</option>
                            <option value={"pt"}>Piątek 10.04</option>
                        </Select>
                    </div>
                    <div>
                        <Select name={"time"} ref={register}>
                            <option value={"8"}>8:00-9:00</option>
                            <option value={"9"}>9:00-10:00</option>
                            <option value={"10"}>10:00-11:00</option>
                            <option value={"11"}>11:00-12:00</option>
                            <option value={"12"}>12:00-13:00</option>
                            <option value={"13"}>13:00-14:00</option>
                            <option value={"14"}>14:00-15:00</option>
                            <option value={"15"}>15:00-16:00</option>
                            <option value={"16"}>16:00-17:00</option>
                            <option value={"17"}>17:00-18:00</option>
                            <option value={"18"}>18:00-19:00</option>
                            <option value={"19"}>19:00-20:00</option>
                            <option value={"20"}>20:00-21:00</option>
                            <option value={"21"}>21:00-22:00</option>
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
                    <Calc>
                        <Row>
                            <span>Koszt zakupów</span>
                            <span>{shoppingPrice.toFixed(2)} zł</span>
                        </Row>
                        <Row>
                            <span>Cena dostawy</span>
                            <span>7 zł</span>
                        </Row>
                        <Row>
                            <span>Razem</span>
                            <span>{(shoppingPrice+7).toFixed(2)} zł</span>
                        </Row>
                    </Calc>
                <Centered>
                    <Button type={"submit"}>Zapłać</Button>
                </Centered>
                </form>
            </Container>
        </AppLayout>
    )
}

const mapStateToProps = (state: any) => ({
    persistedData: state.deliveryData,
    persistedItems: state.items
});
const mapDispatchToProps = {
    persistData: makeAction(SAVE_DELIVERY_DATA)
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
