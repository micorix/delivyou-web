import React, {FormEvent, SyntheticEvent, useState} from "react";
import {navigate, RouteComponentProps} from "@reach/router";
import SEO from "../../components/SEO";
import styled from "styled-components";
import Container from "../../components/Container";
import {Button, Input, InputAddonGroup, Select} from "../../components/FormControls";
import Autocomplete from "../../components/Autocomplete";
import ListItem from "../../components/ListItem";
import products from "../../data/products";
import AppLayout from "../../components/AppLayout";

const ItemInput = styled(Input)`
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
`;
const AddButton = styled(Button)`
    margin-top: 2em;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    color: #E6E6EB;
    background: none;
`
const List = styled.ul`
    display: block;
    padding-inline-start: 0;
    margin: 2em 0 0 0;
`

const Fab = styled.div`
    position: absolute;
    bottom: 1em;
    right: 1em;
    padding: 10px;
    background: ${props => props.theme.colors.primary};
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    .material-icons{
        font-size: 1.8em !important;
    }
`;
const ModalWrapper = styled.div<{active: boolean}>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(0,0,0,0.7);
    display: ${props => props.active ? 'block' :' none'};
`;
const Modal = styled.div`
    width: 60%;
    margin: 20vh auto 0 auto;
    padding: 10px;
    background: white;
    border-radius: 5px;
`;
const CityList = styled.ul`
    display: block;
    padding-inline-start: 0;
    margin: 0em 0 0 0;
    
    li{
        display: block;
        padding: .5em 10px;
        text-align: center;
        cursor: pointer;
    }
`;
const CitySelect = styled.div`
    font-weight: bold;
    margin-bottom: 2em;
    small{
        font-weight: normal;
        display: block;
        margin-top: .5em;
        cursor: pointer;
    }
`
const units = ['kg', 'szt']
const isFromDb = (id: string) => !id.includes('-');
type CreateWorkspaceProps = RouteComponentProps
const NewOrder = (props: CreateWorkspaceProps) => {
    const [inputValue, setInputValue] = useState('');
    const [inputItemId, setInputItemId] = useState<string | null>(null);
    const [activeItemId, setActiveItemId] = useState<string | null>(null);
    const [city, setCity] = useState<null | string>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(true);
    const [items, setItems] = useState<any[]>([]);
    const byId = (id: string): any => products.find((x: any) => x.id === id);
    const selectCity = (city: string) => {
        setCity(city);
        setModalOpen(false)
    }
    const addItem = (e: any) => {
        e.persist();
        e.preventDefault();
        if (inputValue.trim().length === 0 || items.find((x: any) => x.id === inputItemId))
                return;

        if(inputItemId){
            setItems([
                ...items,
                {
                    ...byId(inputItemId),
                    quantity: 1,
                }
            ]);
        }else{
            setItems([
                ...items,
                {
                    label: inputValue,
                    id: '--s',
                    price: 0,
                    quantity: 1,
                    unit: 'select'
                }
            ]);
        }

        setInputItemId(null);
        setInputValue('')
    };
    const removeItem = (itemIdx: number) => {
        let updatedItems = items;
        updatedItems.splice(itemIdx, 1);
        setItems([...updatedItems])
    };
    const saveItems = () => {
        if (items.length === 0){
            return;
        }
        for(const item of items){
            if(item.price <= 0 || item.unit === 'select'){
                setActiveItemId(item.id);
                return;
            }
        }
        navigate('/app/shipment');
    };
    const isActive = (id: any) => id === activeItemId;
    const toggleActiveItemId = (id: string) => setActiveItemId(isActive(id) ? null : id);

    const changeQuantity = (index: number, decrement: boolean) => {
        const updatedItems = items;
        const updatedQuantity = updatedItems[index].quantity+(decrement ? -1 : 1);
        if(updatedQuantity <= 0)
                return;

        updatedItems[index].quantity = updatedQuantity;
        setItems([...updatedItems])
    }
    const changePrice = (index: number, price: number) => {
        const updatedItems = items;
        if(price < 0)
            return;

        updatedItems[index].price = price;
        setItems([...updatedItems])
    }
    const changeUnit = (index: number, unit: string) => {
        const updatedItems = items;
        if(!units.includes(unit))
            return;

        updatedItems[index].unit = unit;
        setItems([...updatedItems])
    }
    return (
        <AppLayout goBack={false}>
            <SEO title={"Nowe zamówienie"}/>

            <Container>
                <CitySelect>Wybrane miasto: {city} <small onClick={() => setModalOpen(true)}>Zmień miasto</small></CitySelect>
                <h1>Co Ci dostarczyć?</h1>
                <form onSubmit={addItem}>
                    <InputAddonGroup>
                        <Autocomplete
                            userInput={inputValue}
                            onUserInputChange={setInputValue}
                            itemId={inputItemId}
                            onSetItemId={setInputItemId}
                        />
                        <button type={"submit"}>
                            <span className="material-icons">add</span>
                        </button>
                    </InputAddonGroup>
                </form>
            </Container>
                <List>
                    {
                        items.map((item: any, i: number) => (
                            <ListItem
                                key={item.id}
                                item={item}
                                active={isActive(item.id)}
                                onIncrementQuantity={() => changeQuantity(i, false)}
                                onDecrementQuantity={() => changeQuantity(i, true)}
                                onSetPrice={(e: any) => changePrice(i, e.target.value)}
                                onSetUnit={(e: any) => {
                                    if(!isFromDb(item.id))
                                        changeUnit(i, e.target.value)
                                }}
                                onToggleActiveItem={() => toggleActiveItemId(item.id)}
                                onRemoveItem={() => removeItem(i)}
                            />
                        ))
                    }
                </List>
                <Container>
                    <Button onClick={saveItems}>Zamów</Button>
                </Container>
            <Fab>
                <span className="material-icons">camera_alt</span>
            </Fab>
            <ModalWrapper active={modalOpen}>
                <Modal>
                    <h3>Wybierz miasto obsłgiwane przez DelivYou</h3>
                    <CityList>
                        <li onClick={() => selectCity('Warszawa')}>Warszawa</li>
                        <li onClick={() => selectCity('Kraków')}>Kraków</li>
                        <li onClick={() => selectCity('Gdańsk')}>Gdańsk</li>
                        <li onClick={() => selectCity('Wrocław')}>Wrocław</li>
                    </CityList>
                </Modal>
            </ModalWrapper>
        </AppLayout>
    )
}

export default  NewOrder
