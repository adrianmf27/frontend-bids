import { useState } from "react";
import { backendUrl } from "../Globals";


let CreateItemComp = () => {
    let [message, setMessage] = useState("")
    let [item, setItem] = useState({})

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

    let clickCreate = async () => {
        let res = await fetch(backendUrl + "/items?apiKey=" + localStorage.getItem("apiKey"), {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(item)
        })

        if (res.ok)
        {
            // eslint-disable-next-line no-unused-vars
            let jsonData = await res.json()
        }
    }

    return (
        <div>
            <h2>Create Item</h2>
            {message !== "" && <h3 className="errorMessage">{message}</h3>}

            <div className="center-box">
                <div className="form-group">
                    <input type="text" placeholder="name" 
                        onChange={e => changeProperty("name", e)}></input>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="description" 
                        onChange={e => changeProperty("description", e)}></input>
                </div>

                <div className="form-group">
                    <input type="number" placeholder="price" 
                        onChange={e => changeProperty("initialPrice", e)}></input>
                </div>

                <div className="form-group">
                    <input type="datetime-local" placeholder="date finish"
                        onChange={changeDate}></input>
                </div>
                <button onClick={clickCreate}>Create item</button>
            </div>
            
        </div>
    )
}

export default CreateItemComp;