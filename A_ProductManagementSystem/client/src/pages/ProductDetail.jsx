import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import './ProductDetail.css';
import { useNavigate } from 'react-router-dom';

function ProductDetail() {
  const product_id = useParams().id;
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/getProduct/" + product_id)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setProduct(data);
    });
  }, []);

  const editProduct = () => {
    navigate('/products/edit/' + product_id);
  }

  return (
    <>
      <div className='ProductDetailTitle'>Products Detail</div>
      <div className='ProductDetailContainer'>
        <div >
          <img src={product.link} className='ProductDetailImage'/>
        </div>
        <div className='ProductDetails'>
          <div className='ProductDetailCategory'>{product.category}</div>
          <div className='ProductDetailName'>{product.name}</div>
          <div>
            <span className='ProductDetailPrice'>${product.price}</span> 
            <span className='ProductDetailQuantity'>{product.quantity > 0 ? product.quantity + ` items left` : `Out of stock`}</span>
          </div>
          <div className='ProductDetailDescription'>{product.description}</div>
          <button className='AddCartButton'>Add to cart</button>
          <button className='EditButton' onClick={editProduct}>Edit</button>
        </div>
      </div>
    </>
  )
}

export default ProductDetail;