import React, { useState,useContext} from "react";
import noteContext from "../context/notes/noteContext";

function Addnote(props) {
    const context = useContext(noteContext);
  const { addNote } = context;

const [note, setNote]=useState({title: "", description: "", tag: ""});
  const handleClick = (e)=>{
    e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Added Note successfuly","success")
  }

  const onChange = (e)=>{
        setNote({...note,[e.target.name]: e.target.value})

  }

  return (
    <div className="container my-3">
      <h2>add note</h2>

      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            title
          </label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
          <label htmlFor="description"  className="form-label"> description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description}  onChange={onChange} minLength={5} required/>
          </div>
          < div className="mb-3">
          <label htmlFor="tag"  className="form-label"> tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required/>
         </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
        
        
    </div>
  );
}

export default Addnote;
