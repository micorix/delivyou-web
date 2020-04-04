import React, {FormEvent, SyntheticEvent, useState} from "react";
import {navigate, RouteComponentProps} from "@reach/router";
import SEO from "../../components/SEO";
import styled from "styled-components";
import Container from "../../components/Container";
import {Button, Input, InputAddonGroup, Select} from "../../components/FormControls";
import Autocomplete from "../../components/Autocomplete";
import ListItem from "../../components/ListItem";
import products from "../../data/products";

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

const suggestions = [
    'Makaron',
    'Pomidory'
]
const units = ['kg', 'szt']
const isFromDb = (id: string) => !id.includes('-');
type CreateWorkspaceProps = RouteComponentProps
const NewOrder = (props: CreateWorkspaceProps) => {
    const [inputValue, setInputValue] = useState('');
    const [inputItemId, setInputItemId] = useState<string | null>(null);
    const [activeItemId, setActiveItemId] = useState<string | null>(null);
    const [items, setItems] = useState<any[]>([]);
    const byId = (id: string): any => products.find((x: any) => x.id === id);
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
                    quantity: 1
                }
            ]);
        }else{
            setItems([
                ...items,
                {
                    label: inputValue,
                    id: '--s',
                    price: 0,
                    quantity: 1
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
        <>
            <SEO title={"Nowe zamówienie"}/>
            <Container>
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
        </>
    )
}

export default  NewOrder
