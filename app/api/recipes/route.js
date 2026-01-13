import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Extract ingredients from query parameters
    const { searchParams } = new URL(request.url);
    const ingredients = searchParams.get('ingredients');

    // Validate input
    if (!ingredients || ingredients.trim() === '') {
      return NextResponse.json(
        { error: 'Ingredients parameter is required' },
        { status: 400 }
      );
    }

    // Get API key from environment
    const apiKey = process.env.SPOONCULAR_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Build Spoonacular API URL manually to preserve commas in ingredients
    // (Frontend already parsed and formatted the ingredients)
    const spoonacularUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&ranking=1&ignorePantry=true&apiKey=${apiKey}`;

    // Call Spoonacular API
    const response = await fetch(spoonacularUrl);

    // Handle API errors
    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key' },
          { status: 500 }
        );
      }
      if (response.status === 402) {
        return NextResponse.json(
          { error: 'API quota exceeded. Please try again later.' },
          { status: 503 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to fetch recipes from Spoonacular' },
        { status: 502 }
      );
    }

    const data = await response.json();

    // Transform Spoonacular format to our format
    const transformedRecipes = data.map(recipe => ({
      id: recipe.id,
      name: recipe.title,
      image: recipe.image,
      usedIngredients: recipe.usedIngredients.map(ing => ing.name),
      missedIngredients: recipe.missedIngredients.map(ing => ing.name),
      unusedIngredients: recipe.unusedIngredients.map(ing => ing.name)
    }));

    return NextResponse.json(transformedRecipes);

  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
