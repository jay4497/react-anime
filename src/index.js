import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Nav from './Nav'
import Anime from './Anime'
import Content from './Content'

ReactDOM.render((
    <Router>
        <Nav/>
        <Switch>
            <Route exact path="/">
                <Anime/>
            </Route>
            <Route path="/anime/:id" children={<Content/>} />
        </Switch>
    </Router>
), document.querySelector('#app'))
