import { useEffect, useState } from "react";
import { backendUrl } from "../Globals";
import {timestampToDate} from "../Utils";
import { useParams } from "react-router-dom";

let DetailsItemComp = () => {
    let [item, setItem] = useState({})
    let [message, setMessage] = useState("")
    let {itemId} = useParams()

    useEffect(() => {
        getItem();
    }, [])

    let getItem = async () => {
        let response = await fetch(backendUrl + "/items/" + itemId + "?apiKey=" 
            + localStorage.getItem("apiKey"))

        if(response.ok)
        {
            let jsonData = await response.json()
            setItem(jsonData)
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
                <div className="item">
                    <h3 className="title">{item.name}</h3>
                    <h3 className="description">Description: {item.description}</h3>
                    <h3 className="email">Seller: {item.email}</h3>
                    <h3 className="date">Time start: {timestampToDate(item.dateStart)}</h3>
                    <h3 className="date">Time finish {timestampToDate(item.dateFinish)}</h3>
                </div>                        
            </div>

        </div>
    )
}

export default DetailsItemComp;