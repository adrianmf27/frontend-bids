/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../Globals";
import { timestampToDate } from "../Utils";


let ListBidsComp = () =>{
    let {itemId} = useParams()
    let [bids, setBids] = useState([])

    useEffect(() => {
        getBids()
    }, [])

    let getBids = async () => {
        let response = await fetch(backendUrl + "/bids?idItem=" + itemId + "&apiKey=" 
            + localStorage.getItem("apiKey"))

        if(response.ok)
        {
            let bids = await response.json()
            setBids(bids)
        }
    }

    return (
        <div className="item-list">
            <h2>Bids</h2>
            <div className="items-container">
                {bids.map((bid, index) => (
                    <div className="item" key={index}>
                        <h3>Amount: {bid.amount} €</h3>
                        <h3>Email: {bid.email}</h3>
                        <h3>Date: {timestampToDate(bid.date)}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
    
}

export default ListBidsComp;