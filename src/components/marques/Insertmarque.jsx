import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import {addmarque} from "../../service/marqueservice"
import { FilePond,registerPlugin} from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import axios from '../../api/axios';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


const Insertmarque = ({show,handleClose,handleAddmarque}) => {
const[marque,setMarque]=useState({})
const [files, setFiles] = useState([]);

const handleSubmit = async(event) => {
event.preventDefault();
// Logique pour soumettre le formulaire
await addmarque(marque).then(res=>handleAddmarque(res.data))
handleClose()
// Réinitialiser les champs du formulaire
setMarque({})
};

const serverOptions = () => { console.log('server pond');
  return {
  process: (fieldName, file, metadata, load, error, progress, abort) => {
  console.log(file)
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'test2025');
  data.append('cloud_name', 'dr09h69he');
  data.append('public_id', file.name);
  axios.post('https://api.cloudinary.com/v1_1/dr09h69he/image/upload', data)
  .then((response) => response.data)
  .then((data) => {
  console.log(data);
  setMarque({...marque,imagemarque:data.url}) ;
  load(data);
  })
  .catch((error) => {
  console.error('Error uploading file:', error);
  error('Upload failed');
  abort();
  });
  },
  };
};

  return (
    <div className="form-container">
    <Modal show={show} onHide={handleClose}>
    <form className="marque-form">
    <Modal.Header closeButton>
    <h2>Ajouter Marque</h2>
    </Modal.Header>
    
    <Modal.Body>
    <div className="form-grid">
    <div className="form-group">
    <label htmlFor="title">Nom Marque</label>
    <input
    type="text"
    id="nommarque"
    value={marque.nommarque}
    onChange={(e) => setMarque({...marque,nommarque:e.target.value})}
    className="form-input"
    placeholder="Entrez marque nom"
    />
    </div>
    
    <div style={{ width: "100%", margin: "auto", padding: "1%" }}>
      <FilePond
          files={files}
          acceptedFileTypes="image/*"
          onupdatefiles={setFiles}
          allowMultiple={true}
          server={serverOptions()}
          name="file"
    />
    </div>
    </div>
    </Modal.Body>
    <Modal.Footer>
    <button type="button" className="form-submit-button"
    onClick={(e)=>handleSubmit(e)}>Enregistrer</button>
    <button type="reset" className="form-reset-button"
    onClick={()=>handleClose()}>Annuler</button>
    </Modal.Footer>
    </form>
    </Modal>
    </div>
  )
}

export default Insertmarque
