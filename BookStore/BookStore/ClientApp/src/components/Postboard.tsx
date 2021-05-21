import * as React from 'react';
import { connect } from 'react-redux';
import {ApplicationState} from '../store';
import * as PostboardStore from '../store/Postboard';

type PostboardProps = PostboardStore.PostboardState 
    & typeof PostboardStore.actionCreators;

class Postboard extends React.PureComponent<PostboardProps> {
    public componentDidMount() {
        this.ensureDataFetched();
        console.log(this.props.posts);
    }

    private ensureDataFetched() {
        this.props.requestPosts();
    }

    private renderPosts() {

    }

    public render() {
        return (
            <React.Fragment>
                <h1>Posts</h1>
                
            </React.Fragment>
        )
    }
}



export default Postboard;