import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

test('renders the LearningApp header', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const headerElement = screen.getByText(/LearningApp/i);
  expect(headerElement).toBeInTheDocument();
});