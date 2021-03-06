import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";

const App = () => {
    return (
        <Router>
            <div>
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route
                        path="/pdf-to-text"
                        render={(props) =>
                            <Page1 {...props} />
                        }
                    />
                    <Route
                        path="/form-example"
                        render={(props) =>
                            <Page2 {...props} />
                        }
                    />
                </Switch>
            </div>
        </Router>
    );
};

export default App;