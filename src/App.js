import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SelectDiary from "./pages/SelectDiary";
import {Route,Switch,Redirect,Link} from 'react-router-dom';
import {useEffect,useState,createContext} from 'react'
import PublicDiaries from "./pages/PublicDiaries";
import AddPublic from "./pages/AddPublic";
import UpdatePublic from "./pages/UpdatePublic";
import PrivateDiaries from "./pages/PrivateDiaries";
import AddPrivate from "./pages/AddPrivate";
import UpdatePrivate from "./pages/UpdatePrivate";


 let context = createContext()
function App() {
  
  
 let [isLogin,setIsLogin] = useState(false);
 let [userName,setUserName] = useState('');
 let [details,setDetails]  = useState('');
 let [id,setId] = useState();
 
 

  return (
    <context.Provider value={{isLogin: isLogin,setIsLogin,userName:userName,setUserName,details:details,setDetails,id:id,setId}}>
        <div className="App">
        <div className="navbar">
          <h2><Link to="/SelectDiary/PublicDiaries" style={{textDecoration:'none'}}>PUBLIC DIARIES</Link></h2>
          <h2><Link to="/SelectDiary/PrivateDiaries" style={{textDecoration:'none'}}>PRIVATE DIARIES</Link></h2>
        </div>

      <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/Signup">
            <Signup />
          </Route>
          {/* <Route path="/SelectDiary">
              <SelectDiary/>
          </Route> */}
          {isLogin ?  <Route path="/SelectDiary" exact={true}>
              <SelectDiary/>
          </Route> : <Redirect to="/" />}
          {isLogin ?   <Route path="/SelectDiary/PublicDiaries" exact={true}>
              <PublicDiaries/>
          </Route> : <Redirect to="/" />}
          {isLogin ?   <Route path="/AddDiary" exact={true}>
              <AddPublic/>
          </Route> : <Redirect to="/" />}
          {isLogin ?   <Route path="/SelectDiary/PublicDiaries/UpdateDiary" exact={true}>
              <UpdatePublic/>
          </Route> : <Redirect to="/" />}
          {isLogin ?   <Route path="/SelectDiary/PrivateDiaries" exact={true}>
              <PrivateDiaries/>
          </Route> : <Redirect to="/" />}
          {isLogin ?   <Route path="/SelectDiary/PrivateDiaries/AddPrivateDiary" exact={true}>
              <AddPrivate/>
          </Route> : <Redirect to="/" />}
          {isLogin ?   <Route path="/SelectDiary/PrivateDiaries/UpdatePrivate" exact={true}>
              <UpdatePrivate/>
          </Route> : <Redirect to="/" />}
          
        </Switch>
      </div>
    </context.Provider>
 
    
  );
}

export default App;
export  {context}
