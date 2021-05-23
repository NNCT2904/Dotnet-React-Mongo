import * as React from 'react';
import { connect } from 'react-redux';
import {ApplicationState} from '../store';
import * as PostboardStore from '../store/Postboard';
import FetchData from './FetchData';

type PostboardProps = PostboardStore.PostboardState 
    & typeof PostboardStore.actionCreators;

const Postboard = (props:PostboardProps) => {
    return (
         <React.Fragment>
            <h1>Posts</h1> 
            <p>Anyway, check swagger</p>
            {console.log("Posts: "+props.posts)}
        </React.Fragment>
    )
}

export default connect(
    (state: ApplicationState) => state.postBoard,
    PostboardStore.actionCreators
)(Postboard as any);