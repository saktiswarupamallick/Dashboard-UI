import type { MetricCard, ChartDataPoint, RevenueData, LocationData, Product, SalesData, NotificationItem, ContactItem, ActivityItem, Order } from '../types';

export const metricCards: MetricCard[] = [
  {
    title: 'Customers',
    value: '5,231',
    change: 20.1,
    changeType: 'increase',
    icon: 'trending-up'
  },
  {
    title: 'Orders',
    value: '2,350',
    change: 15.3,
    changeType: 'increase',
    icon: 'shopping-cart'
  },
  {
    title: 'Revenue',
    value: '$1,234',
    change: 8.2,
    changeType: 'increase',
    icon: 'users'
  },
  {
    title: 'Growth',
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
  { current: 12000000, previous: 7000000, date: 'Jan' },
  { current: 8000000, previous: 15000000, date: 'Feb' },
  { current: 10000000, previous: 12000000, date: 'Mar' },
  { current: 15000000, previous: 10000000, date: 'Apr' },
  { current: 20000000, previous: 15000000, date: 'May' },
  { current: 20000000, previous: 23000000, date: 'Jun' }
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


const generateTimestamp = (hoursAgo: number): { timestamp: number; timeString: string } => {
  const now = new Date();
  const timestamp = now.getTime() - (hoursAgo * 60 * 60 * 1000);
  
  if (hoursAgo < 1) {
    const minutesAgo = Math.floor(hoursAgo * 60);
    return {
      timestamp,
      timeString: minutesAgo <= 1 ? 'Just now' : `${minutesAgo} minutes ago`
    };
  } else if (hoursAgo < 24) {
    const hours = Math.floor(hoursAgo);
    return {
      timestamp,
      timeString: hours === 1 ? '1 hour ago' : `${hours} hours ago`
    };
  } else if (hoursAgo < 48) {
    return {
      timestamp,
      timeString: 'Yesterday'
    };
  } else {
    const days = Math.floor(hoursAgo / 24);
    return {
      timestamp,
      timeString: `${days} days ago`
    };
  }
};

export const notifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Critical System Alert: Database Connection Lost',
    message: 'The primary database connection has been interrupted. Please check the server status immediately.',
    time: generateTimestamp(0.1).timeString,
    timestamp: generateTimestamp(0.1).timestamp,
    read: false,
    type: 'error',
    iconType: 'bug'
  },
  {
    id: '2', 
    title: 'New Team Member Added',
    message: 'Sarah Wilson has joined the development team and needs access to the project repositories.',
    time: generateTimestamp(1.2).timeString,
    timestamp: generateTimestamp(1.2).timestamp,
    read: false,
    type: 'success',
    iconType: 'user'
  },
  {
    id: '3',
    title: 'Performance Warning: High Memory Usage',
    message: 'Server memory usage has exceeded 85%. Consider optimizing queries or scaling resources.',
    time: generateTimestamp(3.5).timeString,
    timestamp: generateTimestamp(3.5).timestamp,
    read: false,
    type: 'warning',
    iconType: 'bug'
  },
  {
    id: '4',
    title: 'New Subscription: Premium Plan',
    message: 'Alex Johnson upgraded to Premium plan. Revenue increased by $299/month.',
    time: generateTimestamp(6).timeString,
    timestamp: generateTimestamp(6).timestamp,
    read: true,
    type: 'success',
    iconType: 'subscribe'
  },
  {
    id: '5',
    title: 'Security Alert: Unusual Login Activity',
    message: 'Multiple failed login attempts detected from IP 192.168.1.100. Account temporarily locked.',
    time: generateTimestamp(12).timeString,
    timestamp: generateTimestamp(12).timestamp,
    read: true,
    type: 'error',
    iconType: 'bug'
  },
  {
    id: '6',
    title: 'System Update Completed',
    message: 'Dashboard v2.1.3 has been successfully deployed with new analytics features.',
    time: generateTimestamp(24).timeString,
    timestamp: generateTimestamp(24).timestamp,
    read: true,
    type: 'info',
    iconType: 'bug'
  },
  {
    id: '7',
    title: 'New Feature Request',
    message: 'Customer requested dark mode toggle for the mobile app. Priority: Medium.',
    time: generateTimestamp(48).timeString,
    timestamp: generateTimestamp(48).timestamp,
    read: true,
    type: 'info',
    iconType: 'user'
  },
  {
    id: '8',
    title: 'Backup Completed Successfully',
    message: 'Daily database backup completed. 2.3GB archived to cloud storage.',
    time: generateTimestamp(72).timeString,
    timestamp: generateTimestamp(72).timestamp,
    read: true,
    type: 'success',
    iconType: 'bug'
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
  },
  {
    id: '11',
    orderId: '#CM9811',
    user: {
      name: 'Robert Wilson',
      avatar: 'RW'
    },
    project: 'Data Analytics Dashboard',
    address: 'Tech Street Austin',
    date: 'Jan 20, 2023',
    status: 'Complete',
    hasDocument: true
  },
  {
    id: '12',
    orderId: '#CM9812',
    user: {
      name: 'Jennifer Brown',
      avatar: 'JB'
    },
    project: 'Mobile Banking App',
    address: 'Finance Avenue Chicago',
    date: 'Jan 18, 2023',
    status: 'Pending'
  },
  {
    id: '13',
    orderId: '#CM9813',
    user: {
      name: 'Christopher Davis',
      avatar: 'CD'
    },
    project: 'E-learning Platform',
    address: 'Education Boulevard Phoenix',
    date: 'Jan 15, 2023',
    status: 'Approved',
    hasDocument: true
  },
  {
    id: '14',
    orderId: '#CM9814',
    user: {
      name: 'Amanda Garcia',
      avatar: 'AG'
    },
    project: 'Healthcare Management System',
    address: 'Medical Center Houston',
    date: 'Jan 12, 2023',
    status: 'In Progress'
  },
  {
    id: '15',
    orderId: '#CM9815',
    user: {
      name: 'Matthew Martinez',
      avatar: 'MM'
    },
    project: 'Real Estate Portal',
    address: 'Property Lane Las Vegas',
    date: 'Jan 10, 2023',
    status: 'Rejected'
  },
  {
    id: '16',
    orderId: '#CM9816',
    user: {
      name: 'Ashley Anderson',
      avatar: 'AA'
    },
    project: 'Food Delivery App',
    address: 'Restaurant Row Nashville',
    date: 'Jan 8, 2023',
    status: 'Complete',
    hasDocument: true
  },
  {
    id: '17',
    orderId: '#CM9817',
    user: {
      name: 'Daniel Taylor',
      avatar: 'DT'
    },
    project: 'Fitness Tracking App',
    address: 'Gym Street Orlando',
    date: 'Jan 5, 2023',
    status: 'Pending',
    hasDocument: true
  },
  {
    id: '18',
    orderId: '#CM9818',
    user: {
      name: 'Jessica Thomas',
      avatar: 'JT'
    },
    project: 'Travel Booking Platform',
    address: 'Vacation Avenue Tampa',
    date: 'Jan 3, 2023',
    status: 'Approved'
  },
  {
    id: '19',
    orderId: '#CM9819',
    user: {
      name: 'Ryan Jackson',
      avatar: 'RJ'
    },
    project: 'Social Networking App',
    address: 'Connection Boulevard ',
    date: 'Jan 1, 2023',
    status: 'In Progress',
    hasDocument: true
  },
  {
    id: '20',
    orderId: '#CM9820',
    user: {
      name: 'Stephanie White',
      avatar: 'SW'
    },
    project: 'Inventory Management System',
    address: 'Warehouse District Dallas',
    date: 'Dec 28, 2022',
    status: 'Complete'
  },
  {
    id: '21',
    orderId: '#CM9821',
    user: {
      name: 'Kevin Harris',
      avatar: 'KH'
    },
    project: 'Customer Support Portal',
    address: 'Service Center',
    date: 'Dec 25, 2022',
    status: 'Pending',
    hasDocument: true
  },
  {
    id: '22',
    orderId: '#CM9822',
    user: {
      name: 'Nicole Martin',
      avatar: 'NM'
    },
    project: 'Event Management Platform',
    address: 'Celebration Street ',
    date: 'Dec 22, 2022',
    status: 'Approved'
  },
  {
    id: '23',
    orderId: '#CM9823',
    user: {
      name: 'Brandon Thompson',
      avatar: 'BT'
    },
    project: 'Project Management Tool',
    address: 'Business Park ',
    date: 'Dec 20, 2022',
    status: 'Rejected',
    hasDocument: true
  },
  {
    id: '24',
    orderId: '#CM9824',
    user: {
      name: 'Rachel Garcia',
      avatar: 'RG'
    },
    project: 'Online Marketplace',
    address: 'Commerce Avenue ',
    date: 'Dec 18, 2022',
    status: 'In Progress'
  },
  {
    id: '25',
    orderId: '#CM9825',
    user: {
      name: 'Tyler Martinez',
      avatar: 'TM'
    },
    project: 'Video Streaming ',
    address: 'Media Street Memphis',
    date: 'Dec 15, 2022',
    status: 'Complete',
    hasDocument: true
  },
  {
    id: '26',
    orderId: '#CM9826',
    user: {
      name: 'Megan Robinson',
      avatar: 'MR'
    },
    project: 'Blog Management System',
    address: 'Content Lane Louisville',
    date: 'Dec 12, 2022',
    status: 'Pending'
  },
  {
    id: '27',
    orderId: '#CM9827',
    user: {
      name: 'Justin Clark',
      avatar: 'JC'
    },
    project: 'Weather Application',
    address: 'Climate Avenue Baltimore',
    date: 'Dec 10, 2022',
    status: 'Approved',
    hasDocument: true
  },
  {
    id: '28',
    orderId: '#CM9828',
    user: {
      name: 'Samantha Rodriguez',
      avatar: 'SR'
    },
    project: 'News Aggregator',
    address: 'Information Street ',
    date: 'Dec 8, 2022',
    status: 'In Progress'
  },
  {
    id: '29',
    orderId: '#CM9829',
    user: {
      name: 'Andrew Lewis',
      avatar: 'AL'
    },
    project: 'Stock Trading Platform',
    address: 'Financial District A=',
    date: 'Dec 5, 2022',
    status: 'Complete'
  },
  {
    id: '30',
    orderId: '#CM9830',
    user: {
      name: 'Lauren Lee',
      avatar: 'LL'
    },
    project: 'Language Learning App',
    address: 'Education Center Tucson',
    date: 'Dec 3, 2022',
    status: 'Pending',
    hasDocument: true
  }
];