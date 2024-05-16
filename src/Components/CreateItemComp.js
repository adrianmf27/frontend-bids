import { useEffect, useState } from "react";
import { backendUrl } from "../Globals";
import { useNavigate } from "react-router-dom";
import _ from "lodash";


let CreateItemComp = () => {
    let [message, setMessage] = useState("")
    let [item, setItem] = useState({})
    let [error, setError] = useState({})

    let navigate = useNavigate()

    useEffect(() => {
        checkInputErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item])

    let checkInputErrors = () => {
        let updatedErrors = {}

        // eslint-disable-next-line eqeqeq
        if(item.name == "" || item.name?.length < 2){
            updatedErrors.name = "Incorrect name for item"
        }
    
        // eslint-disable-next-line eqeqeq
        if(item.description == "" || item.description?.length < 5){
            updatedErrors.description = "Incorrect description, maybe too short"
        }

        // eslint-disable-next-line eqeqeq
        if(item.initialPrice < 0 || item.initialPrice == 0 || item.initialPrice == ""){
            updatedErrors.initialPrice = "Price must be a positive number"
        }

        if(item.dateFinish < new Date().getTime()){
            updatedErrors.dateFinish = "Incorrect date, must be greater or equal than current date"
        }

        setError(updatedErrors)
    }

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
        if(_.isEqual(error, {})){
            let res = await fetch(backendUrl + "/items?apiKey=" + localStorage.getItem("apiKey"), {
                method: "POST",
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
        else
        {
            setMessage("Cannot execute your request, you have errors")
        }
    }

    return (
        <div>
            <h2>Create Item</h2>
            {message !== "" && <h3 className="errorMessage">{message}</h3>}

            <div className = "center-box">
                <div className="form-group">
                    <input type="text" placeholder="name" 
                        onChange={e => changeProperty("name", e)}></input>
                </div>
                {error.name && <p className="errorForm">{error.name}</p>}
                <div className="form-group">
                    <input type="text" placeholder="description" 
                        onChange={e => changeProperty("description", e)}></input>
                </div>
                {error.description && <p className="errorForm">{error.description}</p>}
                <div className="form-group">
                    <input type="number" placeholder="price" 
                        onChange={e => changeProperty("initialPrice", e)}></input>
                </div>
                {error.initialPrice && <p className="errorForm">{error.initialPrice}</p>}
                <div className="form-group">
                    <input type="datetime-local" placeholder="date finish"
                        onChange={changeDate}></input>
                </div>
                {error.dateFinish && <p className="errorForm">{error.dateFinish}</p>}
                <button onClick={clickCreate}>Create item</button>
            </div>
            
        </div>
    )
}

export default CreateItemComp;