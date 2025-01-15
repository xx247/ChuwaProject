import './ProductImagePreview.css';
import { FaRegFileImage } from "react-icons/fa6";

function ProductImagePreview({ link, showImage }) {
    return (
        link && showImage
        ? 
        (<div>
            <img src={link} className='productImagePreview'/>
        </div>) 
        :
        (<div className='productImagePreviewHolder'>
            <FaRegFileImage />
            <div>Image preview!</div>
        </div>)
    );
}

export default ProductImagePreview;