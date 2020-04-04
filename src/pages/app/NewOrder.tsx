import React, {FormEvent, SyntheticEvent, useState} from "react";
import {navigate, RouteComponentProps} from "@reach/router";
import SEO from "../../components/SEO";
import styled from "styled-components";
import Container from "../../components/Container";
import {Button, Input, InputAddonGroup} from "../../components/FormControls";

const ItemInput = styled(Input)`

    border-right: none;
`;
const AddButton = styled(Button)`
    margin-top: 2em;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
`
const List = styled.ul`
    display: block;
    padding-inline-start: 0;
    margin: 2em 0 0 0;
`
const ListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    button{
        border: none;
        background: none;
    }
`;
const Centered = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
type CreateWorkspaceProps = RouteComponentProps
const NewOrder = (props: CreateWorkspaceProps) => {
    const [inputValue, setItemInputValue] = useState('')
    const [items, setItems] = useState([
        'makaron'
    ]);
    const updateItemInputValue = (e: any) => setItemInputValue(e.target.value);
    const addItem = (e: any) => {
        e.persist();
        e.preventDefault();
        if (inputValue.trim().length === 0)
                return;

        setItems([
            ...items,
            inputValue
        ]);
        setItemInputValue('');
    };
    const removeItem = (itemIdx: number) => {
        console.log(itemIdx)
        let updatedItems = items;
        updatedItems.splice(itemIdx, 1);
        console.log(updatedItems)
        setItems([...updatedItems])
    };
    const saveItems = () => {
        navigate('/app/shipment');
    };
    return (
        <>
            <SEO title={"Nowe zamówienie"}/>
            <Container>
                <h1>Co Ci dostarczyć?</h1>
                <form onSubmit={addItem}>
                    <InputAddonGroup>
                        <ItemInput onChange={updateItemInputValue} value={inputValue} />
                        <button type={"submit"}>
                            <span className="material-icons">add</span>
                        </button>
                    </InputAddonGroup>
                </form>
                <List>
                    {
                        items.map((item: string, i: number) => (
                            <ListItem key={item}>
                                <span className="item">
                                    {item}
                                </span>
                                <button onClick={() => removeItem(i)}>
                                    <span className="material-icons">remove</span>
                                </button>
                            </ListItem>
                        ))
                    }
                </List>
                <Centered>
                    <AddButton onClick={saveItems}>Zamów</AddButton>
                </Centered>
            </Container>
        </>
    )
}

export default  NewOrder
