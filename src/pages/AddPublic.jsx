import React,{useState,useContext} from 'react'
import { gql, useMutation } from '@apollo/client';
import {context} from "../App"
import { useHistory,Redirect } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const ADDPUBLIC = gql`

mutation Mutation($details: String!, $userName: String!) {
  createPublic(details: $details, userName: $userName) {
    details
    id
    lastEdited
    lastEditedBy
  }
}
`




let GETDIARIES = gql`
    query DIARIES {
        publicDiaries {
            details
            lastEdited
            id
            lastEditedBy
        }
}
`


function AddPublic() {
    let history = useHistory();
    let setLogIn = useContext(context);
    let [diary,setDiary] = useState('');
    const [addFunction, { data, loading, error }] = useMutation(ADDPUBLIC, {
        refetchQueries: [
          GETDIARIES, // DocumentNode object parsed with gql
          'DIARIES' // Query name
        ]});

    let ADD = async()=>{
        if(diary.length > 3){
            let result = await addFunction({variables:{details:diary,userName:setLogIn.userName}});
        // <Redirect to ="/SelectDiary/PublicDiaries" />
            history.push("/SelectDiary/PublicDiaries")
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

export default AddPublic
