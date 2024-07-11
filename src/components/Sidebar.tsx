import React from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { Product, setCurrentProduct } from '../store/productSlice';
import "../styles/Sidebar.css"

const Sidebar: React.FC = () => {
      const dispatch = useAppDispatch();
      const { products, currentProduct } = useAppSelector((state) => state.product);

      const handleClick = (product: Product) => {
            dispatch(setCurrentProduct(product));
      };

      return (
            <div className='sidebar-container'>
                  {products.map((product: Product) => (
                        <div
                              key={product.id}
                              className={`sidebar-element ${currentProduct?.id === product.id ? 'active' : ''}`}
                              onClick={() => handleClick(product)}
                        >
                              <img src={product.image} alt={product.title} />
                              <div className='title'>{product.title}</div>
                              <div className='subtitle'>{product.subtitle}</div>
                              <hr />
                              <div className='tags'>
                                    {product.tags.map((tag, index) => (
                                          <span key={index} className='tag'>{tag}</span>
                                    ))}
                              </div>
                              <hr />
                        </div>
                  ))}
            </div>
      );
}

export default Sidebar;