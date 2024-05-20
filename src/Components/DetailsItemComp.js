/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { backendUrl } from "../Globals";
import {timestampToDate} from "../Utils";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Descriptions, Input, Row } from "antd";

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
            createNotification("success", "Bid added")
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
            <Descriptions title={item.name} layer="vertical">
                <Descriptions.Item label="name">{item.name}</Descriptions.Item>
                <Descriptions.Item label="Description" span={3}>{item.description}</Descriptions.Item>
                <Descriptions.Item label="price">{item.initialPrice} €</Descriptions.Item>
                <Descriptions.Item label="email">{item.email}</Descriptions.Item>
                <Descriptions.Item label="highestBid">
                    {item.highestBid}
                    <Link to={"/item/" + item.id + "/bids"}>See all bids</Link></Descriptions.Item>
            
                <Descriptions.Item span={3}>
                    <Row justify="center" style={{width: "100%"}}>
                        <Col>
                            <Input style={{marginBottom: "10px"}} size="large" type="number" placeholder="Bid" onChange={onChangeBid}></Input>
                            <Button block type="primary" onClick={clickBidButton}>Send bid</Button>
                        </Col>
                    </Row>
                </Descriptions.Item>
            </Descriptions>           
        </div>
    )
}

export default DetailsItemComp;