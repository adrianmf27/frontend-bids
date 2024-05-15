import { useEffect, useState } from "react";
import { backendUrl } from "../Globals";
import {timestampToDate} from "../Utils";
import { useNavigate } from "react-router-dom";


let MyItemsComp = () => {
    let [items, setItems] = useState([])
    let [message, setMessage] = useState("")

    let navigate = useNavigate()

    useEffect(() => {
        getItems();
    }, [])

    let getItems = async () => {
        let response = await fetch(backendUrl + "/items?apiKey=" + localStorage.getItem("apiKey")
            + "&idUser=" + localStorage.getItem("userId"))

        if(response.ok)
        {
            let jsonData = await response.json()
            setItems(jsonData)
        }
        else
        {
            setMessage("Error obtaining items")
        }
    }

    let onClickDeleteItem = async (id) => {
        let response = await fetch(backendUrl + "/items/" + id + "?apiKey=" 
            + localStorage.getItem("apiKey"), { method : "DELETE" })
        
        if(response.ok){
            let updatedItems = items.filter(item => item.id !== id)
            setItems(updatedItems)
        }
        else
        {
            let jsonData = await response.json()
            setMessage(jsonData.error)
        }
    }

    let onClickEditItem = async (id) => {
        navigate("/item/edit/" + id)
    }

    return (
        <div>
            <h2>Items</h2>
            {message !== "" && <h3 className="errorMessage">{message}</h3>}

            <div className="item-list">
                { items.map (item => 
                    (
                        <div className="item">
                            <h3 className="title">{item.name}</h3>
                            <h3 className="description">Description: {item.description}</h3>
                            <h3 className="email">Seller: {item.email}</h3>
                            <h3 className="date">Time start: {timestampToDate(item.dateStart)}</h3>
                            <h3 className="date">Time finish {timestampToDate(item.dateFinish)}</h3>
                            <button onClick={() => {onClickDeleteItem(item.id)}}>Delete Item</button>
                            <button onClick={() => {onClickEditItem(item.id)}}>Edit Item</button>
                        </div>                        
                    )
                )}
            </div>
        </div>
    )
}

export default MyItemsComp;