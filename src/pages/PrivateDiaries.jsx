import React,{useContext} from 'react'
import { gql, useQuery,useMutation } from '@apollo/client';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useHistory,Redirect } from "react-router-dom";
import {context} from "../App"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";

let GETDIARIES = gql`
    query Query($userName: String) {
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
let DELETE = gql`
    mutation Mutation($userName: String!, $deletePrivateId: ID!) {
        deletePrivate(userName: $userName, id: $deletePrivateId) {
            details
            id
            lastEdited
        }
}
  



`

function PrivateDiaries() {
    let setLogIn = useContext(context);
    let history = useHistory();
    let { path, url } = useRouteMatch();
    const { loading, error, data } = useQuery(GETDIARIES, {
        variables: { userName:setLogIn.userName },
      });
    const [deleteFunction,deleteobject] = useMutation(DELETE, {
        refetchQueries: [
          GETDIARIES, // DocumentNode object parsed with gql
          'DIARIES' // Query name
        ]});
    console.log(data)
    console.log(deleteobject)

        let UPDATE = (id,details)=>{
            setLogIn.setId(id) ;
            setLogIn.setDetails(details);
            history.push("/SelectDiary/PrivateDiaries/UpdatePrivate")
        }

    return (
        <div className="publicDiaries">
            <h1> PRIVATE DIARIES <Link style={{color: 'black'}} to={`${url}/AddPrivateDiary`}>  <i class="far fa-plus-square"></i> </Link></h1>
            <div className="diaries">
                {loading ? <Loader
        type="Oval"
        color="black"
        height={15}
        width={15}
        timeout={3000} //3 secs
      />: data?.privateDiaries[0].personalDiaries.map((item)=>{
          return <div className="card">
                <div>
                    <h2>Details:</h2>
                    <h5>{item.details}</h5>
                </div>
                <div>
                <p>Last Edited On : {item.lastEdited}</p></div>
                <div>
                <i className="fas fa-trash" onClick={()=>{deleteFunction({variables:{userName:setLogIn.userName,deletePrivateId:parseInt(item.id)}})}}></i>
                <i class="far fa-edit" onClick={()=>{UPDATE(item.id,item.details)}}></i>
                {deleteobject.loading ?<Loader
        type="Oval"
        color="black"
        height={15}
        width={15}
        timeout={3000} //3 secs
      />     : ''}
                </div>
          </div>
      })}
            </div>
        </div>
    )
}

export default PrivateDiaries