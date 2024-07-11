import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { setProducts, setCurrentProduct, Product } from './store/productSlice'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import "./styles/main.css"
import jsonData from "./data/stackline_data.json"

// Initialize the store 
const products = jsonData.map((element: any): Product => ({
  id: element.id,
  image: element.image,
  title: element.title,
  subtitle: element.subtitle,
  brand: element.brand,
  reviews: element.reviews,
  details: element.details,
  tags: element.tags,
  sales: element.sales,
}))

store.dispatch(setProducts(products))

// Set the first product as the current product (if exists)
if (products.length > 0) {
  store.dispatch(setCurrentProduct(products[0]))
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Navbar />
      <div className='body-container'>
        <Sidebar />
        <Dashboard />
      </div>
    </Provider>
  </React.StrictMode>,
)