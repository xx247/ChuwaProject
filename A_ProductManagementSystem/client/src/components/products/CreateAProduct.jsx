import { useEffect, useState } from 'react';
import './CreateAProduct.css';
import ProductImagePreview from './ProductImagePreview';
import { createProduct, editProduct } from '../../services/productService';
import { useNavigate } from 'react-router-dom';

function CreateAProduct({ input }) {
  const [inputs, setInputs] = useState(input);
  const [showImage, setShowImage] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input.category) {
      await editProduct(inputs, input._id);
    } else {
      await createProduct(inputs);
    }
    navigate('/products');
  }

  const handleImageUpload = (event) => {
    event.preventDefault();
    setShowImage(prev => !prev);
  }

  useEffect(() => {
    Object.keys(input).map(function(keyName) {
      setInputs(inputs => ({...inputs, [keyName]: input[keyName]}));
    })
  }, [input]);

  return (
    <div className='createProductForm'>
      <div className='createProductFormTitle'>{input.category ? `Edit ` : `Create ` } Product</div>
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
        <button type='submit' className='createProductFormButton'>{input.category ? `Edit ` : `Add ` } Product</button>
      </form>
    </div>
  )
}

export default CreateAProduct;