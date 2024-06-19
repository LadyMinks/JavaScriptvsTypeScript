import React from "react";
import "../Item.css";

const Item = ({
                  id,
                  item,
                  list,
                  setEdit,
                  setEditId,
                  setItem,
                  setList,
                  complete,
              }) => {
    //Delete Item
    const remove = (id) => {
        setList(list.filter((el) => el.id !== id));
    };

    //Mark Item completed
    const handleComplete = (id) => {
        setList(
            list.map((item) => {
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

    //Edit Item
    const handleItem = (id) => {
        const editItem = list.find((el) => el.id === id);
        setItem(editItem.item);
        setEdit(true);
        setEditId(id);
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
            />

            <button onClick={() => {
                    const confirmBox = window.confirm("Do you want to edit this item?");
                    if (confirmBox === true) {
                        handleItem(id);
                    }}}>
                edit
            </button>

            <button
                onClick={() => handleComplete(id)}>
                check
            </button>

            <button onClick={() => {
                    const confirmBox = window.confirm(
                        "Are you sure you want to delete this item?"
                    );
                    if (confirmBox === true) {
                        remove(id);
                    }}}>
                remove
            </button>
        </div>
    );
};
export default Item;