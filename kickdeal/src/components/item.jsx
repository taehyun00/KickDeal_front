import '../pagescss/item.css';


const Item = ({item})=> {

    const  P = item.price;
    const price = (P) => {
        return P.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
    }

    return(
        <div className='items'>
            <div className='items_back'>
               
                <span className='item_back_name'>{item.name}</span>
                <span className='item_back_price'> {price(item.price)}원 </span>
            </div>
        </div>
    )
}


export default Item;