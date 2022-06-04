import {Link, Route, useHistory, useLocation, useParams, useRouteMatch} from "react-router-dom";
import {Fragment, useEffect} from "react";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import {getSingleQuote} from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetails = () => {
    const {sendRequest: getQuote, status, data: quote, error} = useHttp(getSingleQuote, true);
    const match = useRouteMatch();
    const history = useHistory();
    const location = useLocation();
    const params = useParams();
    const {quoteId} = params;

    useEffect(() => {
        getQuote(quoteId);
    }, [getQuote, quoteId]);

    const showComments = location.pathname === `/quotes/${quoteId}/comments`;

    const toggleCommentHandler = (event) => {
        event.preventDefault(); // Stop link navigation

        if(showComments)
            history.push(`${match.url}`);
        else
            history.push(`${match.url}/comments`);
    };

    if(status === 'pending') {
        return <LoadingSpinner/>
    }

    if(status === 'error') {
        return <p className='centered focused'>{error}</p>
    }

    if(!quote.text && !quote.author) {
        return <p className='centered'>Quote Not Found</p>
    }

    return (
        <Fragment>
            {quote && <HighlightedQuote text={quote.text} author={quote.author}/> }
            {!quote && <p>Quote not found</p>}
            <div className='centered'>
                <Link to='' onClick={toggleCommentHandler}>{showComments? 'hide' : 'show'} comments</Link>
            </div>
            <Route path={`${match.path}/comments`}>
                <Comments quoteId={quoteId}/>
            </Route>
        </Fragment>
    )
};

export default QuoteDetails;
