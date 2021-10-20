import React,{useState,useContext} from 'react'
import { gql, useMutation } from '@apollo/client';
import {context} from "../App"
import { useHistory,Redirect } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const UPDATEPUBLIC = gql`

mutation Mutation($details: String!, $updatePublicId: ID!, $userName: String!) {
  updatePublic(details: $details, id: $updatePublicId, userName: $userName) {
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


function UpdatePublic() {
    let history = useHistory();
    let setLogIn = useContext(context);
    let [diary,setDiary] = useState(setLogIn.details);
    const [updateFunction, { data, loading, error }] = useMutation(UPDATEPUBLIC, {
        refetchQueries: [
          GETDIARIES, // DocumentNode object parsed with gql
          'DIARIES' // Query name
        ]});

    let UPDATE = async()=>{
        if(diary.length > 3){
            let result = await updateFunction({variables:{details:diary,updatePublicId:parseInt(setLogIn.id),userName:setLogIn.userName}});
            // console.log('details',diary,'id',setLogIn.id,'userName',setLogIn.userName);
        // <Redirect to ="/SelectDiary/PublicDiaries" />
            history.push("/SelectDiary/PublicDiaries")
        }
        
    }

    return (
        <div className="addpublic">
            <h1>UPDATE DIARY</h1>
            <div>
            <textarea id="w3review" value={diary} placeholder="Enter Diary..." onInput={(e) =>{setDiary(e.target.value)}}>
                
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

export default UpdatePublic
