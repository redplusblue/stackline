import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '../store'
import { setProducts, setCurrentProduct, Product } from '../store/productSlice'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'
import "../styles/main.css"

const App: React.FC = () => {
    const jsonLink: string = "https://raw.githubusercontent.com/redplusblue/stackline/master/src/data/stackline_data.json"
    let products: Product[] = []

    // Mock an API call to get the data, runs on mount only
    useEffect(() => {
        fetch(jsonLink)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                // Set Products
                return response.json()
            }
            )
            .then(data => {
                products = data
                store.dispatch(setProducts(products))
                store.dispatch(setCurrentProduct(products[0]))
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error)
            }
            )
    }, [])

    return (
        <Provider store={store}>
            <Navbar />
            <div className='body-container'>
                <Sidebar />
                <Dashboard />
            </div>
        </Provider>
    )
}

export default App