/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { backendUrl } from "../Globals";
import {timestampToDate} from "../Utils";
import { Link, useParams } from "react-router-dom";

let DetailsItemComp = (props) => {
    let {createNotification} = props

    let [item, setItem] = useState({})
    let [message, setMessage] = useState("")
    let {itemId} = useParams()

    let [bid, setBid] = useState(0)
    let [highestBid, setHighestBid] = useState(0)


    useEffect(() => {
        getItem();
        getHighestBid();
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

    let getHighestBid = async () => {
        let response = await fetch(backendUrl + "/bids/higher?/idItem=" + itemId 
            + "&apiKey=" + localStorage.getItem("apiKey"), {
                method: "POST",
                headers: {"Content-type" : "application/json"},
                body: JSON.stringify({
                    idItem : itemId,
                    amount : bid
                })
        })

        if(response.ok)
        {
            let bids = await response.json()

            if(bids.length > 0){
                setHighestBid(bids[0].amount)
            }
        }
        else 
        {
            let jsonData = await response.json()
            setMessage(jsonData.error)
        }
    }

    let onChangeBid = (e) => {
        let value = e.currentTarget.value
        let bidVal = parseFloat(value)
        setBid(bidVal)
    }


    let clickBidButton = async () => {
        let response = await fetch(backendUrl + "/bids?apiKey=" + localStorage.getItem("apiKey"), {
            method: "POST",
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify({
                idItem : itemId,
                amount : bid
            })
        })

        if(response.ok)
        {
            await response.json()
            createNotification("New bid added")
            getHighestBid()
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
                    <h3 className="price">Price: {item.initialPrice} €</h3>
                    <h3 className="email">Seller: {item.email}</h3>
                    <h3 className="email">Highest Bid: {highestBid}</h3>
                    <h3 className="date">Time start: {timestampToDate(item.dateStart)}</h3>
                    <h3 className="date">Time finish {timestampToDate(item.dateFinish)}</h3>

                    <h3>New bid for this item</h3>
                    <div className="form-group">
                        <input type="number" placeholder="Bid" onChange={onChangeBid}></input>
                    </div>
                    <button onClick={clickBidButton}>Send bid</button>

                    <Link to={"/item/" + item.id + "/bids"}>See all bids</Link>
                </div>                        
            </div>

        </div>
    )
}

export default DetailsItemComp;