'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

export default function Home() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);

  const parseIngredients = (input) => {
    // Split by comma first, then by spaces
    return input
      .split(',')
      .flatMap(part => part.trim().split(/\s+/))
      .filter(ingredient => ingredient.length > 0)
      .join(',');
  };

  const handleFindRecipes = async () => {
    const trimmedIngredients = ingredients.trim();

    if (!trimmedIngredients) {
      alert('Please enter some ingredients');
      return;
    }

    // Parse ingredients to handle both comma and space separation
    const parsedIngredients = parseIngredients(trimmedIngredients);

    setLoading(true);
    setError(null);
    setShowResults(false);

    try {
      // Call our Next.js API route
      const response = await fetch(
        `/api/recipes?ingredients=${encodeURIComponent(parsedIngredients)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch recipes');
      }

      const data = await response.json();
      setRecipes(data);
      setShowResults(true);

      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }, 100);

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setRecipes([]);
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleFindRecipes();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-[680px] animate-[fadeInUp_0.8s_ease-out]">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-3 tracking-tight" style={{ fontFamily: 'var(--font-libre-baskerville)' }}>
            What to Cook
          </h1>
          <p className="text-base tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
            Discover recipes from what you have
          </p>
        </header>

        {/* Input Card */}
        <div
          className="bg-white rounded-2xl p-10 sm:p-12 mb-8 border"
          style={{
            boxShadow: 'var(--shadow-lg)',
            borderColor: 'var(--color-border)'
          }}
        >
          <div className="mb-8">
            <label
              htmlFor="ingredientInput"
              className="block font-medium text-sm uppercase tracking-widest mb-4"
            >
              Your Ingredients
            </label>
            <div className="relative">
              <textarea
                id="ingredientInput"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter ingredients separated by commas or spaces&#10;e.g., chicken tomatoes basil OR chicken, tomatoes, basil"
                className="w-full px-5 py-4 text-base border-2 rounded-xl min-h-[120px] resize-y transition-all duration-300 focus:outline-none"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-accent)';
                  e.target.style.backgroundColor = 'var(--color-surface)';
                  e.target.style.boxShadow = '0 0 0 4px rgba(217, 118, 66, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--color-border)';
                  e.target.style.backgroundColor = 'var(--color-bg)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <p className="text-sm italic mt-3" style={{ color: 'var(--color-text-muted)' }}>
              List the ingredients you have on hand, and we&apos;ll find matching recipes
            </p>
          </div>

          <div className="mt-8">
            <button
              onClick={handleFindRecipes}
              disabled={loading}
              className="w-full px-8 py-5 text-base font-semibold uppercase cursor-pointer tracking-widest text-white rounded-xl transition-all duration-300 relative overflow-hidden disabled:cursor-not-allowed"
              style={{
                backgroundColor: loading ? 'var(--color-text-muted)' : 'var(--color-accent)',
                boxShadow: loading ? 'none' : 'var(--shadow-md)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = 'var(--color-accent-hover)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = 'var(--shadow-lg)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = 'var(--color-accent)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'var(--shadow-md)';
                }
              }}
              onMouseDown={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-white"
                    style={{ animation: 'loadingDot 1.4s ease-in-out infinite' }}
                  />
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-white"
                    style={{ animation: 'loadingDot 1.4s ease-in-out infinite 0.2s' }}
                  />
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-white"
                    style={{ animation: 'loadingDot 1.4s ease-in-out infinite 0.4s' }}
                  />
                </div>
              ) : (
                <span>Find Recipes</span>
              )}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {showResults && error && (
          <div
            className="bg-white rounded-2xl p-10 sm:p-12 border mb-8 animate-[fadeIn_0.6s_ease-out]"
            style={{
              boxShadow: 'var(--shadow-lg)',
              borderColor: 'var(--color-border)'
            }}
          >
            <div className="text-center py-8">
              <div className="text-5xl mb-4">⚠️</div>
              <h3
                className="font-serif text-2xl mb-3 text-red-600"
                style={{ fontFamily: 'var(--font-libre-baskerville)' }}
              >
                Error
              </h3>
              <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Results Card */}
        {showResults && !error && (
          <div
            ref={resultsRef}
            className="bg-white rounded-2xl p-10 sm:p-12 border animate-[fadeIn_0.6s_ease-out]"
            style={{
              boxShadow: 'var(--shadow-lg)',
              borderColor: 'var(--color-border)'
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b-2" style={{ borderColor: 'var(--color-border)' }}>
              <h2 className="font-serif text-3xl font-bold mb-2 sm:mb-0" style={{ fontFamily: 'var(--font-libre-baskerville)' }}>
                Recipes
              </h2>
              <span className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
                {recipes.length} found
              </span>
            </div>

            {recipes.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 opacity-30">🍽️</div>
                <h3 className="font-serif text-2xl mb-3" style={{ fontFamily: 'var(--font-libre-baskerville)' }}>
                  No recipes found
                </h3>
                <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
                  Try different ingredients or fewer items
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-4 sm:gap-6 p-6 rounded-xl border cursor-pointer transition-all duration-300"
                    style={{
                      backgroundColor: 'var(--color-bg)',
                      borderColor: 'var(--color-border)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-accent)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <Image
                      src={recipe.image}
                      alt={recipe.name}
                      width={400}
                      height={400}
                      className="w-full sm:w-[180px] h-48 sm:h-[180px] object-cover rounded-lg"
                      style={{ backgroundColor: 'var(--color-border)' }}
                    />
                    <div className="flex flex-col">
                      <h3 className="text-xl font-semibold mb-4 leading-tight">
                        {recipe.name}
                      </h3>
                      <div className="flex flex-col gap-3">
                        {recipe.usedIngredients.length > 0 && (
                          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:items-start">
                            <span className="text-xs font-semibold uppercase tracking-wider min-w-[80px] pt-1.5">
                              Used
                            </span>
                            <div className="flex flex-wrap gap-1.5 flex-1">
                              {recipe.usedIngredients.map((ing, idx) => (
                                <span
                                  key={idx}
                                  className="inline-block px-3 py-1.5 text-sm font-medium rounded-md border"
                                  style={{
                                    backgroundColor: 'rgba(76, 175, 80, 0.12)',
                                    color: '#2e7d32',
                                    borderColor: 'rgba(76, 175, 80, 0.3)'
                                  }}
                                >
                                  {ing}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {recipe.missedIngredients.length > 0 && (
                          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:items-start">
                            <span className="text-xs font-semibold uppercase tracking-wider min-w-[80px] pt-1.5">
                              Missed
                            </span>
                            <div className="flex flex-wrap gap-1.5 flex-1">
                              {recipe.missedIngredients.map((ing, idx) => (
                                <span
                                  key={idx}
                                  className="inline-block px-3 py-1.5 text-sm font-medium rounded-md border"
                                  style={{
                                    backgroundColor: 'rgba(217, 118, 66, 0.12)',
                                    color: '#c46535',
                                    borderColor: 'rgba(217, 118, 66, 0.3)'
                                  }}
                                >
                                  {ing}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {recipe.unusedIngredients.length > 0 && (
                          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:items-start">
                            <span className="text-xs font-semibold uppercase tracking-wider min-w-[80px] pt-1.5">
                              Unused
                            </span>
                            <div className="flex flex-wrap gap-1.5 flex-1">
                              {recipe.unusedIngredients.map((ing, idx) => (
                                <span
                                  key={idx}
                                  className="inline-block px-3 py-1.5 text-sm font-medium rounded-md border"
                                  style={{
                                    backgroundColor: 'rgba(107, 107, 107, 0.08)',
                                    color: 'var(--color-text-muted)',
                                    borderColor: 'var(--color-border)'
                                  }}
                                >
                                  {ing}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
