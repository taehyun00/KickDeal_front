import '../pagescss/item.css';
import logo from '../images/logo.svg'

const Item = ({item})=> {

    return(
        <div className='items'>
            <div className='back_s'>
                <img src={logo}/>
                <span clas>{item.name}</span>
                <span>{item.price}</span>
            </div>
        </div>
    )
}


export default Item;