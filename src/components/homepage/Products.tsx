import React from 'react'
import Section from './Section'

export default function Products() {
  return (
    <Section
      id="products"
      image={{
        alt: 'Support complex voice requests',
        url: '/homepage/products.svg',
        maxWidth: '501px',
        left: true
      }}
      header="Make your products more convenient &amp; accessible"
      text={`Complex voice requests can be more efficient than
      navigating multiple visual menus. Allow users to switch
      between voice and touch as their context shifts.
      Faster feedback loop for your business.`}
    />
  )
}
