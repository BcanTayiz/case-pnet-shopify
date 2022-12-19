import React from 'react'

export default function ProductDetails({product}) {
  return (
    <div className={`product-details ${product.variants[0].sku  == 0 ? 'outofstock': ''}`} >
        <h3>{product.title}</h3>
        <section>
          <img src={product.variants[0].image.src} alt="" />
        </section>
        <p><strong>Product Details</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod dolore necessitatibus nemo itaque animi ratione, dignissimos voluptate reiciendis vitae fugit nisi. Recusandae dolore necessitatibus nisi quod veniam itaque omnis quia?</p>
        <p><strong>Product Price: </strong>{product.variants[0].price.amount}</p>
        <p><strong>Product Stock Value: </strong> {product.variants[0].sku}</p>
        {product.variants[0].sku == 0 ? <p className='outofstock-product'>Product Out of Stock</p> : ''}
        <p>{product.createdAt}</p>
    </div>
  )
}
