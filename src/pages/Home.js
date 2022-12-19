import React,{useEffect,useContext} from 'react'

import { ShopContext } from '../context/shopContext'

export default function Home() {

  const {fetchAllProducts,products} = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts()
    
  },[fetchAllProducts])


  console.log(products)

  if(!products) return <div>Loading...</div>
   
  return (
    <div className='home-page'>
          <header>
                <h1>Home Page</h1>
            </header>
            <article>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora facere, veritatis ex reprehenderit, minus consequatur quam dignissimos minima at aspernatur dolores molestiae dolorum odio aut magni esse, molestias voluptate deserunt.
            </article>
    </div>
  )
}
