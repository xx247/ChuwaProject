import { useParams } from 'react-router';
import { useEffect } from 'react';
import './ProductDetail.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadProduct } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';

function ProductDetail() {
  const product_id = useParams().id;
  const product = useSelector((state) => state.product.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProduct(product_id));
  }, []);

  const editProduct = () => {
    navigate('/products/edit/' + product_id);
  }

  const addItemToCart = () => {
    dispatch(addToCart(product));
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
          <button className='AddCartButton' onClick={addItemToCart}>Add to cart</button>
          <button className='EditButton' onClick={editProduct}>Edit</button>
        </div>
      </div>
    </>
  )
}

export default ProductDetail;