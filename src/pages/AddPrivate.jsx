import React,{useState,useContext} from 'react'
import { gql, useMutation } from '@apollo/client';
import {context} from "../App"
import { useHistory,Redirect } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const ADDPRIVATE = gql`

mutation CreatePrivateMutation($details: String!, $userName: String!) {
  createPrivate(details: $details, userName: $userName) {
    details
    id
    lastEdited
  }
}


`




let GETDIARIES = gql`
    query DIARIES($userName: String) {
        privateDiaries(userName: $userName) {
            name
            personalDiaries {
            details
            id
            lastEdited
            }
        }
}
`


function AddPrivate() {
    let history = useHistory();
    let setLogIn = useContext(context);
    let [diary,setDiary] = useState('');
    console.log(setLogIn.userName);
    const [addFunction, { data, loading, error }] = useMutation(ADDPRIVATE, {
        refetchQueries: [

            {query:GETDIARIES,variables:{userName:setLogIn.userName}}
        
        ],awaitRefetchQueries:true,onCompleted:()=>{ history.push("/SelectDiary/PrivateDiaries")}});

    let ADD = async()=>{
        if(diary.length > 3){
            let result = await addFunction({variables:{details:diary,userName:setLogIn.userName}});
        // <Redirect to ="/SelectDiary/PublicDiaries" />
            // history.push("/SelectDiary/PrivateDiaries")
        }
        
    }

    return (
        <div className="addpublic">
            <h1>ADD DIARY</h1>
            <div>
            <textarea id="w3review" name="w3review" placeholder="Enter Diary..." onInput={(e) =>{setDiary(e.target.value)}}>
                
            </textarea>
            
            </div>
            <button onClick={ADD}>Add Diary {loading? <Loader
        type="Oval"
        color="black"
        height={15}
        width={15}
        timeout={3000} //3 secs
      /> : ''}</button>
        </div>
    )
}

export default AddPrivate
