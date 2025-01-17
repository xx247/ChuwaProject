import { useParams } from 'react-router';
import CreateAProduct from '../components/products/CreateAProduct';

function EditProduct() {
    const product_id = useParams().id;

    return (
        <CreateAProduct product_id={product_id} />        
    )
}

export default EditProduct;