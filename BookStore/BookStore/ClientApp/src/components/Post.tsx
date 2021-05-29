import * as React from 'react'
import { Post } from '../store/Postboard';

const PostLayout = ({id, userName, content, created, updated}:Post) => {
    return (
        <React.Fragment key={id}>
            <div>
                <p>From: {userName}</p>
                <p>{content}</p>
                <div>
                    Created at: {created}, updated at: {updated}
                </div>
            </div>
        </React.Fragment>
    )
}

export default PostLayout;