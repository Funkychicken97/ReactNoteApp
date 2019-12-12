import React, {Component} from 'react';
import '../css/Board.css';
import Note from './Note';

class Board extends Component {

	constructor() {
		super();
		this.state = {
			notes: []
		}
	}

	render() {
		return (
			<div>
				<div className="div-board">
					<div className="row">

						{
							this.state.notes.map(note => {
								return (<Note 

								id={note.id} 
								key={note.id} 
								deleteHandler={this.deleteNote.bind(this)}
								
								dbRef={this.props.dbRef}
								
								title={note.title}
								body={note.body}
								
								/>);
							})
						}

					</div>
				</div>
				<div>
					<button className="btn btn-success add-button" onClick={this.addNote.bind(this)}>Add
					</button>
				</div>
			</div>
		);
	}
	
	componentDidMount() {
		const nRef = this.props.dbRef;
		
		nRef.once('value', (snapshot) => {

			if ( snapshot.val() ) {
				let notes = Object.values(snapshot.val()).map((note) => {
					return note;
				});
	
				this.setState({notes: notes});
			}
		});


	
		nRef.on('child_added', (snapshot) => {
			this.updateHandler(snapshot.val(),'add')
		});
		
		nRef.on('child_removed', (snapshot) => {
			this.updateHandler(snapshot.val(),'delete')
		});
	}
	
	updateHandler(snap,change) {
		if ( change === 'add' ) {
			this.state.notes.push(snap);
		}
		if ( change === 'delete') {
			let newNoteArr = this.state.notes;
			newNoteArr.forEach((note, index) => {
				if (snap.id === note.id) {
					newNoteArr.splice(index,1);
				}
			});
		}
		this.setState({notes: this.state.notes});			
	}

	addNote() {
		this.props.dbRef.push({id: Date.now()});
	}

	deleteNote(id) {
		this.props.dbRef.once('value', (snapshot) => {
			let notes = Object.entries(snapshot.val());
			
			for ( var i = 0; i < notes.length; i++ ) {
				if ( notes[i][1].id === id ) {
					this.props.dbRef.child(notes[i][0]).remove();
				}
			}
			
		});
	}
}

export default Board;