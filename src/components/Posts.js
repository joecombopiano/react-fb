import React, { Component } from 'react';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import Post from './Post';
class Posts extends Component {

    constructor(props){
        super(props);
    }
    componentDidMount(){

    }

    render(){
        const {posts} = this.props;
        return (
            <div className="Posts">
                <div>
                {posts.map((p, index)=>(
                    <Post key={index} post={p} />
                ))}</div>
            </div>

        )
    }

}

export default Posts;