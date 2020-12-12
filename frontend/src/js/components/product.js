import React from 'react';

function Product(props) {
    return (
        <li className="product">
            <div class="containerList">
                <div>
                    <img src={props.image} alt={props.name} />
                </div>
                <div>
                    <label for={props.name}>{props.name}</label>
                </div>
                <div>
                    <label for={props.name}>{props.price}</label>
                </div>
            </div>
        </li>
    )
}

export default Product;