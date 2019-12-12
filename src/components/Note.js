import React, {Component} from 'react';
import '../css/Note.css';
import PropTypes from 'prop-types';

const GENERIC_NOTE_TITLE = "New Note Title",
GENERIC_NOTE_BODY = "New Note Body";

class Note extends Component {

	componentWillMount() {
		this.setState( {
			title: this.props.title || GENERIC_NOTE_TITLE,
			body: this.props.body || GENERIC_NOTE_BODY,
			editMode: false
		});
	}

	render() {

		let titleElement, bodyElement, buttonArea;

		if ( this.state.editMode ) {
			titleElement = <textarea ref="titleContent" className="title-textarea" defaultValue={this.state.title}></textarea>;

			bodyElement = <textarea ref="bodyContent" className="body-textarea" defaultValue= {this.state.body}></textarea>;

			buttonArea = <div><button className="btn btn-primary" onClick={this.handleSave.bind(this)}>Save</button></div>;

		} else {
			titleElement = <h5>{this.state.title}</h5>;

			bodyElement = <p>{this.state.body}</p>

			buttonArea = (
				<div>
					<button className="btn btn-info" onClick={this.handleEdit.bind(this)}>Edit</button>
					<button className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</button>
				</div>);
		}

		return (

			<div className="col-sm-6">
				<div className="card card-view">
					<div className="card-body">

						{titleElement}
						{bodyElement}
						{buttonArea}

					</div>
				</div>
			</div>
		);
	}

	handleEdit() {
		this.setState({
			editMode: true
		})
	}
	handleSave() {
		let noteSave = {
			title: this.refs.titleContent.value,
			body: this.refs.bodyContent.value,
			editMode: false
		};
		
		
		this.setState(noteSave);
		
		this.props.dbRef.once('value', (snapshot) => {
			let notes = Object.entries(snapshot.val());
			
			for ( var i = 0; i < notes.length; i++ ) {
				if ( notes[i][1].id === this.props.id ) {
					this.props.dbRef.child(notes[i][0]).update(noteSave);
				}
			}
			
		});
		
	}
	handleDelete() {
		this.props.deleteHandler(this.props.id);
	}

}

Note.defaultProps = {
	title: "Default Title",
	body: "Default Body Text"
}

Note.propTypes = {
	title: PropTypes.string
}

export default Note;