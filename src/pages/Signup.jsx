import React,{useState} from 'react'
import '../App.css'
import {useHistory} from 'react-router-dom'
import { gql, useMutation } from '@apollo/client';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const SIGNUP = gql`

mutation Mutation($userName: String!, $password: String!) {
  signUp(userName: $userName, password: $password)
}

`

function Signup() {
    const [signUp, { data, loading, error }] = useMutation(SIGNUP);

    let history = useHistory();
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [nerror,setNerror] = useState('');
    const [perror,setPerror] = useState('')
    

    const submit = async(e) => {
        e.preventDefault();
        if(name.length < 1){
            setNerror('please enter username')
            
        }else if(name.length < 3){
            setNerror('name has atleast 3 characters')
        }
        if(password.length < 1){
            setPerror('please enter password')
            
        }else if(password.length < 5){
            setPerror('password has atleast 5 characters')
        }
        if(password.length >= 5 && name.length >= 3){
           let data = await signUp({ variables: { userName: name,password: password} })
           console.log(data)
           if(data.data.signUp === true){
               setPerror('Account created successfully')
           }else{
               setNerror('this username alredy exists')
           }
        }
        
    }

    return (
        <div className="Login">
            <form className="form" onSubmit={submit}>
                <h1>Sign Up</h1>
                <div>
                  
                    <div className="inputdiv">
                    <input type="text" className="signupinput"  name="userName" value={name} onInput={(e) =>{setName(e.target.value);setNerror('');;setPerror('') }} placeholder="Enter UserName..."/><br/>
                    <p>{nerror}</p>
                    </div>
                   <div className="inputdiv">
                        <input type="password" className="signupinput" name="password" onInput={(e)=>{setPassword(e.target.value);setPerror('');setNerror('')}} value={password} placeholder="Enter password..."/><br/>
                    <p> {perror}</p>
                   </div>
                    <button type="submit">SIGN UP <span className="loader">{loading? <Loader
        type="Oval"
        color="black"
        height={15}
        width={15}
        timeout={3000} //3 secs
      /> : ''}</span></button>
                    <p onClick={ ()=>{history.push("/")}}>SIGN IN</p>
                </div>
            </form>
        </div>
    )
}

export default Signup
