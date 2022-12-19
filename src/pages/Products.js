import React,{useEffect,useState,useContext }from 'react'

import ProductDetails from '../components/ProductDetails'

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import { ShopContext } from '../context/shopContext';






export default function Products() {
    
    const {fetchAllProducts,products} = useContext(ShopContext);

    const [productsAll,setProductsAll] = useState(null)
    const [updatedProducts,setUpdatedProducts] = useState(null)
    const [sliderValue,setSliderValue] = useState(100)
    const [checkedStock, setCheckedStock] = useState(false)
    const [checkedNonStock, setCheckedNonStock] = useState(false)


    useEffect(() => {
        fetchAllProducts()
        setProductsAll(products)
    },[fetchAllProducts])


    const handleChangeSlider = ( event,newValue) => {
        setSliderValue(newValue)
    }

    const handleStockExist = (event) => {
        setCheckedStock(true)
        setCheckedNonStock(false)
        let newProducts  = products.filter(product => product.variants[0].sku >= 0)
        console.log(newProducts.length)
        setUpdatedProducts(newProducts)
    }

    const handleStockNonExist = (event) => {
        setCheckedNonStock(true)
        setCheckedStock(false)
        let newProducts  = products.filter(product => product.variants[0].sku > 0)
        console.log(newProducts.length)
        setUpdatedProducts(newProducts)
    }

    if(products.length === 0){
        return(<div>Loading...</div>)
    }
  return (
    <div className='products-container'>
        <header>
            <h1>Products Page</h1>
            <section>
                <article>
                    <p>Use Setup Menu to change products</p>
                </article>
            </section>
        </header>
        <section className='menu-product'>
        <Box width={300}>
            <Slider  onChange={handleChangeSlider}   defaultValue={products ? products.length: 0} aria-label="Default" valueLabelDisplay="auto" min={0} max={updatedProducts !== null ? updatedProducts.length :  100}/>
        </Box>
        <label>Show values there are in stock, out of the stock last</label>
        <Checkbox onChange={handleStockExist} checked={checkedStock} />
        <label>Show values only in stock </label>
        <Checkbox onChange={handleStockNonExist} checked={checkedNonStock}/>
        </section>
        {sliderValue > 0 && updatedProducts ? <div className='products'>
            {products && products.sort(function(a, b) {
                    return b.variants[0].sku - a.variants[0].sku ;
                    }).slice(0,sliderValue).map((product) => {
                if(checkedStock){
                    if(product.variants[0].sku  >= 0){
                        return(
                            <ProductDetails key={product.id} product={product}></ProductDetails>
                        )
                    }
                }
                if(checkedNonStock){
                    if(product.variants[0].sku  > 0){
                        return(
                            <ProductDetails key={product.id} product={product}></ProductDetails>
                        )
                    }
                } 
            })}
        </div> : sliderValue === 0 ? <p>Change Slider to get products</p>: <p>Select checkbox to get products</p>}
        
        
    </div>
  )
}
