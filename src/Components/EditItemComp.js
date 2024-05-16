import { useEffect, useState } from "react";
import { backendUrl } from "../Globals";
import {timestampToString} from "../Utils";
import { useNavigate, useParams } from "react-router-dom";

let EditItemComp = () => {
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
        <div>
            <h2>Edit item</h2>
            {message !== "" && <h3 className="errorMessage">{message}</h3>}
            <div className="center-box">
                <div className="form-group">
                    <input type="text" placeholder="name" value={item.name}
                        onChange={e => changeProperty("name", e)}></input>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="description" value={item.description}
                        onChange={e => changeProperty("description", e)}></input>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="price" value={item.initialPrice}
                        onChange={e => changeProperty("initialPrice", e)}></input>
                </div>

                <div className="form-group">
                    <input type="datetime-local" placeholder="date finish" 
                        value={timestampToString(item.dateFinish)} onChange={e => changeDate(e)}></input>
                </div>

                <button onClick={clickEdit}>Confirm item edition</button>
            </div>
        </div>
    )
}

export default EditItemComp;