import './ProductImagePreview.css';
import { FaRegFileImage } from "react-icons/fa6";

function ProductImagePreview({ link, showImage }) {
    return (
        link && showImage
        ? 
        (<div className='productImagePreview'>
            <img src={link}/>
        </div>) 
        :
        (<div className='productImagePreviewHolder'>
            <FaRegFileImage />
            <div>Image preview!</div>
        </div>)
    );
}

export default ProductImagePreview;