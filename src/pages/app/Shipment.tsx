import React, {useEffect} from "react";
import {navigate, RouteComponentProps} from "@reach/router";
import SEO from "../../components/SEO";
import styled from "styled-components";
import Container from "../../components/Container";
import {Button, Input, InputGroup, Select} from "../../components/FormControls";
import {useForm} from "react-hook-form";
import {Separator} from "../../components/Utils";
import AppLayout from "../../components/AppLayout";
import {makeAction} from "../../store/makeAction";
import {SAVE_SHIPPING_DATA} from "../../store/actions";
import {connect} from "react-redux";
import savedPlaces, {SavedPlace} from "../../data/savedPlaces";

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

type ShipmentProps = RouteComponentProps & {
    persistData: any
    persistedData: any
}
const Shipment = (props: ShipmentProps) => {
    const { register, handleSubmit, watch, setValue, errors } = useForm({
        defaultValues: props.persistedData
    });
    const savedPlace = watch('savedPlace');
    useEffect(() => {
    if(savedPlace !== 'select'){
            const place = savedPlaces.find((x: SavedPlace) => x.id === savedPlace);
            Object.entries(place ? place.data: {}).forEach(([key, value]) => {
                setValue(key, value)
            })
        }
    }, [savedPlace, setValue])
    const saveShipment = (values: any) => {
        const {savedPlace, ...data} = values;
        props.persistData(data);
        navigate('/app/payment');
    }
    return (
        <AppLayout goBack={"/app/new-order"}>
            <SEO title={"Nowe zamówienie - Adres"}/>
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
                        <Input
                            ref={register({
                                required: true
                            })}
                            error={Boolean(errors.recipient)}
                            name={"recipient"} />
                    </InputGroup>
                    <InputGroup>
                        <label>Ulica</label>
                        <Input
                            ref={register({
                            required: true
                            })}
                            error={Boolean(errors.street)}
                            name={"street"} />
                    </InputGroup>
                    <InputGroup>
                    <RowGrid>
                        <div>
                                <label>Nr budynku</label>
                                <Input
                                    ref={register({
                                        required: true
                                    })}
                                    error={Boolean(errors.houseNo)}
                                    name={"houseNo"} />
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

const mapStateToProps = (state: any) => ({
    persistedData: state.shippingData
});
const mapDispatchToProps = {
    persistData: makeAction(SAVE_SHIPPING_DATA)
};
export default connect(mapStateToProps, mapDispatchToProps)(Shipment);
