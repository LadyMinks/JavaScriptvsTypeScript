import React, {useState} from "react";
import {v4 as uuidv4} from "uuid";
import "./App.css"

export default function App() {
    const [item, setItem] = useState("");
    const [items, setItems] = useState([]);
    const add = (e) => {
        e.preventDefault();
        if (!item) {
            return;
        }
        setItems((items) => [
            ...items,
            {
                id: uuidv4(),
                item,
                checked: false
            }
        ]);
    };

    const remove = (index) => {
        setItems((items) => items.filter((_, i) => i !== index));
    };
    
    return (
        <div className="App">
            <form onSubmit={add}>
                <h1>Grocery List</h1>
                <label>item</label>
                <input value={item} onChange={(e) => setItem(e.target.value)}/>
                <button type="submit">add</button>
            </form>
            {items.map((item, index) => {
                return (
                    <div className="d-flex flex-row mb-3 ListFlex" key={item.id}>
                        <p>{item.item}</p>
                        <button className="Button"
                                onClick={() => remove(index)}>
                            X
                        </button>
                    </div>
                );
            })}
        </div>
    );
}