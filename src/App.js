import React, {Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import Layout from "./components/layout/Layout";
import Quotes from "./pages/Quotes";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const QuoteDetails = React.lazy(() => import('./pages/QuoteDetails'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
    return (
        <Layout>
            <Suspense fallback={<div className='centered'><LoadingSpinner/></div>}>
                <Switch>
                    <Route path='/' exact>
                        <Redirect to='/quotes'/>
                    </Route>
                    <Route path='/new-quote'>
                        <NewQuote/>
                    </Route>
                    <Route path='/quotes' exact>
                        <Quotes/>
                    </Route>
                    <Route path='/quotes/:quoteId'>
                        <QuoteDetails/>
                    </Route>
                    <Route path='*'>
                        <NotFound/>
                    </Route>
                </Switch>
            </Suspense>
        </Layout>
    );
}

export default App;


// quote
// quote - detail
// quote - add new quote
