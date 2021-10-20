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
    query DIARIES {
        publicDiaries {
            details
            lastEdited
            id
            lastEditedBy
        }
}
`
let DELETE = gql`
    mutation Mutation($deletePublicId: ID!) {
    deletePublic(id: $deletePublicId) {
        details
        id
        lastEdited
  }
}


`

function PublicDiaries() {
    let setLogIn = useContext(context);
    let history = useHistory();
    let { path, url } = useRouteMatch();
    const { loading, error, data } = useQuery(GETDIARIES);
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
            history.push("/SelectDiary/PublicDiaries/UpdateDiary")
        }

    return (
        <div className="publicDiaries">
            <h1> PUBLIC DIARIES <Link style={{color: 'black'}} to={`/AddDiary`}>  <i class="far fa-plus-square"></i> </Link></h1>
            <div className="diaries">
                {loading ? <Loader
        type="Oval"
        color="black"
        height={15}
        width={15}
        timeout={3000} //3 secs
      />: data?.publicDiaries.map((item)=>{
          return <div className="card">
                <div>
                    <h2>Details:</h2>
                    <h5>{item.details}</h5>
                </div>
                <div><p>Last Edited By : {item.lastEditedBy}</p>
                <p>Last Edited On : {item.lastEdited}</p></div>
                <div>
                <i className="fas fa-trash" onClick={()=>{deleteFunction({variables:{deletePublicId:parseInt(item.id)}})}}></i>
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

export default PublicDiaries
