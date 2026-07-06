import React from 'react';
import MainLayout from '@/components/MainLayout';
import { client } from '@/sanity/lib/client';

export const revalidate = 60; // Regenerate page data every 60 seconds (Incremental Static Regeneration)

// 🌟 Fetch Above-the-fold Hero Configuration directly on the Server
async function getHeroData() {
  try {
    const query = `*[_type == "hero"][0]{
      badge,
      title,
      titleAccent,
      subtitle,
      backgroundImage,
      primaryButtonText,
      secondaryButtonText,
      philosophyBadge,
      philosophyQuote,
      philosophySubquote,
      philosophyBody
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Error loading server hero payload:", error);
    return null;
  }
}

// 🌟 Fetch initial services to render the disciplines section immediately
async function getInitialServices() {
  try {
    const query = `*[_type == "service"] | order(order asc)[0...3]{
      _id,
      title,
      description,
      iconName,
      coverImage,
      order
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Error loading server disciplines payload:", error);
    return [];
  }
}

export default async function Page() {
  // Parallel fetching on the edge/server for ultimate hydration performance
  const [heroData, services] = await Promise.all([
    getHeroData(),
    getInitialServices(),
  ]);

  return (
    <MainLayout 
      initialHeroData={heroData} 
      initialServices={services} 
    />
  );
}
