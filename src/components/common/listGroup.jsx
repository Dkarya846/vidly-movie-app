import React from 'react';

const ListGroup =(props)=>{
    const {items, selectedItem, onItemSelect, textProperty, valueProperty} = props;

    return (
    <ul className="list-group">
        {items.map(item=>{
            return <li key={item[valueProperty]} style={{cursor:"pointer"}} className={item === selectedItem ? "list-group-item active" : "list-group-item"} onClick={()=>onItemSelect(item)}>{item[textProperty]}</li>
        })}
    </ul>
    );
}

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
}

export default ListGroup;