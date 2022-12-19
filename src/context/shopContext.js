import { useState } from 'react'
import React, { createContext,Component} from 'react'
import Client from 'shopify-buy';

const ShopContext = createContext()
console.log(process.env.REACT_APP_SHOPIFY_DOMAIN)
const client = Client.buildClient({
  domain :process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API
})

class ShopProvider extends Component {

  state={
    product:{},
    products:[],
    checkout:{},
    isCartOpen:false,
    isMenuOpen:false,
  }

  componentDidMount() {
    if(localStorage.checkout_id){
      this.fetchCheckout(localStorage.checkout_id)
    }else{
      this.createCheckout()
    }
    
  }

 createCheckout = async () => {
    const checkout = await client.checkout.create()
    localStorage.setItem("checkout_id",checkout.id)
    this.setState({checkout:checkout})
  }

  fetchCheckout = async (checkout_id) => {
    client.checkout.fetch(checkout_id)
      .then((checkout) => {
        this.setState({checkout:checkout})
      })
  }

  addItemtoCheckout = async () => {

  }

  removeLineItem = async (LineItemsToRemove) => {

  }

  fetchAllProducts = async () => {
    // Fetch all products in your shop
    const products = await client.product.fetchAll();
    this.setState({products:products})
  }

  fetchProductWithHandle = async (handle) => {
    const product = await client.product.fetchByHandle(handle)
    this.setState({product:product})
  }

  closeCart = async () => {

  }
 
  openCart = async () => {

  }

  closeMenu = async () => {

  }

  openMenu = async () => {

  }

  render() {
    console.log(this.state.checkout)
    return (
      <ShopContext.Provider 
      value={{...this.state,
        fetchAllProducts:this.fetchAllProducts,
        fetchProductWithHandle:this.fetchProductWithHandle,
        addItemtoCheckout:this.addItemtoCheckout,
        removeLineItem:this.removeLineItem,
        closeCart: this.closeCart,
        openCart: this.openCart,
        closeMenu: this.closeMenu,
        openMenu: this.openMenu
      }}>
        {this.props.children}
      </ShopContext.Provider>
    )
  }
  
}

const ShopConsumer = ShopContext.Consumer
export {ShopConsumer,ShopContext}

export default ShopProvider
