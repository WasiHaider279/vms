import React, { useState } from 'react';

interface Product {
    id: number;
    name: string;
}

interface Collection {
    id: number;
    name: string;
    products: Product[];
}

interface AddProductsManualProps {
    collection: Collection;
}

const AddProductsManual: React.FC<AddProductsManualProps> = ({ collection }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleSearch = () => {
        // Perform search logic here and update searchResults state
        // based on the search term
    };

    const handleAddToCollection = () => {
        if (selectedProduct) {
            // Add the selected product to the collection's products array
            const updatedCollection = {
                ...collection,
                products: [...collection.products, selectedProduct],
            };
            // Update the collection state with the new product
            // You can use a state management library like Redux or React Context for this
        }
    };

    const handleRemoveFromCollection = (productId: number) => {
        // Remove the product with the given ID from the collection's products array
        const updatedProducts = collection.products.filter(
            (product) => product.id !== productId
        );
        // Update the collection state with the updated products array
        // You can use a state management library like Redux or React Context for this
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {/* Render the search results in a popup */}
            {searchResults.length > 0 && (
                <div>
                    <h2>Search Results</h2>
                    <ul>
                        {searchResults.map((product) => (
                            <li key={product.id}>
                                {product.name}
                                <button onClick={() => setSelectedProduct(product)}>
                                    Add to Collection
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Render the products in the collection */}
            <div>
                <h2>Products in Collection</h2>
                <ul>
                    {collection.products.map((product) => (
                        <li key={product.id}>
                            {product.name}
                            <button onClick={() => handleRemoveFromCollection(product.id)}>
                                Remove from Collection
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddProductsManual;
