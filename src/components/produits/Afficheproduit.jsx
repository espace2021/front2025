import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box } from '@mui/material';
import { Button } from 'react-bootstrap';
import Editproduit from './Editproduit';

const Afficheproduit = ({produits,handleDeleteProduct,handleUpdateProduct}) => {

  const[show,setShowe]=useState(false)
  const[produit,setProduit]=useState({})
  const handleShow=()=>{ setShowe(true)}
  const handleClose=()=>{setShowe(false)}
  const handleEdit=(pro)=>{
  setProduit(pro)
  console.log(pro)
  handleShow()

  }
const enrichedProduits = useMemo(()=>
produits.map(pro =>({
  ...pro,
  nommarque: pro.marqueID?.nommarque
})),
[produits]
)
  const columns = useMemo(()=> [
    {
        accessorKey: 'imagepro', //access nested data with dot notation
        header: 'Image',
        Cell: ({ cell}) => (
        <Box
        sx={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        }}
        >
        <img
        alt="" height={50}
        src={cell.getValue()} loading="lazy"
        style={{ borderRadius: '20%' }}
        />
        </Box>),
        },
      {
        accessorKey: 'title', //access nested data with dot notation
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'description',
        header: 'Désignation',
        size: 150,
      },
      {
        accessorKey: 'marqueID.nommarque', // Ajout de la colonne
        header: 'Marque',
        size: 150,
      },
      {
        accessorKey: 'prix', //normal accessorKey
        header: 'Prix',
        size: 50,
      },
      {
        accessorKey: 'scategorieID.nomscategorie', //normal accessorKey
        header: 'Catégorie',
        size: 50,
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
        size: 100,
        },
        {
          accessorKey: '_id', header: 'actions', size: 100,
          Cell: ({ cell, row }) => (
          <div >
          <Button onClick={()=>{handleEdit(cell.row.original)}}
          variant="warning" size="md"

          >
          <i className="fa-solid fa-pen-to-square" style={{color: "#ffffff",}}></i>
          </Button>
          &nbsp;
          <Button onClick={(e) => {
          handleDeleteProduct(cell.row.original._id);
          }}
          variant="danger" size="md"
          >
          <i className="fa fa-trash" />
          </Button>
          </div>
          ),
          },
      
    ],
    [produits],
  );

  const table = useMaterialReactTable({
    columns,
    data:enrichedProduits, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });
  return (
    <div>
      {show && <Editproduit
          show={show}
          handleClose={handleClose}
          pro={produit}
          handleUpdateProduct={handleUpdateProduct}
          /> }

          <MaterialReactTable table={table} />; 
    </div>
  )
}

export default Afficheproduit
