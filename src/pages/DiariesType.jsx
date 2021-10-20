import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";

function DiariesType() {
    let { path, url } = useRouteMatch();
    return (
        <div className="select-diary">
            <Link className="diary" to={`${url}/publicDiaries`}>
                <div className="">
                    <h1>Public Diaries</h1>
                </div>
            </Link>

            <Link className="diary" to={`${url}/privateDiaries`}>
                <div className="">
                    <h1>Private Diaries</h1>
                </div>
            </Link>
        </div>
    )
}

export default DiariesType
