import React, {Component} from "react";
import {connect} from "react-redux";
import {postNewComment} from "../store/actions/messages";
import CommentList from "../containers/CommentList";
// import CommentList from "../containers/CommentList";

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: "",
            message_id: this.props.match.params.message_id,
            user_id: this.props.match.params.id
        };
    }
    
    handleNewMessage = event => {
        event.preventDefault();
        this.props.postNewComment(this.state);
        this.setState({message: ""});
        window.location.reload();
    };

    render(){
        return (
            <div className="row col-8">
                <div className="offset-1 col-sm-10">
                    <ul className="list-group" id="messages">
                         <CommentList message_id={this.state.message_id} user_id={this.state.user_id}/>
                        <div className="comments">
                            <li className="list-group-item">
                                <div className="message-area">

                                    <form onSubmit={this.handleNewMessage}>
                                        {this.props.errors.message && (
                                            <div className="alert alert-danger">
                                                {this.props.errors.message}
                                            </div>
                                        )}
                                        <textarea 
                                            rows = "2"
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Add a comment..."
                                            value={this.state.message}
                                            onChange={e => this.setState({message: e.target.value})}
                                        />
                                        <button type="submit" className="btn btn-primary pull-right submitbtn">
                                            Comment!
                                        </button>
                                    </form>
                                </div>
                            </li>
                        </div>
                        
                    </ul>
                </div>
                
            </div>

        )
    }
}

function mapStateToProps(state){
    return{
        errors: state.errors
    };
}

export default connect(mapStateToProps, { postNewComment })(CommentForm);
