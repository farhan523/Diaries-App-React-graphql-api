import React,{useState,useContext} from 'react'
import { gql, useMutation } from '@apollo/client';
import {context} from "../App"
import { useHistory,Redirect } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const UPDATEPRIVATE = gql`

mutation Mutation($userName: String!, $updatePrivateId: ID!, $details: String!) {
  updatePrivate(userName: $userName, id: $updatePrivateId, details: $details) {
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


function UpdatePrivate() {
    let history = useHistory();
    let setLogIn = useContext(context);
    let [diary,setDiary] = useState(setLogIn.details);
    console.log(setLogIn.userName);
    const [updateFunction, { data, loading, error }] = useMutation(UPDATEPRIVATE, {
        refetchQueries: [

            {query:GETDIARIES,variables:{userName:setLogIn.userName}}
        
        ],awaitRefetchQueries:true,onCompleted:()=>{ history.push("/SelectDiary/PrivateDiaries")}});

    let UPDATE = async()=>{
        if(diary.length > 3){
            let result = await updateFunction({variables:{details:diary,userName:setLogIn.userName,updatePrivateId:parseInt(setLogIn.id)}});
        // <Redirect to ="/SelectDiary/PublicDiaries" />
            // history.push("/SelectDiary/PrivateDiaries")
        }
        
    }

    return (
        <div className="addpublic">
            <h1>UPDATE DIARY</h1>
            <div>
            <textarea value={diary} placeholder="Enter Diary..." onInput={(e) =>{setDiary(e.target.value)}}>
                
            </textarea>
            
            </div>
            <button onClick={UPDATE}>Update Diary {loading? <Loader
        type="Oval"
        color="black"
        height={15}
        width={15}
        timeout={3000} //3 secs
      /> : ''}</button>
        </div>
    )
}

export default UpdatePrivate
