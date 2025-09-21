import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { 
  NotificationItem, 
  ContactItem, 
  ActivityItem, 
  Order, 
  Product,
  MetricCard,
  ChartDataPoint,
  RevenueData,
  LocationData,
  SalesData
} from '../types';
import { 
  notifications as initialNotifications,
  contacts as initialContacts,
  activities as initialActivities,
  ordersData as initialOrders,
  topProducts as initialProducts,
  metricCards as initialMetricCards,
  projectionsData as initialProjections,
  actualsData as initialActuals,
  revenueData as initialRevenue,
  locationData as initialLocation,
  salesData as initialSales
} from '../utils/data';

interface AppState {
  sidebarOpen: boolean;
  activitySidebarOpen: boolean;
  searchQuery: string;
  
  notifications: NotificationItem[];
  contacts: ContactItem[];
  activities: ActivityItem[];
  orders: Order[];
  products: Product[];
  metricCards: MetricCard[];
  projectionsData: ChartDataPoint[];
  actualsData: ChartDataPoint[];
  revenueData: RevenueData[];
  locationData: LocationData[];
  salesData: SalesData;
  
  orderFilters: {
    status?: string;
    dateRange?: { start: string; end: string };
    searchTerm: string;
  };
  productSort: {
    key: keyof Product;
    direction: 'asc' | 'desc';
  };
  
  isLoading: {
    dashboard: boolean;
    orders: boolean;
    products: boolean;
  };
  
  preferences: {
    itemsPerPage: number;
    defaultSort: string;
    autoRefresh: boolean;
    notificationsEnabled: boolean;
  };
}

type AppAction =
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'TOGGLE_ACTIVITY_SIDEBAR' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'CLEAR_ALL_NOTIFICATIONS' }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<NotificationItem, 'id'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'SET_ORDER_FILTERS'; payload: Partial<AppState['orderFilters']> }
  | { type: 'SET_PRODUCT_SORT'; payload: { key: keyof Product; direction: 'asc' | 'desc' } }
  | { type: 'SET_LOADING'; payload: { key: keyof AppState['isLoading']; value: boolean } }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<AppState['preferences']> }
  | { type: 'RESET_FILTERS' }
  | { type: 'HYDRATE_STATE'; payload: Partial<AppState> };


const getInitialSidebarState = () => {
  if (typeof window === 'undefined') return false; 
  return window.innerWidth >= 1024; 
};

const getInitialActivitySidebarState = () => {
  if (typeof window === 'undefined') return false; 
  return window.innerWidth >= 1280; 
};

