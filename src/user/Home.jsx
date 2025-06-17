import React from 'react'
import SliderImage from '../components/Slider'
import Footer from '../components/Footer'
import ProductList from './ProductList'

const Home = () => {
  return (
    <div>
        <div className='mt-10'>
        <h1 className='text-4xl text-center text-shadow-blue-800 mb-5'>Home Page</h1>
        <SliderImage />
        <ProductList />
        <Footer />
        </div>
    </div>
  )
}

export default Home