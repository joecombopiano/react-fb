import {reduxForm, formValueSelector, Field, FieldArray, change, destroy} from 'redux-form';
import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {TextField} from 'office-ui-fabric-react/lib/TextField';
import {PrimaryButton, DefaultButton} from 'office-ui-fabric-react/lib/Button';


const renderTextField = props => {
    return <TextField multiline rows={4} placeholder="Your message goes here."  onChanged={(value)=> props.input.onChange(value)}/>
};

class NewPostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {showDate: false};
    }
    getEpoch(val){
        return moment(val).unix();
    }
    getDateTimeLocal(val){
        return val ? moment.unix(val).format('YYYY-MM-DDThh:mm'): '';
    }
    render() {
        const {handleSubmit, onCloseForm} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <h3>New Post</h3>
                <Field className="m10" name="message" component={renderTextField}/>
                <div className="m10">
                    <label><Field name="published" component="input" type="radio" value="true"
                                  onClick={() => this.setState({showDate: false})}/>Published</label>
                    <label><Field name="published" component="input" type="radio" value="false"
                                  onClick={() => this.setState({showDate: true})}/> Unpublished</label>
                </div>
                {
                    this.state.showDate &&
                    <div className="m10">
                        <label className="m10">
                            Published Time:
                            <Field name="scheduled_publish_time"
                                      component="input"
                                      type="datetime-local"
                                      value="true"
                                      parse={this.getEpoch}
                                      format={this.getDateTimeLocal}
                            />
                            </label>

                    </div>
                }
                <div>
                    <PrimaryButton
                        onClick={handleSubmit}
                        style={{'marginRight': '8px'}}
                    >
                        Save
                    </PrimaryButton>
                    <DefaultButton
                        type="button"
                        onClick={onCloseForm}
                    >
                        Cancel
                    </DefaultButton>
                </div>

            </form>
        );
    }


}

const mapStateToProps = (state, props) => ({

    initialValues: {
        message: null,
        published: true,
        scheduled_publish_time: ''

    }


});


NewPostForm = reduxForm({form: 'newPostForm', enableReinitialize: true})(NewPostForm);

NewPostForm = connect(mapStateToProps)(NewPostForm);


export default NewPostForm;

