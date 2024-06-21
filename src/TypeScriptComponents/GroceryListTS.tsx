// @ts-ignore
import React, {useState, useEffect, FormEvent, ChangeEvent} from "react";
import "../App.css";
import {v4 as uuidv4} from "uuid";
// @ts-ignore
import Item from "./Item.tsx";

// Define the type for a list item
interface ListItem {
    id: string;
    item: string;
    complete: boolean;
}

function GroceryListTS() {
    const [item, setItem] = useState<string>("");
    const [edit, setEdit] = useState<boolean>(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [list, setList] = useState<ListItem[]>([]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (item && item.length <= 25) {
            if (!edit) {
                const newItem: ListItem = {
                    id: uuidv4(),
                    item: item,
                    complete: false,
                };
                setList([...list, newItem]);
            } else if (editId) {
                setList(
                    list.map((el) => {
                        if (el.id === editId) {
                            return {...el, item: item};
                        }
                        return el;
                    })
                );
                setEditId(null);
                setEdit(false);
            }
            setItem("");
        }
    };

    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(list));
    }, [list]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setItem(e.target.value);
    };

    return (
        <div className="App">
            <h1>Grocery List TS</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className="input"
                    type="text"
                    value={item}
                    placeholder="Enter the items"
                    onChange={handleChange}/>

                <button className="btn" type="submit">
                    {edit ? "Edit Item" : "Add Item"}
                </button>

            </form>

            <div>
                {list.map((e) => (
                    <Item
                        key={e.id}
                        id={e.id}
                        item={e.item}
                        list={list}
                        setList={setList}
                        complete={e.complete}
                        setItem={setItem}
                        setEdit={setEdit}
                        setEditId={setEditId}/>
                ))}
            </div>
        </div>
    );
}

export default GroceryListTS;