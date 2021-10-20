import React,{useState,useContext} from 'react'
import { gql, useMutation } from '@apollo/client';
import { useHistory,Redirect } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import {context} from "../App"
import '../App.css'


const LOGIN = gql`

mutation LogInMutation($userName: String!, $password: String!) {
  logIn(userName: $userName, password: $password)
}
`

function Login() {
    let setLogIn = useContext(context);
    console.log(setLogIn)
    let history = useHistory();
    const [loginFunction, { data, loading, error }] = useMutation(LOGIN);

    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [nameError,setNameError] = useState('')
    const [pError,setPerror] = useState('')
    

    const submit = async(e) => {
        e.preventDefault();
        if(name.length >= 3){
            if(password.length > 1){
                let dat = await loginFunction({ variables: { userName: name,password: password} })
                console.log(dat)
                console.log(dat.data)
                if(dat.data.logIn === "true"){
                    localStorage.setItem('isLogin', true)
                    setLogIn.setIsLogin(true)
                    setLogIn.setUserName(name)
                    localStorage.setItem('userName', name)
                    history.push("/SelectDiary")
                }
        
                if(dat.data.logIn !== 'true' && dat.data.logIn !== 'please enter correct password'){
                    setNameError(dat.data.logIn)
                }   
        
                if(dat.data.logIn !== 'true' && dat.data.logIn !== 'this username does not exist'){
                    setPerror(dat.data.logIn)
                }
            }else {
                setPerror('please enter a password')
            }

            
           
        }else if(name.length < 3){
            setNameError('please enter username')
        }
       
    }

    return (
        <div className="Login">
            <form className="form" onSubmit={submit}>
                <h1>Sign In</h1>
                <div>
                  
                <div className="inputdiv">
                    <input type="text" className="signupinput"  name="userName" value={name} onInput={(e) =>{setName(e.target.value);setNameError('') ;setPerror('')}} placeholder="Enter UserName..."/><br/>
                    <p>{nameError}</p>
                    </div>
                   <div className="inputdiv">
                        <input type="password" className="signupinput" name="password" onInput={(e)=>{setPassword(e.target.value);setPerror('');setNameError('') }} value={password} placeholder="Enter password..."/><br/>
                    <p> {pError}</p>
                   </div>
                    <button type="submit">LOG IN <span className="loader">{loading? <Loader
        type="Oval"
        color="black"
        height={15}
        width={15}
        timeout={3000} //3 secs
      /> : ''}</span></button>
                <p onClick={ ()=>{history.push("Signup")}}>SIGN UP</p>
                </div>
            </form>
        </div>
    )
}

export default Login
