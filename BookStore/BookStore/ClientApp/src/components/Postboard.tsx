import * as React from 'react';
import { connect, useSelector } from 'react-redux';
import { ApplicationState } from '../store';
import * as PostboardStore from '../store/Postboard';
import PostLayout from './Post';

type PostboardProps = PostboardStore.PostboardState
    & typeof PostboardStore.actionCreators;

const Postboard = (props: PostboardProps) => {
    React.useEffect(() => {
        props.requestPosts();
    }, []);

    console.log("Posts: " + props.posts);

    return (
        <React.Fragment>
            <h1>Posts</h1>
            <p>Anyway, check swagger</p>
            {
                props.posts.map(p => (PostLayout(p)))
            }
        </React.Fragment>
    )
}

export default connect(
    (state: ApplicationState) => state.postboard,
    PostboardStore.actionCreators
)(Postboard as any);