I want you to act as a **Senior UI/UX Designer, Senior React Developer, Product Designer, and Full Stack Software Architect**.

Design and develop a **production-ready Local Shop Marketplace** that looks like it was built by a professional software company, **not an AI-generated template**.

The website should be modern, elegant, premium, fast, responsive, SEO-friendly, and scalable.

The purpose of the platform is to allow **local shop owners to showcase their products online**. Customers can browse products, compare them, and directly contact the shop owner via phone, WhatsApp, or by visiting the shop. There is **no checkout or order placement**.

The platform earns revenue by charging **₹1000/month** to shops for Premium Membership, which allows their products to appear on the homepage and in featured sections.

---

# Tech Stack

Frontend

* React.js
* React Router
* Tailwind CSS
* Framer Motion
* React Query
* Firebase Authentication
* Firebase Firestore
* Firebase Storage
* Firebase Cloud Messaging
* Firebase Hosting

Backend

Use Firebase only

* Firestore Database
* Firebase Authentication ( Only for Admin and Shops but optional for user )
* Firebase Storage
* Firebase Functions (if needed)


# Design Requirements

The design must feel like

Apple

Stripe

Linear

Notion

Airbnb

Shopify

The design must NOT resemble

Typical Bootstrap templates

AdminLTE

Material Dashboard

Generic AI-generated layouts

---

# Color Palette

Primary

```text
#4F46E5
```

Secondary

```text
#111827
```

Accent

```text
#F97316
```

Background

```text
#F8FAFC
```

Card Background

```text
White
```

Border

```text
#E5E7EB
```

---

# Typography

Heading

Space Grotesk

Body

Inter

Buttons

Semi Bold

Large whitespace

Rounded corners

Soft shadows

Glass effect only in Hero section

---

# Animation

Framer Motion

Include

Smooth Page Transition

Fade Animation

Hover Animation

Card Lift

Image Zoom

Loading Skeleton

Lazy Loading

Smooth Scroll

Animated Counters

Micro Interactions

---

# Website Structure

## Landing Page

Contains

Modern Navigation

Large Hero Section

Search Products

Search Shops

Browse Categories

Featured Products

Premium Shops

Trending Products

Popular Categories

Today's Offers

Nearby Shops

Latest Arrivals

How It Works

Testimonials

Pricing

FAQ

Newsletter

Footer

Every section must be visually different.

---

# Navigation

Logo

Search

Categories

Shops

Offers

Become Seller

Pricing

About

Contact

Login

Register

---

# Categories

Electronics

Fashion

Furniture

Books

Sports

Automobiles

Jewellery

Shoes

Home Decor

Groceries

Medical

Restaurants

Services

Mobile Phones

Laptops

Each category should have

Hero Banner

Subcategories

Featured Products

Popular Shops

Filters

---

# Search

Search should work on

Products

Shop Name

Brand

Category

City

Area

Autocomplete suggestions

Recent searches

Popular searches

---

# Product Card

Large Image

Product Name

Price

Discount

Shop Name

Location

Availability

Verified Badge

Wishlist

Share

View Details

---

# Product Details

Large Gallery

Zoom Images

Product Description

Specifications

Features

Price

Discount

Seller Information

Shop Rating

Contact Seller

WhatsApp

Call Now

Visit Shop

Location Map

Related Products

Recently Viewed

---

# Shop Profile

Cover Banner

Logo

Gallery

About Shop

Owner Details

Business Hours

Address

Google Maps

Phone

WhatsApp

Email

Products

Offers

Reviews

Followers

Verified Badge

---

# Customer Features

Wishlist

Save Product

Share Product

Compare Products

Follow Shops

Review Shops

Dark Mode

Notifications

Search History

---

# Seller Dashboard

Dashboard

Analytics

Product Views

Contact Clicks

Visitor Count

Followers

Products

Orders (Future)

Add Product

Edit Product

Delete Product

Upload Images

Gallery

Business Hours

Subscription

Profile

Notifications

Reports

---

# Admin Dashboard

Dashboard

Manage Users

Manage Sellers

Manage Products

Manage Categories

Manage Homepage

Manage Reviews

Manage Ads

Manage Premium Shops

Subscription Management

Payment Records

Reports

Site Settings

Notifications

Support Tickets

Analytics

---

# Homepage Management

Admin can

Drag and Drop Homepage Sections

Choose Featured Products

Choose Trending Products

Choose Premium Shops

Manage Hero Banner

Manage Advertisements

Manage Offers

---

# Premium Membership

₹1000 per month

Benefits

Homepage Listing

Featured Badge

Priority Search

Verified Seller

Analytics

Unlimited Products

Priority Support

---

# Firestore Collections

users

shops

products

categories

premiumSubscriptions

reviews

wishlist

notifications

offers

homepageSections

analytics

messages

reports

---

# Firebase Authentication

Email Login

Google Login

Forgot Password

Email Verification

Role Based Authentication

Customer

Seller

Admin

---

# Product Upload

Multiple Images

Image Compression

Firebase Storage

Progress Bar

Drag and Drop Upload

Preview Images

Delete Images

---

# Filters

Price

Brand

Category

Rating

Discount

Availability

Newest

Popular

Verified Sellers

Nearby Shops

---

# Performance

Code Splitting

Lazy Loading

React Memo

Image Optimization

Firestore Pagination

Infinite Scroll

SEO Friendly

Fast Loading

PWA Ready

---

# Mobile Design

Fully Responsive

Tablet Optimized

Desktop Optimized

Bottom Navigation

Mobile Filters

Touch Friendly

Swipe Animations

Sticky Search

---

# UI Components

Reusable Components

Navbar

Footer

Hero

Buttons

Cards

Modal

Drawer

Sidebar

Accordion

Tabs

Carousel

Toast

Loading Skeleton

Pagination

Breadcrumb

Badge

Tooltip

Dropdown

Search Bar

Empty State

Error State

---

# Security

Firebase Security Rules

Protected Routes

Role Based Access

Image Validation

Rate Limiting

Firestore Rules

Secure Storage

Input Validation

---

# Admin Control

Admin should have complete control over

Products

Users

Shops

Homepage

Categories

Advertisements

Premium Membership

Reviews

Offers

Reports

Analytics

Notifications

Everything must be editable without touching code.

---

# Folder Structure

Use a scalable architecture with folders for:

* components
* pages
* layouts
* hooks
* context
* services
* firebase
* utils
* assets
* constants
* routes
* styles

---

# Code Quality

Use:

* Functional Components
* React Hooks
* Clean Architecture
* Reusable Components
* Type-safe patterns where possible
* Error Boundaries
* Loading and Error States
* Consistent naming conventions
* Well-documented code

---

# Final Goal

Build a **production-ready SaaS-style marketplace** for local businesses that is elegant, highly responsive, secure, scalable, and maintainable. Every page should have polished spacing, premium typography, smooth animations, accessibility support, and a consistent design system. The user experience should inspire trust and make the platform feel like a modern, professionally designed product rather than a generic marketplace.
