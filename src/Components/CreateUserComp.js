/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import { backendUrl } from "../Globals";
import { useNavigate } from "react-router-dom";
import { emailPattern } from "../Utils";

let CreateUserComp = (props) => {
    let {createNotification} = props

    let [email, changeEmail] = useState(null)
    let [message, setMessage] = useState(null)
    let [password, changePassword] = useState("")
    let [error, setError] = useState({})

    let navigate = useNavigate()

    useEffect(() => {
        checkInputErrors()
    }, [email, password])

    let checkInputErrors = () => {
        let updatedErrors = {}

        // eslint-disable-next-line eqeqeq
        if(email == "" || email?.length < 3 || !emailPattern.test(email)){
            updatedErrors.email = "Incorrect email format"
        }

        // eslint-disable-next-line eqeqeq
        if(password == "" || password?.length < 5){
            updatedErrors.password = "Incorrect password, maybe too short"
        }

        setError(updatedErrors)
    }

    let changeName = (e) => {
        let email = e.currentTarget.value
        changeEmail(email)
    }

    let changePass = (e) => {
        let password = e.currentTarget.value
        changePassword(password)
    }

    let clickCreate = async (e) => {
        let res = await fetch(backendUrl + "/users", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                email : email,
                password : password
            })
        })

        if (res.ok)
        {
            // eslint-disable-next-line no-unused-vars
            let jsonData = await res.json()
            createNotification("User created succesfully")
            navigate("/login")
        }
        else
        {
            let jsonData = await res.json()
            let finalErrorMsg = ""

            if(Array.isArray(jsonData.errors))
            {
                jsonData.errors.forEach(element => { finalErrorMsg += element.error + " " });
                setMessage(finalErrorMsg)
            }
            else 
            {
                setMessage(jsonData.errors)
            }
            
        }
    }

    return (
        <div>
            <h2>Register User</h2>
            <h3>{message}</h3>
            <div className="cener-box">
                <div className="form-group">
                    <input type="text" placeholder="enter your email" onChange={changeName}></input>
                </div>
                {error.email && <p className="errorForm">{error.email}</p>}
                <div className="form-group">
                    <input type="text" placeholder="enter your password" onChange={changePass}></input>
                </div>
                {error.password && <p className="errorForm">{error.password}</p>}
                <button onClick={clickCreate}>Create account</button>
            </div>
        </div>
    )
}

export default CreateUserComp;