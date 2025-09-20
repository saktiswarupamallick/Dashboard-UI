export const THEME_COLORS = {
  DASHBOARD_BG_LIGHT: '#ffffff',
  DASHBOARD_BG_DARK: 'oklch(14.1% 0.005 285.823)',
  CARD_BG_LIGHT: '#F7F9FB',
  CARD_BG_DARK: 'rgba(255, 255, 255, 0.05)',
  CHART_PRIMARY: '#A8C5DA',
  CHART_SECONDARY: '#111827',
  CHART_ACCENT: '#86efac',
  CHART_PURPLE: '#c084fc',
  CHART_BLUE: '#93c5fd',
} as const;

export const THEME_CLASSES = {
  DASHBOARD_BG: 'bg-dashboard-bg-light dark:bg-dashboard-bg-dark',
  CARD_BG: 'bg-dashboard-card-light dark:bg-dashboard-card-dark',
  TEXT_PRIMARY: 'text-gray-900 dark:text-gray-100',
  TEXT_SECONDARY: 'text-gray-600 dark:text-gray-400',
  TEXT_MUTED: 'text-gray-500 dark:text-gray-500',
  BORDER_DEFAULT: 'border-gray-200 dark:border-gray-700',
  BORDER_LIGHT: 'border-gray-100 dark:border-gray-800',
  HOVER_BG: 'hover:bg-gray-50 dark:hover:bg-gray-700',
  FOCUS_RING: 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800',
} as const;

export const getChartColors = (isDark: boolean = false) => ({
  primary: THEME_COLORS.CHART_PRIMARY,
  secondary: THEME_COLORS.CHART_SECONDARY,
  accent: THEME_COLORS.CHART_ACCENT,
  purple: THEME_COLORS.CHART_PURPLE,
  blue: THEME_COLORS.CHART_BLUE,
  grid: isDark ? '#374151' : '#e5e7eb',
  text: isDark ? '#9ca3af' : '#6b7280',
});

export const getTooltipStyles = (isDark: boolean = false) => ({
  backgroundColor: isDark ? '#374151' : 'white',
  border: `1px solid ${isDark ? '#4b5563' : '#e5e7eb'}`,
  borderRadius: '8px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  color: isDark ? '#f9fafb' : '#111827',
});

export const formatChartValue = (value: number): string => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toString();
};

export type ThemeColors = typeof THEME_COLORS;
export type ThemeClasses = typeof THEME_CLASSES;
