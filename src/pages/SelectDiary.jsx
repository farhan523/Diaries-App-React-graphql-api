import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";

  import PublicDiaries from "./PublicDiaries"
  import DiariesType from "./PublicDiaries"

function SelectDiary() {
    let { path, url } = useRouteMatch();
    return (
        <div className="select-diary">
            <Link className="diary" to={`${url}/PublicDiaries`}>
            <div className="">
                <h1>Public Diaries</h1>
            </div>
            </Link>
            <Link className="diary" to={`${url}/PrivateDiaries`}>
            <div className="">
                <h1>Private Diaries</h1>
            </div>
            </Link>

        {/* <Switch>
            <Route exact path={path}>
                <DiariesType/>
            </Route>
            <Route path={`${path}/:topicId`} exact>
                <PublicDiaries />
            </Route>
        </Switch> */}
        </div>
        
    )
}

export default SelectDiary
