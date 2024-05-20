/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { backendUrl } from "../Globals";
import { Alert, Button, Card, Col, Input, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";

let EditItemComp = (props) => {
    let {createNotification} = props
    
    let [message, setMessage] = useState("")
    let [item, setItem] = useState({}) 
    let {itemId} = useParams()

    let navigate = useNavigate()
    
    let changeProperty = (propertyName, e) => {
        let itemNew = {...item, [propertyName] : e.currentTarget.value}
        setItem(itemNew)
    }

    let changeDate = (e) => {
        let value = e.currentTarget.value
        let timestamp = Date.parse(value)

        let itemNew = {...item, dateFinish : timestamp}
        setItem(itemNew)
    }

    let clickEdit= async () => {
        let res = await fetch(backendUrl + "/items/" + itemId 
            + "?apiKey=" + localStorage.getItem("apiKey"), {
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(item)
        })

        if (res.ok)
        {
            // eslint-disable-next-line no-unused-vars
            let jsonData = await res.json()
            createNotification("success", "Item edited")
            navigate("/myItems")
        }
        else
        {
            let jsonData = await res.json()
            setMessage(jsonData.error)
        }
    }

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
            setMessage("Error obtaining item")
        }
    }

    return (
        <Row align='middle' justify='center' style={{minHeight: "70vh"}}>
            {message != "" && <Alert type="error" message={ message }/>}
            
            <Col>
                <Card title='Register' style={{minWidth: '300px', maxWidth: '500px'}}>
                    <Input size="large" type="text" 
                            placeholder="name" onChange={e => changeProperty("name", e)}/>

                    <Input style={{marginTop: "10px"}} size="large" type="text" 
                            placeholder="description" onChange={e => changeProperty("description", e)}/>

                    <Input style={{marginTop: "10px"}} size="large" type="number" 
                            placeholder="price" onChange={e => changeProperty("initialPrice", e)}/>

                    <Input style={{marginTop: "10px"}} size="large" 
                            type="datetime-local" onChange={changeDate}/>

                    <Button style={{marginTop: "10px"}} type="primary" 
                        onClick={clickEdit} block>Confirm item edition</Button>
                </Card>
            </Col>
        </Row>     
    )
}

export default EditItemComp;