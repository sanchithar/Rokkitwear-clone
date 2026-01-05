# School Landing Page - Component Documentation

## Overview
Complete implementation of the RokkitWear school landing page with all functional requirements.

## Components Created

### 1. Header Component
**Location:** `src/components/Header/`
- Logo (RokkitWear) with link to home
- Search bar with search icon
- Cart icon with badge showing item count
- Navigation links (Home, Schools)
- Fully responsive design

### 2. Hero Section Component
**Location:** `src/components/HeroSection/`
- School name display
- School location display
- Background banner image support
- Gradient overlay for better text readability

### 3. Product Card Component
**Location:** `src/components/ProductCard/`
- Product image
- Product name
- Product price
- Category badge
- "Customize" button
- Hover animations

### 4. Product Grid Component
**Location:** `src/components/ProductGrid/`
- Responsive grid layout (4 columns on desktop, 2 on tablet, 1 on mobile)
- Displays product cards
- Uses MUI Grid system

### 5. Product Filters Component
**Location:** `src/components/ProductFilters/`
- Category filter with toggle buttons (All, Men, Women, Kids, Accessories)
- Sort dropdown (Popularity, Price: Low to High, Price: High to Low)
- Fully responsive

### 6. School Landing Page
**Location:** `src/pages/SchoolLandingPage/`
- Combines all components
- Manages filtering and sorting state
- Provides mock product data
- Implements filter and sort logic

## Features Implemented

✅ Header with logo, search, cart, and navigation
✅ Hero section with school name and location
✅ Product grid displaying cards
✅ Product cards with image, name, price, and customize button
✅ Category filters (Men, Women, Kids, Accessories)
✅ Sort by price and popularity
✅ Responsive design for all screen sizes
✅ SCSS styling with BEM methodology
✅ TypeScript type safety

## Usage

The landing page is now set as the default route. To view:

```bash
npm start
```

Navigate to `http://localhost:4200`

## Mock Data

Currently uses placeholder images and mock product data. Replace with API calls using axios and react-query when backend is ready.

## Next Steps

1. Connect to backend API for product data
2. Implement search functionality
3. Add cart functionality
4. Create product customization page
5. Add product detail page
6. Implement authentication
