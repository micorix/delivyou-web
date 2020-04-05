import React from "react";
import styled from "styled-components";
import Container from "../components/Container";
import {Input, InputAddonGroup, Select} from "../components/FormControls";

const ListItemWrapper = styled.li`
    background: #F6F6FB;
    margin: 10px 0;
    padding: 10px 0;
    button{
        border: none;
        background: none;
    }
    .item{
        margin-left: 1em;
    }
    .wrapper{
    display: flex;
    align-items: center;
    justify-content: space-between;
    }
    span{
    display: flex;
    align-items: center;
    }
    .material-icons{
        color: rgba(0,0,0,0.7) !important;
    }
`;
const Details = styled.div<any>`
        display: ${props => props.active ? 'grid' : 'none'};
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 1em;
        padding: 1em 0;

`;

const ExpandButton = styled.button<any>`
    transform: rotate(${props => props.active ? '180' : '0'}deg);
    outline: none;
    transition: .5s all;
`;
type ListItemProps = {
    item: any
    active: boolean
    onIncrementQuantity: any
    onDecrementQuantity: any
    onSetPrice: any
    onSetUnit: any
    onToggleActiveItem: any
    onRemoveItem: any
    error: string | null
    setError: any

}
const ListItem = (props: ListItemProps) => {
    return (
        <ListItemWrapper>
            <Container narrow>
                <div className="wrapper">
                    <span>
                        <span className="icons">
                            <span className="material-icons" onClick={props.onIncrementQuantity}>
                                add_circle_outline
                            </span>
                            <span className="material-icons" onClick={props.onDecrementQuantity}>
                                remove_circle_outline
                            </span>
                        </span>
                        <span className="item">
                            {props.item.label}
                        </span>
                    </span>
                    <span>
                        <span>{props.item.quantity} {props.item.unit === 'select' ? '' : props.item.unit}</span>
                        <ExpandButton
                            active={props.active}
                            onClick={props.onToggleActiveItem}>
                                <span className="material-icons">expand_more</span>
                        </ExpandButton>
                        <button onClick={props.onRemoveItem}>
                            <span className="material-icons">delete</span>
                        </button>
                    </span>
                </div>
                <Details active={props.active}>
                    <div>
                        <InputAddonGroup>
                            <Input
                                type={"number"}
                                error={Boolean(props.error && props.error.startsWith(props.item.id) && props.error.endsWith('___price'))}
                                onChange={(e: any) => {
                                    props.onSetPrice(e);
                                    if(props.error && props.error.startsWith(props.item.id) && props.error.endsWith('___price')){
                                        props.setError(null);
                                    }
                                }}
                                placeholder={"Cena"} value={props.item.price !== 0 ? props.item.price : ''}/>
                                <span>zł</span>
                        </InputAddonGroup>
                    </div>
                    <div>
                        <Select
                            onChange={(e: any) => {
                                props.onSetUnit(e);
                                if(props.error && props.error.startsWith(props.item.id) && props.error.endsWith('___unit')){
                                    props.setError(null);
                                }
                            }}
                            value={props.item.unit ? props.item.unit : "select"}
                            error={Boolean(props.error && props.error.startsWith(props.item.id) && props.error.endsWith('___unit'))}
                            disabled={!props.item.id.includes('-')}>
                            <option value="select" disabled={true}>Jednostka</option>
                            <option value="szt">szt</option>
                            <option value="kg">kg</option>
                        </Select>
                    </div>
                </Details>
            </Container>
        </ListItemWrapper>
    );
};
export default ListItem
