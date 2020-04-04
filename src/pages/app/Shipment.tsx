import React, {FormEvent, SyntheticEvent, useState} from "react";
import {navigate, RouteComponentProps} from "@reach/router";
import SEO from "../../components/SEO";
import styled from "styled-components";
import Container from "../../components/Container";
import {Button, Input, InputAddonGroup, InputGroup, Select} from "../../components/FormControls";
import {useForm} from "react-hook-form";

const RowGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1em;
`
const Centered = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const SavedPlaceSelect = styled(Select)`
    width: 50%;
    display: block;
    margin: auto;
    border-radius: 2em;
    padding: 5px;
    option{
        text-align: center;
    }
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
`
const savedPlaces = [
    {
        name: 'Dom',
        id: "home",
        data: {
            recipient: 'Jan Kowalski',
            street: 'Wiśniowa',
            houseNo: 19,
            apartmentNo: 12,
            notes: ''
        }
    }
]
type CreateWorkspaceProps = RouteComponentProps
const Shipment = (props: CreateWorkspaceProps) => {
    const { register, handleSubmit, watch, setValue } = useForm();
    const savedPlace = watch('savedPlace');
    if(savedPlace !== 'select'){
        const place = savedPlaces.find((x: any) => x.id === savedPlace);
        // Object.entries(place ? place.data: {}).forEach((key: any, value: any) => {
        //     setValue(key, value)
        // })
    }
    const saveShipment = (values: any) => {
        navigate('/app/payment');
    }
    return (
        <>
            <SEO title={"Nowe zamówienie"}/>
            <Container>
                <h1>Adres</h1>
                <form onSubmit={handleSubmit(saveShipment)}>
                    <Separator>
                        <span>Wybierz z zapisanych miejsc</span>
                    </Separator>
                    <SavedPlaceSelect ref={register} name={"savedPlace"}>
                        <option value="select" disabled selected>Wybierz</option>
                        <option value="home">Dom</option>
                    </SavedPlaceSelect>
                    <Separator>
                        <span>lub uzupełnij</span>
                    </Separator>
                    <InputGroup>
                        <label>Odbiorca</label>
                        <Input ref={register({
                            required: true
                        })} name={"recipient"} />
                    </InputGroup>
                    <InputGroup>
                        <label>Ulica</label>
                        <Input ref={register({
                            required: true
                        })} name={"street"} />
                    </InputGroup>
                    <InputGroup>
                    <RowGrid>
                        <div>
                                <label>Nr budynku</label>
                                <Input ref={register({
                                    required: true
                                })} name={"houseNo"} />
                        </div>
                        <div>
                                <label>Nr lokalu</label>
                                <Input ref={register({
                                    required: true
                                })} name={"apartmentNo"}/>
                        </div>
                    </RowGrid>
                    </InputGroup>
                    <InputGroup>
                        <label>Notatki</label>
                        <Input as={"textarea"} ref={register} name={"notes"} />
                    </InputGroup>
                <Centered>
                    <Button>Złóż zamówienie</Button>
                </Centered>
                </form>
            </Container>
        </>
    )
}

export default  Shipment
