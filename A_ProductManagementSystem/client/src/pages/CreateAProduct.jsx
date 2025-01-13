import { useState } from 'react';
import './CreateAProduct.css';
import ProductImagePreview from '../components/products/ProductImagePreview';
import { useNavigate } from 'react-router-dom';

function CreateAProduct() {
  const [inputs, setInputs] = useState({});
  const [showImage, setShowImage] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/createProduct", {
      method: 'POST',
      body: JSON.stringify(inputs),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json())
    .then(data => {
      navigate("/products");
    });
  }

  const handleImageUpload = () => {
    setShowImage(prev => !prev);
  }

  return (
    <div className='createProductForm'>
      <div className='createProductFormTitle'>Create Product</div>
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
          <button className='createProductFormButton' onClick={handleImageUpload}>Upload</button>
        </div>
        <ProductImagePreview link={inputs.link} showImage={showImage} />
        <button type='submit' className='createProductFormButton'>Add Product</button>
      </form>
    </div>
  )
}

export default CreateAProduct;