const initialState: AppState = {
  sidebarOpen: getInitialSidebarState(),
  activitySidebarOpen: getInitialActivitySidebarState(),
  searchQuery: '',
  
  notifications: initialNotifications,
  contacts: initialContacts,
  activities: initialActivities,
  orders: initialOrders,
  products: initialProducts,
  metricCards: initialMetricCards,
  projectionsData: initialProjections,
  actualsData: initialActuals,
  revenueData: initialRevenue,
  locationData: initialLocation,
  salesData: initialSales,
  
  orderFilters: {
    searchTerm: '',
  },
  productSort: {
    key: 'amount',
    direction: 'desc',
  },
  
  isLoading: {
    dashboard: false,
    orders: false,
    products: false,
  },
  
  preferences: {
    itemsPerPage: 10,
    defaultSort: 'amount',
    autoRefresh: true,
    notificationsEnabled: true,
  },
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    
    case 'TOGGLE_ACTIVITY_SIDEBAR':
      return { ...state, activitySidebarOpen: !state.activitySidebarOpen };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
      };
    
    case 'CLEAR_ALL_NOTIFICATIONS':
      return {
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          read: true,
        })),
      };
    
    case 'ADD_NOTIFICATION':
      const newNotification: NotificationItem = {
        ...action.payload,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        timestamp: action.payload.timestamp || Date.now(),
      };
      return {
        ...state,
        notifications: [newNotification, ...state.notifications].slice(0, 50), 
      };
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload),
      };
    
    case 'SET_ORDER_FILTERS':
      return {
        ...state,
        orderFilters: { ...state.orderFilters, ...action.payload },
      };
    
    case 'SET_PRODUCT_SORT':
      return {
        ...state,
        productSort: action.payload,
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: { ...state.isLoading, [action.payload.key]: action.payload.value },
      };
    
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload },
      };
    
    case 'RESET_FILTERS':
      return {
        ...state,
        orderFilters: { searchTerm: '' },
        productSort: { key: 'amount', direction: 'desc' },
        searchQuery: '',
      };
    
    case 'HYDRATE_STATE':
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  
  unreadNotificationsCount: number;
  filteredOrders: Order[];
  filteredProducts: Product[];
  
  toggleSidebar: () => void;
  toggleActivitySidebar: () => void;
  setSearchQuery: (query: string) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  addNotification: (notification: Omit<NotificationItem, 'id'>) => void;
  removeNotification: (id: string) => void;
  setOrderFilters: (filters: Partial<AppState['orderFilters']>) => void;
  setProductSort: (key: keyof Product, direction: 'asc' | 'desc') => void;
  updatePreferences: (preferences: Partial<AppState['preferences']>) => void;
  resetFilters: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedState = localStorage.getItem('dashboard-app-state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        
  
        const currentWidth = window.innerWidth;
        const responsiveState = {
          ...parsedState,
          sidebarOpen: currentWidth >= 1024 ? parsedState.sidebarOpen : false,
          activitySidebarOpen: currentWidth >= 1280 ? parsedState.activitySidebarOpen : false,
        };
        
        dispatch({ type: 'HYDRATE_STATE', payload: responsiveState });
      } catch (error) {
        console.warn('Failed to parse saved app state:', error);
      }
    }
  }, []);

  useEffect(() => {
    const stateToSave = {
      sidebarOpen: state.sidebarOpen,
      activitySidebarOpen: state.activitySidebarOpen,
      preferences: state.preferences,
      orderFilters: state.orderFilters,
      productSort: state.productSort,
    };
    localStorage.setItem('dashboard-app-state', JSON.stringify(stateToSave));
  }, [state.sidebarOpen, state.activitySidebarOpen, state.preferences, state.orderFilters, state.productSort]);


  useEffect(() => {
    let previousWidth = window.innerWidth;
    
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      
   
      if (previousWidth >= 1024 && currentWidth < 1024 && state.sidebarOpen) {
        dispatch({ type: 'TOGGLE_SIDEBAR' });
      }
      
      if (previousWidth >= 1280 && currentWidth < 1280 && state.activitySidebarOpen) {
        dispatch({ type: 'TOGGLE_ACTIVITY_SIDEBAR' });
      }
      
      previousWidth = currentWidth;
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [state.sidebarOpen, state.activitySidebarOpen]);

  const unreadNotificationsCount = state.notifications.filter(n => !n.read).length;
  
  const filteredOrders = state.orders.filter(order => {
    const matchesSearch = !state.orderFilters.searchTerm || 
      order.orderId.toLowerCase().includes(state.orderFilters.searchTerm.toLowerCase()) ||
      order.user.name.toLowerCase().includes(state.orderFilters.searchTerm.toLowerCase()) ||
      order.project.toLowerCase().includes(state.orderFilters.searchTerm.toLowerCase()) ||
      order.address.toLowerCase().includes(state.orderFilters.searchTerm.toLowerCase());
    
    const matchesStatus = !state.orderFilters.status || order.status === state.orderFilters.status;
    
    return matchesSearch && matchesStatus;
  });

  const filteredProducts = [...state.products].sort((a, b) => {
    const aValue = a[state.productSort.key];
    const bValue = b[state.productSort.key];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return state.productSort.direction === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return state.productSort.direction === 'asc' 
        ? aValue - bValue
        : bValue - aValue;
    }
    
    return 0;
  });

  const toggleSidebar = () => {
    console.log('Toggle Sidebar called - Current state:', state.sidebarOpen);
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };
  const toggleActivitySidebar = () => {
    console.log('Toggle Activity Sidebar called - Current state:', state.activitySidebarOpen);
    dispatch({ type: 'TOGGLE_ACTIVITY_SIDEBAR' });
  };
  const setSearchQuery = (query: string) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  const markNotificationRead = (id: string) => dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  const clearAllNotifications = () => dispatch({ type: 'CLEAR_ALL_NOTIFICATIONS' });
  const addNotification = (notification: Omit<NotificationItem, 'id'>) => 
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  const removeNotification = (id: string) => dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  const setOrderFilters = (filters: Partial<AppState['orderFilters']>) => 
    dispatch({ type: 'SET_ORDER_FILTERS', payload: filters });
  const setProductSort = (key: keyof Product, direction: 'asc' | 'desc') => 
    dispatch({ type: 'SET_PRODUCT_SORT', payload: { key, direction } });
  const updatePreferences = (preferences: Partial<AppState['preferences']>) => 
    dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
  const resetFilters = () => dispatch({ type: 'RESET_FILTERS' });

  const value: AppContextType = {
    state,
    dispatch,
    unreadNotificationsCount,
    filteredOrders,
    filteredProducts,
    toggleSidebar,
    toggleActivitySidebar,
    setSearchQuery,
    markNotificationRead,
    clearAllNotifications,
    addNotification,
    removeNotification,
    setOrderFilters,
    setProductSort,
    updatePreferences,
    resetFilters,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
