import React, { Component } from 'react';
import Product from './product.js'

class Products extends Component {
    render() {
        return (
            <ul className="products">
                {
                    this.props.data.map((productData) => {
                        return <Product {...productData} />
                    })  
                }
            </ul>
        )
    }
}

export default Products;