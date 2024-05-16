// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import { backendUrl } from "../Globals";
import { useNavigate } from "react-router-dom";
import { emailPattern } from "../Utils";

let LoginUserComp = () => {
    let [email, changeEmail] = useState(null)
    let [message, setMessage] = useState(null)
    let [password, changePassword] = useState("")
    let [error, setError] = useState({})

    let navigate = useNavigate()

    useEffect = (() => {
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

            navigate("/myItems")
        }
        else
        {
            let jsonData = await res.json()
            setMessage(jsonData.error)
        }
    }

    return (
        <div>
            <h2>Login User</h2>
            {message !== "" && <h3 className="errorMessage">{message}</h3>}

            <div className="center-box">
                <div className="form-group">
                    <input type="text" placeholder="enter your email" onChange={changeName}></input>
                </div>
                {error.email && <p className="errorForm">{error.email}</p>}
                <div className="form-group">
                    <input type="text" placeholder="enter your password" onChange={changePass}></input>
                </div>
                {error.password && <p className="errorForm">{error.password}</p>}
                <button onClick={clickLoginButton}>Log In</button>
            </div>
        </div>
    )
}

export default LoginUserComp;