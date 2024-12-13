import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import SearchBar from './SearchBar';

const Notes = (props) => {

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes()
    }
    else {
      navigate("/")
    }
    //eslint-disable-next-line
  }, [])

  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const { showAlert } = props;
  const ref = useRef(null)
  const refClose = useRef(null)

  

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState(null);
  
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    const handleUpload = async (event) => {
      event.preventDefault();
  
      if (!file) {
        setMessage('Please select a file to upload');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await axios.post('http://localhost:5000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessage(`File uploaded successfully`);
      } catch (error) {
        console.error(error);
        setMessage(`File upload failed due to ${error}`);
      }
    };

  return (
    <>

      

      <div style={{ marginTop : '100px',marginLeft:'500px',border: '1px solid #ccc', padding: '20px', borderRadius: '10px', width: '300px', backgroundColor:'rgb(195 195 195 / 58%)'}}>
        <h3>Upload File</h3>
        <form onSubmit={handleUpload}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit" style={{ marginTop: '10px' }}>
            Upload
          </button>
          <button type="submit" style={{ marginTop: '10px' }}>
            Delete
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>

      <SearchBar/>

    </>
  )
}

export default Notes
