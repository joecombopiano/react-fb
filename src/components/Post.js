import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment'
import '../styles/Post.css';

class Post extends Component {

    constructor(props){
        super(props);
    }
    componentDidMount(){

    }
    
    render(){
        const {post} = this.props;

        return (
            <div className="Post ms-Grid">

            <div className="ms-Grid-row">
                <div className="time ms-Grid-col ms-sm6 ms-md8 ms-lg10">{moment(post.created_time).format('LLLL')}</div>

                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">{post.is_published ? 'Published' : 'Unpublished'}</div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">{post.message}</div>
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">Views: {post.views}</div>
            </div>



            </div>

        )
    }

}

const mapStateToProps = state =>(
    {

    }
);


const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators(
        {
            //getPostViews,

        },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
