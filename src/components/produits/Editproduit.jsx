import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import {fetchscategories} from "../../service/scategorieservice";
import {fetchmarques} from "../../service/marqueservice";
import {editproduit} from "../../service/produitservice";
import { FilePond,registerPlugin} from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import axios from 'axios';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


const Editproduit = ({show,handleClose,pro,handleUpdateProduct}) => {

  const[produit,setProduit]=useState(pro)
  const[scategories,setScategories]=useState([])
  const[marques,setMarques]=useState([])
  const [files, setFiles] = useState([]);

  const loadscategories=async()=>{
    try {
    const res = await fetchscategories()
    setScategories(res.data);
    console.log(res.data)
    } catch (error) {
    console.log(error);
    }
    }
    const loadmarques=async()=>{
      try {
      const res = await fetchmarques()
      setMarques(res.data);
      console.log(res.data)
      } catch (error) {
      console.log(error);
      }
      }
      useEffect(() => {
        loadscategories();
        loadmarques();
        setFiles( [
          {
          source: pro.imagepro,
          options: { type: 'local' }
          }
          ])
        }, [])
  const handleUpdate = async(event) => {
          event.preventDefault();
          // Logique pour soumettre le formulaire
          await editproduit(produit).then(res=>handleUpdateProduct(res.data))
          handleClose()
          // Réinitialiser les champs du formulaire
          setProduit({})
  };
  const serverOptions = () => {
    return {
    load: (source, load, error, progress, abort, headers) => {
    var myRequest = new Request(source);
    fetch(myRequest).then(function(response) {
    response.blob().then(function(myBlob) {
    load(myBlob);
    });
    });
    },
    process: (fieldName, file, metadata, load, error, progress, abort) => {
    console.log(file)
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'Ecommerce_cloudinary');
    data.append('cloud_name', 'iset-sfax');
    data.append('public_id', file.name);
    axios.post('https://api.cloudinary.com/v1_1/iset-sfax/image/upload', data)
    .then((response) => response.data)
    .then((data) => {
    console.log(data);
    setProduit({...produit,imagepro:data.url}) ;
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
      <form className="article-form">
      <Modal.Header closeButton>
      <h2>Modifier Produit</h2>
      </Modal.Header>

      <Modal.Body>
      <div className="form-grid">
      <div className="form-group">
      <label htmlFor="title">Name</label>
      <input
      type="text"
      id="title"
      value={produit.title}
      onChange={(e) => setProduit({...produit,title:e.target.value})}
      className="form-input"
      placeholder="Entrez nom article"
      />
      </div>
      <div className="form-group">
      <label htmlFor="description">Désignation</label>
      <input
      type="text"
      id="description"
      value={produit.description}
      onChange={(e) => setProduit({...produit,description:e.target.value})}
      className="form-input"
      placeholder="Entrez la désignation article"
      />
      </div>
      <div className="form-group">
      <label htmlFor="prix">Marque</label>
      <select
      id="marque"
      className="form-control"
      value={produit.marqueID._id}
      onChange={(e) => setProduit({...produit,marqueID:e.target.value})}
      >
      {marques.map((marq,index)=>
      <option key={index} value={marq._id}>{marq.nommarque}</option>
      )}
      </select>
      </div>
      
      <div className="form-group">
      <label htmlFor="quantite">Stock</label>
      <input
      type="number"
      id="stock"
      value={produit.stock}
      onChange={(e) => setProduit({...produit,stock:e.target.value})}
      className="form-input"
      placeholder="Entrez quantité stock"
      />

      </div>
      <div className="form-group">
      <label htmlFor="prix">Prix</label>
      <input
      type="number"
      required
      id="prix"
      value={produit.prix}
      onChange={(e) => setProduit({...produit,prix:e.target.value})}
      className="form-input"
      placeholder="Entrez Quantité stock"
      />
      </div>
      <div className="form-group">
      <label htmlFor="prix">Catégorie</label>
      <select
      id="category"
      className="form-control"
      value={produit.scategorieID._id}
      onChange={(e) => setProduit({...produit,scategorieID:e.target.value})}
      >
      {scategories.map((scat,index)=>
      <option key={index} value={scat._id}>{scat.nomscategorie}</option>
      )}
      </select>
      </div>
      <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
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
      onClick={(e)=>handleUpdate(e)}>Update</button>
      <button type="reset" className="form-reset-button"
      onClick={()=>handleClose()}>Annuler</button>
      </Modal.Footer>
      </form>
      </Modal>
</div>
  )
}

export default Editproduit
