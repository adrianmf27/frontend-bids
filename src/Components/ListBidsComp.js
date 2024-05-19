/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../Globals";
import { timestampToDate } from "../Utils";
import { List } from "antd";


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
        <List
            size="large" 
            header={<h2>List of bids</h2>} 
            bordered
            dataSource={bids} 
            renderItem={(bid) => (
                <List.Item>
                    <h3>{bid.amount} €</h3>
                    <p>{bid.email}</p>
                    <p>{timestampToDate(bid.date)}</p>
                </List.Item>
            )}
        />
    );
    
    
}

export default ListBidsComp;