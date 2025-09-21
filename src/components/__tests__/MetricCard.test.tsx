import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../contexts/ThemeContext';
import MetricCard from '../MetricCard';
import type { MetricCard as MetricCardType } from '../../types';

const mockMetric: MetricCardType = {
  title: 'Customers',
  value: '5,231',
  change: 20.1,
  changeType: 'increase',
  icon: 'trending-up'
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('MetricCard', () => {
  test('renders metric card with correct title and value', () => {
    renderWithTheme(<MetricCard metric={mockMetric} />);
    
    expect(screen.getByText('Customers')).toBeInTheDocument();
    expect(screen.getByText('5,231')).toBeInTheDocument();
  });

  test('displays positive change with correct formatting', () => {
    renderWithTheme(<MetricCard metric={mockMetric} />);
    
    expect(screen.getByText('+20.10%')).toBeInTheDocument();
  });

  test('displays negative change correctly', () => {
    const negativeMetric = {
      ...mockMetric,
      change: -5.2,
      changeType: 'decrease' as const
    };
    
    renderWithTheme(<MetricCard metric={negativeMetric} />);
    
    expect(screen.getByText('-5.20%')).toBeInTheDocument();
  });

  test('applies different variants correctly', () => {
    const { rerender } = renderWithTheme(<MetricCard metric={mockMetric} variant="light-blue" />);
    expect(screen.getByText('Customers')).toBeInTheDocument();
    
    rerender(<MetricCard metric={mockMetric} variant="light-purple" />);
    expect(screen.getByText('Customers')).toBeInTheDocument();
  });
});


