# What to Cook v2

> Discover recipes based on the ingredients you have on hand

A modern recipe discovery web application built with Next.js 16 and React 19, featuring an editorial-inspired design and integration with the Spoonacular API.

## About

What to Cook v2 helps you find recipes based on ingredients you already have. Simply enter your available ingredients, and the application will search through thousands of recipes to find matches, showing you exactly which ingredients you have, which you're missing, and which won't be used.

### Key Features

- **Ingredient-Based Search**: Find recipes by entering comma or space-separated ingredients
- **Color-Coded Ingredient Tags**: Visual feedback showing used (green), missed (orange), and unused (gray) ingredients
- **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop
- **Editorial Aesthetic**: Magazine-style design with warm, earthy tones and sophisticated typography
- **Modern Architecture**: Built with Next.js 16 App Router and React 19
- **Smooth Animations**: Custom animations and hover effects throughout the interface

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) 16.1.1 (App Router)
- **UI Library**: [React](https://react.dev) 19.2.3
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v4
- **Typography**: Google Fonts (Libre Baskerville + DM Sans)
- **API**: [Spoonacular API](https://spoonacular.com/food-api)
- **Linting**: ESLint 9 with Next.js preset

## Prerequisites

Before running this project, ensure you have:

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Spoonacular API Key** - [Sign up for free](https://spoonacular.com/food-api/console#Dashboard)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/j0hnr0/What-to-cook-v2.git
cd what-to-cook-v2
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
SPOONCULAR_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env` file in the project root with the following variable:

| Variable | Description | Required |
|----------|-------------|----------|
| `SPOONCULAR_API_KEY` | Your Spoonacular API key | Yes |

**Example:**
```env
SPOONCULAR_API_KEY=abc123def456ghi789jkl
```

To obtain an API key:
1. Visit [Spoonacular API Console](https://spoonacular.com/food-api/console#Dashboard)
2. Create a free account
3. Copy your API key from the dashboard
4. Paste it into your `.env` file

## Usage

1. **Enter Ingredients**: Type your available ingredients into the text area
   - Use commas: `chicken, tomato, garlic, basil`
   - Use spaces: `chicken tomato garlic basil`
   - Mix both formats as needed

2. **Find Recipes**: Click the "Find Recipes" button or press Enter

3. **View Results**: Browse recipe cards showing:
   - Recipe name and image
   - **Green tags**: Ingredients you provided that the recipe uses
   - **Orange tags**: Ingredients the recipe needs that you don't have
   - **Gray tags**: Ingredients you provided that the recipe doesn't use

## Project Structure

```
what-to-cook-v2/
├── app/
│   ├── (home)/
│   │   ├── page.js                  # Main recipe finder component
│   │   └── api/
│   │       └── recipes/
│   │           └── route.js         # Spoonacular API integration
│   ├── layout.js                    # Root layout with font configuration
│   └── globals.css                  # Design system (colors, animations)
├── public/                          # Static assets
├── .env                             # Environment variables (not in repo)
├── package.json                     # Dependencies and scripts
└── README.md                        # This file
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at http://localhost:3000 |
| `npm run build` | Build optimized production bundle |
| `npm start` | Start production server (requires build first) |
| `npm run lint` | Run ESLint to check code quality |

## Design System

### Color Palette

- **Background**: `#faf8f5` (cream)
- **Surface**: `#ffffff` (white)
- **Primary Text**: `#2d2d2d` (dark gray)
- **Muted Text**: `#6b6b6b` (medium gray)
- **Accent**: `#d97642` (terracotta)
- **Accent Hover**: `#c46535` (darker terracotta)
- **Border**: `#e8e4df` (light gray)

### Typography

- **Headings**: Libre Baskerville (serif, weights: 400, 700)
- **Body**: DM Sans (sans-serif, weights: 400, 500, 600, 700)

### Animations

- `fadeInUp`: 0.8s ease-out (page load)
- `fadeIn`: 0.6s ease-out (results display)
- `loadingDot`: 1.4s ease-in-out infinite (loading state)

## API Integration

### Internal API Endpoint

`GET /api/recipes?ingredients=chicken,tomato,garlic`

**Query Parameters:**
- `ingredients` (required): Comma-separated list of ingredients

**Response Format:**
```json
[
  {
    "id": 716429,
    "name": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
    "image": "https://img.spoonacular.com/recipes/716429-312x231.jpg",
    "usedIngredients": [...],
    "missedIngredients": [...],
    "unusedIngredients": [...]
  }
]
```

### External API

This application uses the [Spoonacular API](https://spoonacular.com/food-api) for recipe data. Specifically, the `findByIngredients` endpoint:

- **Endpoint**: `https://api.spoonacular.com/recipes/findByIngredients`
- **Rate Limits**: Free tier includes 150 requests/day
- **Documentation**: [API Docs](https://spoonacular.com/food-api/docs)

## License

All Rights Reserved

Copyright (c) 2026 John Rovan

This project is not open source. All rights reserved.

## Author

**John Rovan**
- Portfolio: (coming soon) 

## Acknowledgments

- [Spoonacular API](https://spoonacular.com/food-api) for recipe data
- [Next.js](https://nextjs.org) team for the excellent framework
- [Vercel](https://vercel.com) for hosting and deployment platform

---

**Live Demo**: https://what-to-cook-v2.vercel.app/

Built with Next.js 16 | React 19 | Tailwind CSS v4
