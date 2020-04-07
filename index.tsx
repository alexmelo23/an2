import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { render } from 'react-dom';

// import Dashboard from "./components/dashboard";
import MainAnnotateLayout from "../src/annotationComponent/MainAnnotateLayout";
// import FileManager from "./components/file-manager/index";
// import Signin from './components/auth/signin/index';
import './config'
import './App.css';
import 'antd/dist/antd.css';
import TopHeader from './layout/common/header/Header';
// import { RootStoreContext } from "./store/rootStore";
// import { createBrowserHistory } from 'history'
// import { syncHistoryWithStore } from 'mobx-react-router';



const Index: React.FC = () => {
    return (
        <div>
            <Router>
                {/* <TopHeader /> */}
                <Switch>
                    {/* <Route path="/signin" component={Signin} /> */}
                    <Route exact path="/" component={MainAnnotateLayout} />
                    {/* <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/file-manager" component={FileManager} /> */}
                    }
                    </Switch>
            </Router>
        </div>
    );
};


render(<Index />, document.getElementById('root'));





