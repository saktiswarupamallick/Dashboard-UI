export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  amount: number;
}

export interface LocationData {
  name: string;
  value: number;
  percentage: string;
}

export interface SalesData {
  direct: number;
  affiliate: number;
  sponsored: number;
  email: number;
}

export interface RevenueData {
  current: number;
  previous: number;
  date: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  timestamp?: number; // For proper sorting
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  iconType: 'bug' | 'user' | 'subscribe';
}

export interface ContactItem {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
}

export interface ActivityItem {
  id: string;
  user: string;
  time: string;
}

export type Theme = 'light' | 'dark';

export type SortDirection = 'asc' | 'desc';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface Order {
  id: string;
  orderId: string;
  user: {
    name: string;
    avatar: string;
  };
  project: string;
  address: string;
  date: string;
  status: 'In Progress' | 'Complete' | 'Pending' | 'Approved' | 'Rejected';
  hasDocument?: boolean;
}

export interface OrderStatus {
  type: 'In Progress' | 'Complete' | 'Pending' | 'Approved' | 'Rejected';
  color: string;
  bgColor: string;
}






