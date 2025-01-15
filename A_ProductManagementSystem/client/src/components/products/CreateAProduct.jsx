import { useEffect } from 'react';
import './CreateAProduct.css';
import ProductImagePreview from './ProductImagePreview';
import { createProduct, editProduct } from '../../services/productService';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { loadProduct, toggleImage, changeProduct } from '../../store/slices/productSlice';

function CreateAProduct({ product_id="" }) {
  const inputs = useSelector((state) => state.product.product);
  const showImage = useSelector((state) => state.product.showProductImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(changeProduct({name: name, value: value}));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (product_id) {
      await editProduct(inputs, product_id);
    } else {
      await createProduct(inputs);
    }
    navigate('/products');
  }

  const handleImageUpload = (event) => {
    event.preventDefault();
    dispatch(toggleImage());
  }

  useEffect(() => {
    dispatch(loadProduct(product_id));
  }, []);

  return (
    <div className='createProductForm'>
      <div className='createProductFormTitle'>{product_id ? `Edit ` : `Create ` } Product</div>
      <form onSubmit={handleSubmit}>
        <div className='createProductFormInput'>
          <label>Product name
            <input 
              type="text" 
              name="name" 
              value={inputs.name || ""} 
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='createProductFormInput'>
          <label>Product description
            <textarea 
              type="text" 
              name="description" 
              value={inputs.description || ""} 
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='createProductFormInputs'>
          <label>Category
              <input 
                type="text" 
                name="category" 
                value={inputs.category || ""} 
                onChange={handleChange}
              />
            </label>
          <label>Price
            <input 
              type="number" 
              name="price" 
              value={inputs.price || ""} 
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='createProductFormInputs'>
          <label>In stock quantity
            <input 
              type="number" 
              name="quantity" 
              value={inputs.quantity || ""} 
              onChange={handleChange}
            />
          </label>
          <label>Add Image Link
            <input 
              type="text" 
              name="link" 
              value={inputs.link || ""} 
              onChange={handleChange}
            />
          </label>
          <button className='createProductFormButton' onClick={handleImageUpload}>Preview</button>
        </div>
        <ProductImagePreview link={inputs.link} showImage={showImage} />
        <button type='submit' className='createProductFormButton'>{product_id ? `Edit ` : `Add ` } Product</button>
      </form>
    </div>
  )
}

export default CreateAProduct;