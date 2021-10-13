import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders Movie Recommender text', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/Movie Recommender/i)
  
  expect(linkElement).toBeInTheDocument()
});
