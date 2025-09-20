import type { MetricCard, ChartDataPoint, RevenueData, LocationData, Product, SalesData, NotificationItem, ContactItem, ActivityItem, Order } from '../types';

export const metricCards: MetricCard[] = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: 20.1,
    changeType: 'increase',
    icon: 'trending-up'
  },
  {
    title: 'Total Orders',
    value: '2,350',
    change: 15.3,
    changeType: 'increase',
    icon: 'shopping-cart'
  },
  {
    title: 'Total Customers',
    value: '1,234',
    change: 8.2,
    changeType: 'increase',
    icon: 'users'
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: -2.1,
    changeType: 'decrease',
    icon: 'trending-up'
  }
];

export const projectionsData: ChartDataPoint[] = [
  { name: 'Jan', value: 20 },
  { name: 'Feb', value: 25 },
  { name: 'Mar', value: 30 },
  { name: 'Apr', value: 35 },
  { name: 'May', value: 40 },
  { name: 'Jun', value: 45 }
];

export const actualsData: ChartDataPoint[] = [
  { name: 'Jan', value: 18 },
  { name: 'Feb', value: 22 },
  { name: 'Mar', value: 28 },
  { name: 'Apr', value: 32 },
  { name: 'May', value: 38 },
  { name: 'Jun', value: 42 }
];

export const revenueData: RevenueData[] = [
  { current: 58211, previous: 58768, date: 'Current Week' },
  { current: 55000, previous: 52000, date: 'Jan' },
  { current: 58000, previous: 55000, date: 'Feb' },
  { current: 52000, previous: 58000, date: 'Mar' },
  { current: 61000, previous: 52000, date: 'Apr' },
  { current: 58000, previous: 61000, date: 'May' },
  { current: 65000, previous: 58000, date: 'Jun' }
];

export const locationData: LocationData[] = [
  { name: 'New York', value: 72, percentage: '72K' },
  { name: 'San Francisco', value: 39, percentage: '39K' },
  { name: 'Sydney', value: 25, percentage: '25K' },
  { name: 'Singapore', value: 61, percentage: '61K' }
];

export const topProducts: Product[] = [
  {
    id: '1',
    name: 'ASOS Ridley High Waist',
    price: 79.49,
    quantity: 82,
    amount: 6518.18
  },
  {
    id: '2',
    name: 'Marco Lightweight Shirt',
    price: 128.50,
    quantity: 37,
    amount: 4754.50
  },
  {
    id: '3',
    name: 'Half Sleeve Shirt',
    price: 39.99,
    quantity: 64,
    amount: 2559.36
  },
  {
    id: '4',
    name: 'Lightweight Jacket',
    price: 20.00,
    quantity: 184,
    amount: 3680.00
  },
  {
    id: '5',
    name: 'Marco Shoes',
    price: 79.49,
    quantity: 64,
    amount: 1965.81
  }
];

export const salesData: SalesData = {
  direct: 300.56,
  affiliate: 135.18,
  sponsored: 154.02,
  email: 48.96
};

export const notifications: NotificationItem[] = [
  {
    id: '1',
    title: 'You have a bug that needs...',
    message: 'Just now',
    time: 'Just now',
    read: false,
    type: 'error',
    iconType: 'bug'
  },
  {
    id: '2',
    title: 'New user registered',
    message: '59 minutes ago',
    time: '59 minutes ago',
    read: false,
    type: 'success',
    iconType: 'user'
  },
  {
    id: '3',
    title: 'You have a bug that needs...',
    message: '12 hours ago',
    time: '12 hours ago',
    read: true,
    type: 'error',
    iconType: 'bug'
  },
  {
    id: '4',
    title: 'Andi Lane subscribed to you',
    message: 'Today, 11:59 AM',
    time: 'Today, 11:59 AM',
    read: true,
    type: 'success',
    iconType: 'subscribe'
  }
];

