import React, { useState } from 'react';

const Options = () => {
    const [products, setProducts] = useState([{ name: '', quantity: '', stock: '', price: '', weight: '' }]);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newProducts = [...products];
        newProducts[index][name] = value;
        setProducts(newProducts);
    };

    const addProduct = () => {
        setProducts([...products, { name: '', quantity: '', stock: '', price: '', weight: '' }]);
    };

    const removeProduct = (index) => {
        const newProducts = products.filter((_, i) => i !== index);
        setProducts(newProducts);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(products);
        // Handle form submission (e.g., send to an API)
    };

    return (
        <form onSubmit={handleSubmit}>
            {products.map((product, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={product.name}
                        onChange={(event) => handleInputChange(index, event)}
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={product.quantity}
                        onChange={(event) => handleInputChange(index, event)}
                    />
                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={product.stock}
                        onChange={(event) => handleInputChange(index, event)}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={product.price}
                        onChange={(event) => handleInputChange(index, event)}
                    />
                    <input
                        type="number"
                        name="weight"
                        placeholder="Weight"
                        value={product.weight}
                        onChange={(event) => handleInputChange(index, event)}
                    />
                    <button type="button" onClick={() => removeProduct(index)}>Remove</button>
                </div>
            ))}
            <button type="button" onClick={addProduct}>Add Product</button>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Options;
