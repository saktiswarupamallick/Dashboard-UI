import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../../contexts/ThemeContext';
import MetricCard from '../MetricCard';
import type { MetricCard as MetricCardType } from '../../types';

const mockMetric: MetricCardType = {
  title: 'Test Metric',
  value: '1,000',
  change: 10.5,
  changeType: 'increase',
  icon: 'test-icon'
};

describe('App Integration Tests', () => {
  test('theme context works with components', () => {
    render(
      <ThemeProvider>
        <MetricCard metric={mockMetric} />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    expect(screen.getByText('1,000')).toBeInTheDocument();
  });

  test('components render without crashing', () => {
    render(
      <ThemeProvider>
        <MetricCard metric={mockMetric} variant="light-blue" />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
  });
});
