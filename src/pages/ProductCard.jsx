import React, { useEffect, useState } from 'react'
import Card from "../components/card/Card";
import {fetchproduits} from "../service/produitservice";


const ProductCard = () => {
  const [produits, setProduit] = useState([]);
  const fetchProducts = async () => {
    try {
      const res = await fetchproduits();
      setProduit(res.data);

    }catch (error){
      console.log(error);
    }
  };
useEffect(()=>{
  fetchProducts();
},[]);
  return (
    <div className="card-container justify-content-center">
      {produits.map((pro,index)=>
      <Card 
      key={index}
      imagepro={pro.imagepro}
      title={pro.title}
      
      prix={pro.prix}
      />
    )}
      
    </div>
  )
}

export default ProductCard
