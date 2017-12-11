import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {currentPageSelector, fetchPages, pagesSelector, updateSelectedPage} from "../ducks/pages.ducks";
import {postsSelector, fetchPosts, addPost} from "../ducks/posts.ducks";


import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Link } from 'office-ui-fabric-react/lib/Link';
import Posts from './Posts';
import NewPostForm from './NewPostForm';

import '../styles/FBPageContainer.css';

class FBPageContainer extends Component {

    constructor(props){
        super(props);
        this.onClosePanel = this.onClosePanel.bind(this);
        this.onRenderFooterContent = this.onRenderFooterContent.bind(this);
        this.onShowPanel = this.onShowPanel.bind(this);
        this.onRenderPageOptions = this.onRenderPageOptions.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.submitNewPost = this.submitNewPost.bind(this);
        this.state = {showPanel: false, selectedPageId: null, showPostForm: false};
    }
    componentDidMount(){
        this.props.fetchPages(this.props.auth);
        if(!this.state.showPanel && !this.selectedPageId){
            this.setState({showPanel: true});
        }
    }
    submitNewPost(formData){
        addPost(formData, this.props.currentPage).then(result=>{
            this.props.fetchPosts(this.props.currentPage);
            this.setState({showPostForm:false});
        });
    }

    render(){
        const {pages, currentPage, posts} = this.props;

        return (
            <div className="FBPageContainer">
                <div className="center">
                    { currentPage ? <span> <h2>{currentPage.name}</h2><Link onClick={this.onShowPanel}>change page...</Link></span>:
                    <Link onClick={this.onShowPanel}>Select a page to get started...</Link>}

                </div>

                <Panel
                    isOpen={ this.state.showPanel  }
                    type={ PanelType.smallFixedFar }
                    onDismiss={ this.onClosePanel }
                    headerText='Select a page'
                    closeButtonAriaLabel='Close'
                    onRenderFooterContent={ this.onRenderFooterContent }
                >
                    <ChoiceGroup

                        options={pages && pages.length > 0 ? this.props.pages.map(p=>({key: p.id, text: p.name})) : [] }
                        label='Pick one'
                        required={ true }
                        selectedKey={this.state.selectedPageId}
                        onChange={this.onPageChange}
                    />
                </Panel>
                {this.state.showPostForm ?
                    <NewPostForm onSubmit={formData => this.submitNewPost(formData)} onCloseForm={()=>this.setState({showPostForm:false})}/> : <PrimaryButton className="" onClick={() => this.setState({showPostForm: true})}>+ New
                    Post</PrimaryButton>
                }



                <h3>Posts:</h3>
                { posts && <Posts posts={posts}/>}



            </div>

        );
    }
    onPageChange(e, {key}){
        this.setState({selectedPageId: key});
    }

    onRenderPageOptions(){
        if(this.props.pages && this.props.pages.length > 0){
            return this.props.pages.map(p=>({id: p.id, value: p.name}));
        }else{
            return [];
        }
    }

    onClosePanel(){
        this.setState({ showPanel: false });
    }


    onRenderFooterContent(){
        return (
            <div>
                <PrimaryButton
                    onClick={()=>{ this.props.updateSelectedPage(this.props.pages.find(p=> p.id === this.state.selectedPageId)); this.onClosePanel();} }
                    style={ { 'marginRight': '8px' } }
                >
                    Save
                </PrimaryButton>
                <DefaultButton
                    onClick={ this.onClosePanel }
                >
                    Cancel
                </DefaultButton>
            </div>
        );
    }


    onShowPanel(){
        this.setState({ showPanel: true });
    }


}

const mapStateToProps = state =>(
    {
        pages: pagesSelector(state),
        currentPage: currentPageSelector(state),
        posts: postsSelector(state),
        auth: state.auth
    }
);


const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchPages,
            updateSelectedPage,
            fetchPosts
        },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(FBPageContainer);