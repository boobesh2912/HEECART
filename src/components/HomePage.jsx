import React from 'react';
import Hero from './Hero';
import Features from './Features';
import Catalog from './Catalog';
import { HowToOrder, FAQ } from './InfoSections';
import { BulkSavings, Bestsellers, CategoryTiles, FinalCTA, InstagramBand, OfferStrip, Occasions, WhyHeecart } from './HomeSections';

export default function HomePage({ store, search, settings, onAddToCart }) {
  const { products, categories } = store;

  return (
    <>
      <Hero products={products} settings={settings} />
      <OfferStrip settings={settings} />
      <Features />
      <CategoryTiles products={products} categories={categories} />
      <Bestsellers products={products} settings={settings} onAddToCart={onAddToCart} />
      <WhyHeecart settings={settings} />
      <Catalog products={products} categories={categories} search={search} settings={settings} onAddToCart={onAddToCart} />
      <BulkSavings products={products} />
      <Occasions categories={categories} />
      <HowToOrder settings={settings} />
      <InstagramBand settings={settings} />
      <FAQ settings={settings} />
      <FinalCTA settings={settings} />
    </>
  );
}
