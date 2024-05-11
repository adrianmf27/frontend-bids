import { useState } from "react";
import { backendUrl } from "../Globals";

let CreateUserComp = () => {
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
            let jsonData = await res.json()
            setMessage("New user created")
        }
        else
        {
            setMessage("No user was created, error")
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
                <div className="form-group">
                    <input type="text" placeholder="enter your password" onChange={changePass}></input>
                </div>
                <button onClick={clickCreate}>Create account</button>
            </div>
        </div>
    )
}

export default CreateUserComp;