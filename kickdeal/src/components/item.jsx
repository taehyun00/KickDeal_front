import { Link } from 'react-router-dom';
import '../pagescss/item.css';


const Item = ({item})=> {

    const price = (P) => {
        return P.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
    }

    return(
        <div className='items'>

            <Link to={`/product/${item.id}`}state={{ product: item }}>
            <div className='items_back'>

                <img src={item.imageUrl} className='item_img'></img>
                
                
            </div>
            </Link>
            <div className='item_des'>
            
            <span className='item_back_name'>{item.name}</span>
            <span className='item_back_price'> {price(item.price)}원 </span>

            </div>
            
            
        </div>
    )
}


export default Item;