export const contacts: ContactItem[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'JD',
    status: 'online'
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'JS',
    status: 'away'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: 'MJ',
    status: 'offline'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    avatar: 'SW',
    status: 'online'
  },
  {
    id: '5',
    name: 'Emily Davis',
    avatar: 'ED',
    status: 'online'
  },
  {
    id: '6',
    name: 'David Brown',
    avatar: 'DB',
    status: 'away'
  },
  {
    id: '7',
    name: 'Lisa Garcia',
    avatar: 'LG',
    status: 'offline'
  }
];

export const activities: ActivityItem[] = [
  {
    id: '1',
    user: 'You have a bug that needs...',
    time: 'Just now'
  },
  {
    id: '2',
    user: 'Released a new version',
    time: '59 minutes ago'
  },
  {
    id: '3',
    user: 'Submitted a bug',
    time: '12 hours ago'
  },
  {
    id: '4',
    user: 'Modified A data in Page X',
    time: 'Today, 11:59 AM'
  },
  {
    id: '5',
    user: 'Deleted a page in Project X',
    time: 'Feb 2, 2023'
  }
];

export const ordersData: Order[] = [
  {
    id: '1',
    orderId: '#CM9801',
    user: {
      name: 'Natali Craig',
      avatar: 'NC'
    },
    project: 'Landing Page',
    address: 'Meadow Lane Oakland',
    date: 'Just now',
    status: 'In Progress'
  },
  {
    id: '2',
    orderId: '#CM9802',
    user: {
      name: 'Kate Morrison',
      avatar: 'KM'
    },
    project: 'CRM Admin pages',
    address: 'Larry San Francisco',
    date: 'A minute ago',
    status: 'Complete'
  },
  {
    id: '3',
    orderId: '#CM9803',
    user: {
      name: 'Drew Cano',
      avatar: 'DC'
    },
    project: 'Client Project',
    address: 'Bagwell Avenue Ocala',
    date: '1 hour ago',
    status: 'Pending'
  },
  {
    id: '4',
    orderId: '#CM9804',
    user: {
      name: 'Orlando Diggs',
      avatar: 'OD'
    },
    project: 'Admin Dashboard',
    address: 'Washburn Baton Rouge',
    date: 'Yesterday',
    status: 'Approved'
  },
  {
    id: '5',
    orderId: '#CM9805',
    user: {
      name: 'Andi Lane',
      avatar: 'AL'
    },
    project: 'App Landing Page',
    address: 'Nest Lane Olivette',
    date: 'Feb 2, 2023',
    status: 'Rejected',
    hasDocument: true
  },
  {
    id: '6',
    orderId: '#CM9806',
    user: {
      name: 'Sarah Johnson',
      avatar: 'SJ'
    },
    project: 'E-commerce Platform',
    address: 'Main Street Boston',
    date: 'Feb 1, 2023',
    status: 'In Progress',
    hasDocument: true
  },
  {
    id: '7',
    orderId: '#CM9807',
    user: {
      name: 'Michael Chen',
      avatar: 'MC'
    },
    project: 'Mobile App Design',
    address: 'Oak Avenue Seattle',
    date: 'Jan 30, 2023',
    status: 'Complete'
  },
  {
    id: '8',
    orderId: '#CM9808',
    user: {
      name: 'Emily Rodriguez',
      avatar: 'ER'
    },
    project: 'Website Redesign',
    address: 'Pine Street Miami',
    date: 'Jan 28, 2023',
    status: 'Pending',
    hasDocument: true
  },
  {
    id: '9',
    orderId: '#CM9809',
    user: {
      name: 'David Kim',
      avatar: 'DK'
    },
    project: 'Brand Identity',
    address: 'Cedar Lane Portland',
    date: 'Jan 25, 2023',
    status: 'Approved'
  },
  {
    id: '10',
    orderId: '#CM9810',
    user: {
      name: 'Lisa Thompson',
      avatar: 'LT'
    },
    project: 'Social Media Campaign',
    address: 'Elm Street Denver',
    date: 'Jan 22, 2023',
    status: 'In Progress',
    hasDocument: true
  }
];