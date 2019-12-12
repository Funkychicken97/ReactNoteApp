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
								deleteHandler={this.deleteNote.bind(this)} />);
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
		})
	}

	addNote() {
		this.state.notes.push(
			{
				id: Date.now()
			}
		);
		this.setState(
			{ 
				notes: this.state.notes
			}
		);
	}

	deleteNote(id) {
		let newNoteArr = this.state.notes;
		newNoteArr.map((note, index) => {
			if (id === note.id) {
				newNoteArr.splice(index,1);
			}
			return false;
		});
		this.setState(
			{ notes: newNoteArr }
		)
	}
}

export default Board;