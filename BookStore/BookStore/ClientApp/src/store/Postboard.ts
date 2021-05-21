import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export const ACTIONS = {
    CREATE: "CREATE_POST",
    UPDATE: "UPDATE_POST",
    DELETE: "DELETE_POST"
}

export interface PostboardState {
    posts: Post[];

}

export interface Post {
    Id: string;
    UserId: string;
    UserName: string;
    Content: string;
    Created: Date;
    Updated: Date;
}

interface RequestPostsAction {
    type:"UPDATE_POST";
    posts: Post[];
}

interface CreatePostAction {
    type: "CREATE_POST";
    post: Post[];
}

type KnownAction = RequestPostsAction | CreatePostAction;

export const actionCreators = {
    requestPosts: () :AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.postBoard !== appState.postBoard) {
            fetch(`api/posts`)
                .then(response => response.json() as Promise<Post[]>)
                .then(data => {
                    dispatch({
                        type:'UPDATE_POST',
                        posts: data
                    });
                });
        }
    }
}

const unloadedState: PostboardState = {
    posts: [],
}

export const reducer: Reducer<PostboardState> = (state:PostboardState | undefined, incomingAction: Action) : PostboardState => {
    if (state === undefined){
        return unloadedState;
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'UPDATE_POST':
            return {
                posts: action.posts,
            }
    }
    return state;
}