import { useEffect, useState } from "react";
import { backendUrl } from "../Globals";
import {timestampToDate} from "../Utils";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button } from "antd";
import { render } from "@testing-library/react";

let MyItemsComp = (props) => {
    let {createNotification} = props

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
            createNotification("success", "Item deleted")
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

    let columns = [
        {
            title: "Item name",
            dataIndex: "name"
        },
        {
            title: "Seller",
            dataIndex: "email"
        },
        {
            title: "Item description",
            dataIndex: "description"
        },        
        {
            title: "price",
            dataIndex: "initialPrice"
        },
        {
            title: "Start date",
            dataIndex: "formatDateStart"
        }, 
        {
            title: "Finish date",
            dataIndex: "formatDateFinish"
        },
        {
            title: "Delete",
            dataIndex: "id",
            render: (id) => <Button onClick={() => {onClickDeleteItem(id)}}>Delete</Button>
        },
        {
            title: "Edit",
            dataIndex: "id",
            render: (id) => <Button onClick={() => {onClickEditItem(id)}}>Edit</Button>
        }
        
    ]

    items.map((item) => {
        item.formatDateStart = timestampToDate(item.dateStart)
        item.formatDateFinish = timestampToDate(item.dateFinish)
        return item
    })

    return (
        <div>
            <h2>Items</h2>
            {message !== "" && <h3 className="errorMessage">{message}</h3>}
            <Table columns={columns} dataSource={items}/>
        </div>
    )
}

export default MyItemsComp;