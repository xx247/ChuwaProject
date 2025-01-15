import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import CreateAProduct from '../components/products/CreateAProduct';

function EditProduct() {
    const product_id = useParams().id;
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch("http://localhost:3001/getProduct/" + product_id)
        .then(res => res.json())
        .then(data => {
          setProduct(data);
        });
    }, []);

    return (
        <CreateAProduct input={product} />        
    )
}

export default EditProduct;