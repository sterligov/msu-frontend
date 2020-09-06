import React from "react";
import {Route, Switch} from "react-router-dom";
import Article from "./Article";
import AppealForm from "./AppealForm";
import Home from "./Home";
import ArticleList from "./ArticleList";
import Error from "./Error";
import Login from "./admin/Login";
import ArticleFormPost from "./admin/ArticleFormPost";
import ArticleFormPut from "./admin/ArticleFormPut";
import Contacts from "./Contacts";
import Logout from "./admin/Logout";
import Appeal from "./admin/Appeal";
import AppealList from "./admin/AppealList";
// import ym from "react-yandex-metrika";

export default class RouterContainer extends React.Component {
    render() {
        return (
            <>
                <Route path="/" render={({location}) => {
                    if (typeof window.ga === 'function') {
                        const uri = location.pathname + location.search;
                        window.ga("set", "page", uri);
                        window.ga("send", "pageview");
                        // ym("hit", uri);
                    }
                }} />
                <Switch>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <Route exact path="/admin">
                        <Login/>
                    </Route>
                    <Route exact path="/logout">
                        <Logout/>
                    </Route>
                    <Route exact path="/main/statistics">
                        {/*old path*/}
                        <AppealList/>
                    </Route>
                    <Route exact path="/appeals">
                        <AppealList/>
                    </Route>
                    <Route exact path="/appeals/:id">
                        <Appeal/>
                    </Route>
                    <Route exact path="/contacts">
                        <Contacts/>
                    </Route>
                    <Route exact path="/reception">
                        <AppealForm department="Администрация"/>
                    </Route>
                    <Route exact path="/reception-library">
                        <AppealForm department="Библиотека"/>
                    </Route>
                    <Route exact path="/admin/articles/:id">
                        <ArticleFormPut/>
                    </Route>
                    <Route strict path="/admin/articles">
                        <ArticleFormPost/>
                    </Route>
                    <Route exact path="/articles/:id">
                        <Article/>
                    </Route>
                    <Route path="/tags/:tag/:page">
                        <ArticleList partial="false" />
                    </Route>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/:route">
                        <Article/>
                    </Route>
                    <Route >
                        <Error error={{status: 404}}/>
                    </Route>
                </Switch>
            </>
        );
    }
}