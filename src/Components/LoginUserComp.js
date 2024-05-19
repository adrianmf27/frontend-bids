/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useCallback } from "react";
import { backendUrl } from "../Globals";
import { useNavigate } from "react-router-dom";
import { emailPattern } from "../Utils";
import { Button, Card, Col, Input, Row } from "antd";

let LoginUserComp = (props) => {
    let {setLogin} = props

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

            setLogin(true)
            navigate("/myItems")
        }
        else
        {
            let jsonData = await res.json()
            setMessage(jsonData.error)
        }
    }

    return (
        <Row align='middle'justify='center' style={{minHeight: "70vh"}}>
            <Col>
                <Card title='Login' style={{minWidth: '300px', maxWidth: '500px'}}>
                    <Input style={{marginBottom: "10px"}} size="large" type="text" 
                            placeholder="email" onChange={changeName}/>
                    <Input style={{marginBottom: "10px"}} size="large" type="text" 
                            placeholder="password" onChange={changePass}/>
                    <Button type="primary" onClick={clickLoginButton} block>Login</Button>
                </Card>
            </Col>
        </Row>        
    )
}

export default LoginUserComp;