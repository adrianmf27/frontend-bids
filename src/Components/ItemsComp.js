/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from "react";
import { backendUrl } from "../Globals";
import { timestampToDate } from "../Utils";
import { Link, useNavigate } from "react-router-dom";

const ItemsComp = () => {
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getItems();
    }, []);
    
    const getItems = async () => {
        let response = await fetch(backendUrl + "/items?apiKey=" + localStorage.getItem("apiKey"));

        if (response.status === 401) {
            navigate("/login");
            return;
        }

        if (response.ok) {
            let jsonData = await response.json();
            setItems(jsonData);
        } else {
            let jsonData = await response.json();
            setMessage(jsonData.error);
        }
    }
    

    return (
        <div>
            <h2>Items</h2>
            {message !== "" && <h3 className="errorMessage">{message}</h3>}

            <div className="item-list">
                {items.map(item => (
                    <Link to={"/item/" + item.id} key={item.id}>
                        <div className="item">
                            <h3 className="title">{item.name}</h3>
                            <h3 className="description">Description: {item.description}</h3>
                            <h3 className="email">Seller: {item.email}</h3>
                            <h3 className="date">Time start: {timestampToDate(item.dateStart)}</h3>
                            <h3 className="date">Time finish: {timestampToDate(item.dateFinish)}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ItemsComp;
