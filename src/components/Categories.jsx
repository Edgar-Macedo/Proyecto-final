import { useDispatch } from 'react-redux/es/exports';
import ListGroup from 'react-bootstrap/ListGroup';
import { filterCategoryThunk } from '../store/slices/Products.slice';
import { ListGroupItem } from 'react-bootstrap';

function DefaultExample( {categories}) {

    const dispatch = useDispatch()
    
    return (
        <div className='categories-container'>
            <ListGroup>        
                <ListGroupItem variant="dark" >Categories</ListGroupItem>
                {
                    categories.map(category => (
                        <ListGroup.Item 
                            key={category.id} className="category-item"
                            onClick={() => dispatch(filterCategoryThunk(category.id))}
                            >
                            
                            {category.name}
                        </ListGroup.Item>
                    ))    
                }
            </ListGroup>
        </div>
    );
}

export default DefaultExample;