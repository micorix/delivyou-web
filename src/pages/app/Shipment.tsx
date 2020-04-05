import React, {FormEvent, SyntheticEvent, useEffect, useState} from "react";
import {navigate, RouteComponentProps} from "@reach/router";
import SEO from "../../components/SEO";
import styled from "styled-components";
import Container from "../../components/Container";
import {Button, Input, InputAddonGroup, InputGroup, Select} from "../../components/FormControls";
import {useForm} from "react-hook-form";
import {Separator} from "../../components/Utils";
import AppLayout from "../../components/AppLayout";

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
    useEffect(() => {
    if(savedPlace !== 'select'){
            const place = savedPlaces.find((x: any) => x.id === savedPlace);
            Object.entries(place ? place.data: {}).forEach(([key, value]) => {
                setValue(key, value)
            })
        }
    }, [savedPlace])
    const saveShipment = (values: any) => {
        navigate('/app/payment');
    }
    return (
        <AppLayout goBack={"/app/new-order"}>
            <SEO title={"Nowe zamówienie"}/>
            <Container>
                <h1>Adres</h1>
                <form onSubmit={handleSubmit(saveShipment)}>
                    <Separator text={"Wybierz z zapisanych miejsc"}/>
                    <SavedPlaceSelect ref={register} name={"savedPlace"} defaultValue={"select"}>
                        <option value="select" disabled>Wybierz</option>
                        <option value="home">Dom</option>
                    </SavedPlaceSelect>
                    <Separator text={"lub uzupełnij"}/>
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
                                <Input ref={register} name={"apartmentNo"}/>
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
        </AppLayout>
    )
}

export default  Shipment
