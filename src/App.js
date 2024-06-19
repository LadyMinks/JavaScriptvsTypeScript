import React, { useState } from "react";
import "./App.css";
import Item from "./Item";
import { v4 as uuidv4 } from "uuid";

function App() {
    const [item, setItem] = useState("");
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState();
    const [list, setList] = useState([]);

    const handleSubmit = (index) => {
        const newItem = {
            id: uuidv4(),
            item: item,
            complete: false,
        };
        index.preventDefault();
        if (item && item.length <= 25 && !edit) {
            setList([...list, newItem]);
            setItem("");
        } else if (item && item.length <= 25 && edit && editId) {
            setList(
                list.map((el) => {
                    if (el.id === editId) {
                        return { ...el, item: item };
                    }
                    return el;
                })
            );
            setItem("");
            setEditId(null);
            setEdit(false);
        }
    };

    React.useEffect(() => {
        localStorage.setItem("data", JSON.stringify(list));
    }, [list]);

    const handleChange = (e) => {
        setItem(e.target.value);
    };

    return (
        <div className="App">
            <h1>Grocery List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className="input"
                    type="text"
                    value={item}
                    placeholder="Enter the items"
                    onChange={handleChange}
                />
                {edit ? (
                    <button className="btn" type="submit">
                        Edit Item
                    </button>
                ) : (
                    <button className="btn" type="submit">
                        Add Item
                    </button>
                )}
            </form>
            <div>
                {list.map((e, id) => (
                    <Item
                        key={id}
                        id={e.id}
                        item={e.item}
                        list={list}
                        setList={setList}
                        complete={e.complete}
                        setItem={setItem}
                        setEdit={setEdit}
                        setEditId={setEditId}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;