import React, { useState } from 'react';
import { emitData } from '../services/EventBus';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

const sampleProducts: Product[] = [
  { id: 1, name: 'Laptop Pro', price: 1299, category: 'Electronics', inStock: true },
  { id: 2, name: 'Wireless Mouse', price: 29, category: 'Accessories', inStock: true },
  { id: 3, name: 'Mechanical Keyboard', price: 89, category: 'Accessories', inStock: false },
  { id: 4, name: '4K Monitor', price: 499, category: 'Electronics', inStock: true },
  { id: 5, name: 'USB-C Hub', price: 45, category: 'Accessories', inStock: true },
  { id: 6, name: 'Webcam HD', price: 79, category: 'Electronics', inStock: false },
];

export const ProductList: React.FC = () => {
  const [products] = useState<Product[]>(sampleProducts);
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');

  const filteredProducts = products
    .filter(p => filter === 'all' || p.category === filter)
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return a.price - b.price;
    });

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Product Catalog</h2>
      
      <div style={styles.controls}>
        <div style={styles.controlGroup}>
          <label style={styles.label}>Filter by Category:</label>
          <select 
            style={styles.select}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.controlGroup}>
          <label style={styles.label}>Sort by:</label>
          <select 
            style={styles.select}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'price')}
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      <div style={styles.grid}>
        {filteredProducts.map(product => (
          <div key={product.id} style={styles.card} onClick={() => emitData({ fromApp: 'reactMfeModule', channel: 'product:selected', payload: product })}>
            <h3 style={styles.productName}>{product.name}</h3>
            <p style={styles.category}>{product.category}</p>
            <p style={styles.price}>${product.price}</p>
            <span style={{
              ...styles.badge,
              backgroundColor: product.inStock ? '#28a745' : '#dc3545'
            }}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  controls: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  controlGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
  },
  select: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e0e0e0',
  },
  productName: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#333',
  },
  category: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px',
  },
  price: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '12px',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    color: 'white',
  },
};

export default ProductList;
