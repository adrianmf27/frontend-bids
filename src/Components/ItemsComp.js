import { useEffect, useState } from "react";
import { backendUrl } from "../Globals";
import {timestampToDate} from "../Utils";
import { Link } from "react-router-dom";

let ItemsComp = () => {
    let [items, setItems] = useState([])
    let [message, setMessage] = useState("")

    useEffect(() => {
        getItems();
    }, [])

    let getItems = async () => {
        let response = await fetch(backendUrl + "/items?apiKey=" + localStorage.getItem("apiKey"))

        if(response.ok)
        {
            let jsonData = await response.json()
            setItems(jsonData)
        }
        else
        {
            let jsonData = await response.json()
            setMessage(jsonData.error)
        }
    }

    return (
        <div>
            <h2>Items</h2>
            {message !== "" && <h3 className="errorMessage">{message}</h3>}

            <div className="item-list">
                { items.map (item => 
                    (
                        <Link to={"/item/" + item.id}>
                            <div className="item">
                                <h3 className="title">{item.name}</h3>
                                <h3 className="description">Description: {item.description}</h3>
                                <h3 className="email">Seller: {item.email}</h3>
                                <h3 className="date">Time start: {timestampToDate(item.dateStart)}</h3>
                                <h3 className="date">Time finish {timestampToDate(item.dateFinish)}</h3>
                            </div>     
                        </Link>
                                           
                    )
                )}
            </div>

        </div>
    )
}

export default ItemsComp;