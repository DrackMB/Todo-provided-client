import './App.css';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client'
import {onError} from "@apollo/client/link/error";
import AfficheTODO from "./Component/AfficheTODO";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import DetaillTODO from "./Component/DetaillTODO";
/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
const errorLink=onError(({graphqlErrors,networkError})=>{
    if(graphqlErrors){
        graphqlErrors.map(({message,location,path})=>{
            alert('Graphql error ${message}')
        })
    }
});
const link = from([
    errorLink,
    new HttpLink({uri:" http://localhost:4000/"})
])
const client = new ApolloClient({
    cache:new InMemoryCache(),
    link: link,
});

function App() {
    const link = css`
      text-decoration: none;
      padding: 16px;
    `;
    const ul = css`
      text-decoration: none;
      list-style: none;
      display: inline-flex;
    `;
    const il = css`
      border: #d9d9d9 0.1px solid;
      padding: 3px;
      margin: 2px;
      &:hover{
        background-color: #d9d9d9;
      }
    `;
    return <ApolloProvider client={client}>   <Router>
        <div>
            <ul css={ul}>
                <li css={il}>
                    <Link css={link} to="/">ToDo Detaill</Link>
                </li>
                <li css={il}>
                    <Link css={link} to="/afficheTodo">Liste ToDo</Link>
                </li>

            </ul>

            <hr />

            <Switch>
                <Route exact path="/" >
                    <DetaillTODO />
                </Route>
                <Route path="/afficheTodo">
                    <AfficheTODO />
                </Route>
            </Switch>
        </div>
    </Router> </ApolloProvider>
}

export default App;
