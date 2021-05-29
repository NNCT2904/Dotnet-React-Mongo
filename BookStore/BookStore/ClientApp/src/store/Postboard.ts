import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export const ACTIONS = {
    FETCH: "FETCH_POST",
    CREATE: "CREATE_POST",
    UPDATE: "UPDATE_POST",
    DELETE: "DELETE_POST"
}

export interface PostboardState {
    posts: Post[];
}

export interface Post {
    id: string;
    userId: string;
    userName: string;
    content: string;
    created: Date;
    updated: Date;
}

interface RequestPostsAction {
    type: "FETCH_POST";
    posts: Post[];
}

interface CreatePostAction {
    type: "CREATE_POST";
    post: Post[];
}

type KnownAction = RequestPostsAction | CreatePostAction;

export const actionCreators = {
    requestPosts: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        fetch(`api/posts`)
            .then(response => response.json() as Promise<Post[]>)
            .then(data => {
                dispatch({
                    type: 'FETCH_POST',
                    posts: data
                });
            });

    }
}

const unloadedState: PostboardState = {
    posts: [],
}

export const reducer: Reducer<PostboardState> = (state: PostboardState | undefined, incomingAction: Action): PostboardState => {
    if (state === undefined) {
        return unloadedState;
    }
    const action = incomingAction as KnownAction;
    // console.log({ statePost: state.posts, actionPosts: (action as RequestPostsAction).posts });
    switch (action.type) {
        case 'FETCH_POST':
            const newPosts = (action as RequestPostsAction).posts
                .filter((p) => !state.posts.map(sp => sp.id).includes(p.id));
                
            return {
                posts: [
                    ...state.posts,
                    ...newPosts,
                ],
            }
        default:
            return state;
    }
}