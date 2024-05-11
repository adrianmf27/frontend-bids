import { useState } from "react";
import { backendUrl } from "../Globals";

let LoginUserComp = () => {
    let [email, changeEmail] = useState("")
    let [message, setMessage] = useState("")
    let [password, changePassword] = useState("")

    let changeName = (e) => {
        let email = e.currentTarget.value
        changeEmail(email)
    }

    let changePass = (e) => {
        let password = e.currentTarget.value
        changePassword(password)
    }

    let clickLoginButton = async (e) => {
        let res = await fetch(backendUrl + "/users/login", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                email : email,
                password : password
            })
        })

        if (res.ok)
        {
            let jsonData = await res.json()

            if(jsonData.apiKey != null)
            {
                localStorage.setItem("apiKey", jsonData.apiKey)
                localStorage.setItem("userId", jsonData.id)
                localStorage.setItem("email", jsonData.email)
            }            

            setMessage("Valid login")
        }
        else
        {
            setMessage("Not a valid user")
        }
    }

    return (
        <div>
            <h2>Login User</h2>
            {message != "" && <h3 className="errorMessage">{message}</h3>}

            <div className="center-box">
                <div className="form-group">
                    <input type="text" placeholder="enter your email" onChange={changeName}></input>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="enter your password" onChange={changePass}></input>
                </div>
                <button onClick={clickLoginButton}>Log In</button>
            </div>
        </div>
    )
}

export default LoginUserComp;