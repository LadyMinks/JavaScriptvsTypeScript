// @ts-ignore
import React from "react";
import "../Item.css";

// Define the type for a list item
interface ListItem {
    id: string;
    item: string;
    complete: boolean;
}

// Define the props for the Item component
interface ItemProps {
    id: string;
    item: string;
    list: ListItem[];
    setEdit: (edit: boolean) => void;
    setEditId: (id: string) => void;
    setItem: (item: string) => void;
    setList: (list: ListItem[]) => void;
    complete: boolean;
}

const Item: React.FC<ItemProps> = ({
                                       id,
                                       item,
                                       list,
                                       setEdit,
                                       setEditId,
                                       setItem,
                                       setList,
                                       complete
                                   }) => {
    // Delete Item
    const remove = (id: string) => {
        setList(list.filter((el: ListItem) => el.id !== id));
    };

    // Mark Item completed
    const handleComplete = (id: string) => {
        setList(
            list.map((item: ListItem) => {
                if (item.id === id) {
                    return {
                        ...item,
                        complete: !item.complete,
                    };
                }
                return item;
            })
        );
    };

    // Edit Item
    const handleItem = (id: string) => {
        const editItem = list.find((el: ListItem) => el.id === id);
        if (editItem) {
            setItem(editItem.item);
            setEdit(true);
            setEditId(id);
        }
    };

    return (
        <div className="item">
            <input
                type="text"
                value={item}
                style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                    color: "black",
                    fontSize: "20px",
                }}
                className={complete ? "complete" : ""}
                readOnly/>

            <button
                onClick={() => {
                    const confirmBox = window.confirm("Do you want to edit this item?");
                    if (confirmBox === true) {
                        handleItem(id);
                    }
                }}>
                edit
            </button>

            <button onClick={() => handleComplete(id)}>
                check
            </button>

            <button onClick={() => {
                const confirmBox = window.confirm(
                    "Are you sure you want to delete this item?");
                if (confirmBox === true) {
                    remove(id);
                }
            }}>
                remove
            </button>
        </div>
    );
};

export default Item;
