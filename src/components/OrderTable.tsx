import React, { useState, useCallback, useMemo } from 'react';
import type { Order } from '../types';
import { THEME_CLASSES } from '../utils/theme';
import { useApp } from '../contexts/AppContext';
import ActionIcon from './icons/ActionIcon';
import AddressIcon from './icons/AddressIcon';
import ArrowIcon from './icons/ArrowIcon';
import DateIcon from './icons/DateIcon';
import FilterIcon from './icons/FilterIcon';
import PlusIcon from './icons/PlusIcon';
import Female08Icon from '../assets/Female08.svg';
import Female09Icon from '../assets/Female09.svg';
import Female15Icon from '../assets/Female15.svg';
import Male3DIcon from '../assets/3D05.svg';


interface OrderTableProps {
  orders: Order[];
}

interface FilterState {
  status: string;
  dateRange: { start: string; end: string };
  hasDocument: boolean | null;
}

interface SortState {
  key: keyof Order | 'user.name' | 'date';
  direction: 'asc' | 'desc';
}

const OrderTable: React.FC<OrderTableProps> = React.memo(({ orders }) => {
  const { state } = useApp();
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    status: '',
    dateRange: { start: '', end: '' },
    hasDocument: null
  });
  const [sortState, setSortState] = useState<SortState>({
    key: 'date',
    direction: 'desc'
  });

  const profileImages = useMemo(() => [Female08Icon, Female09Icon, Female15Icon, Male3DIcon], []);

  const getProfileImage = useCallback((index: number) => {
    return profileImages[index % profileImages.length];
  }, [profileImages]);

  const getStatusColor = useCallback((status: Order['status']) => {
    const colors = {
      'In Progress': 'text-purple-800',
      'Complete': 'text-green-800',
      'Pending': 'text-blue-800',
      'Approved': 'text-yellow-800',
      'Rejected': 'text-gray-800'
    };
    return colors[status];
  }, []);

  const getStatusDot = useCallback((status: Order['status']) => {
    const colors = {
      'In Progress': 'bg-purple-500',
      'Complete': 'bg-green-500',
      'Pending': 'bg-blue-500',
      'Approved': 'bg-yellow-500',
      'Rejected': 'bg-gray-500'
    };
    return colors[status];
  }, []);

  const handleSelectOrder = useCallback((orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map(order => order.id));
    }
  }, [selectedOrders.length, orders]);

  const filteredAndSortedOrders = useMemo(() => {
    const filtered = orders.filter(order => {
      const matchesLocalSearch = !searchTerm || 
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGlobalSearch = !state.searchQuery || 
        order.orderId.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        order.user.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        order.project.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        order.address.toLowerCase().includes(state.searchQuery.toLowerCase());

      const matchesStatus = !filters.status || order.status === filters.status;

      const matchesDocument = filters.hasDocument === null || 
        (filters.hasDocument ? order.hasDocument : !order.hasDocument);

      return matchesLocalSearch && matchesGlobalSearch && matchesStatus && matchesDocument;
    });

    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      if (sortState.key === 'user.name') {
        aValue = a.user.name;
        bValue = b.user.name;
      } else {
        const aKey = a[sortState.key as keyof Order];
        const bKey = b[sortState.key as keyof Order];
        
        // Handle different types safely
        if (typeof aKey === 'string' || typeof aKey === 'number') {
          aValue = aKey;
        } else {
          aValue = String(aKey || '');
        }
        
        if (typeof bKey === 'string' || typeof bKey === 'number') {
          bValue = bKey;
        } else {
          bValue = String(bKey || '');
        }
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortState.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortState.direction === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });

    return filtered;
  }, [orders, searchTerm, state.searchQuery, filters, sortState]);

  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = filteredAndSortedOrders.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, state.searchQuery, filters, sortState]);

  const handleAddOrder = useCallback(() => {
  }, []);

  const handleFilter = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  const handleSort = useCallback((key: keyof Order | 'user.name') => {
    setSortState(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  const handleFilterChange = useCallback((filterType: keyof FilterState, value: string | { start: string; end: string } | boolean | null) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      status: '',
      dateRange: { start: '', end: '' },
      hasDocument: null
    });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  }, []);

  return (
    <div className="w-full  rounded-lg shadow-sm">
      <div className="p-4 sm:p-6">
        <h2 className="text-primary mb-4">Order List</h2>
        
        <div className={`flex flex-col sm:flex-row items-start sm:items-center ${THEME_CLASSES.CARD_BG} justify-between gap-4 p-2 rounded-lg`}>
          <div className="flex items-center space-x-3" role="toolbar" aria-label="Order table actions">
            <button 
              onClick={handleAddOrder}
              onKeyDown={(e) => handleKeyDown(e, handleAddOrder)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Add new order"
              title="Add new order"
            >
              <PlusIcon className="text-gray-900 dark:text-white" size={20} />
            </button>
            <button 
              onClick={handleFilter}
              onKeyDown={(e) => handleKeyDown(e, handleFilter)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Filter orders"
              title="Filter orders"
            >
              <FilterIcon className="text-gray-900 dark:text-white" size={20} />
            </button>
            <button 
              onClick={() => handleSort('date')}
              onKeyDown={(e) => handleKeyDown(e, () => handleSort('date'))}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label={`Sort orders by date ${sortState.key === 'date' && sortState.direction === 'asc' ? 'descending' : 'ascending'}`}
              title={`Sort orders by date ${sortState.key === 'date' && sortState.direction === 'asc' ? 'descending' : 'ascending'}`}
            >
              <ArrowIcon className={`text-gray-900 dark:text-white transition-transform ${sortState.key === 'date' && sortState.direction === 'desc' ? 'rotate-180' : ''}`} size={20} />
            </button>
          </div>
          
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`block w-full sm:w-64 pl-10 pr-3 py-1 border ${THEME_CLASSES.BORDER_DEFAULT} rounded-lg ${THEME_CLASSES.DASHBOARD_BG} ${THEME_CLASSES.TEXT_PRIMARY} placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              aria-label="Search orders"
              aria-describedby="search-help"
            />
            <div id="search-help" className="sr-only">
              Search by order ID, user name, project, or address
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className={`mt-4 p-4 ${THEME_CLASSES.CARD_BG} rounded-lg border ${THEME_CLASSES.BORDER_DEFAULT}`}>
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className={`w-full px-3 text-secondary py-2 border ${THEME_CLASSES.BORDER_DEFAULT} rounded-lg ${THEME_CLASSES.DASHBOARD_BG} ${THEME_CLASSES.TEXT_PRIMARY} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">All Statuses</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Complete">Complete</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Has Document
                </label>
                <select
                  value={filters.hasDocument === null ? '' : filters.hasDocument.toString()}
                  onChange={(e) => {
                    const value = e.target.value === '' ? null : e.target.value === 'true';
                    handleFilterChange('hasDocument', value);
                  }}
                  className={`w-full px-3 text-secondary py-2 border ${THEME_CLASSES.BORDER_DEFAULT} rounded-lg ${THEME_CLASSES.DASHBOARD_BG} ${THEME_CLASSES.TEXT_PRIMARY} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">All</option>
                  <option value="true">Has Document</option>
                  <option value="false">No Document</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full">
        <div className="2xl:overflow-visible overflow-x-auto">
          <div className="2xl:w-full min-w-[1000px]">
            <table className="w-full">
              <thead >
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === orders.length && orders.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort('orderId')}
                      className="flex items-center space-x-1 text-tertiary text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
                    >
                      <span>Order ID</span>
                      <ArrowIcon 
                        className={`w-3 h-3 transition-transform ${
                          sortState.key === 'orderId' && sortState.direction === 'desc' ? 'rotate-180' : ''
                        }`} 
                        size={12} 
                      />
                    </button>
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort('user.name')}
                      className="flex items-center space-x-1 text-tertiary text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
                    >
                      <span>User</span>
                      <ArrowIcon 
                        className={`w-3 h-3 transition-transform ${
                          sortState.key === 'user.name' && sortState.direction === 'desc' ? 'rotate-180' : ''
                        }`} 
                        size={12} 
                      />
                    </button>
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort('project')}
                      className="flex items-center space-x-1 text-tertiary text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
                    >
                      <span>Project</span>
                      <ArrowIcon 
                        className={`w-3 h-3 transition-transform ${
                          sortState.key === 'project' && sortState.direction === 'desc' ? 'rotate-180' : ''
                        }`} 
                        size={12} 
                      />
                    </button>
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort('address')}
                      className="flex items-center space-x-1 text-tertiary text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
                    >
                      <span>Address</span>
                      <ArrowIcon 
                        className={`w-3 h-3 transition-transform ${
                          sortState.key === 'address' && sortState.direction === 'desc' ? 'rotate-180' : ''
                        }`} 
                        size={12} 
                      />
                    </button>
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort('date')}
                      className="flex items-center space-x-1 text-tertiary text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
                    >
                      <span>Date</span>
                      <ArrowIcon 
                        className={`w-3 h-3 transition-transform ${
                          sortState.key === 'date' && sortState.direction === 'desc' ? 'rotate-180' : ''
                        }`} 
                        size={12} 
                      />
                    </button>
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort('status')}
                      className="flex items-center space-x-1 text-tertiary text-xs text-gray-500 dark:text-gray-300 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
                    >
                      <span>Status</span>
                      <ArrowIcon 
                        className={`w-3 h-3 transition-transform ${
                          sortState.key === 'status' && sortState.direction === 'desc' ? 'rotate-180' : ''
                        }`} 
                        size={12} 
                      />
                    </button>
                  </th>
                 
                </tr>
              </thead>
              
              <tr>
                <td colSpan={7} className="px-0">
                  <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-500"></div>
                </td>
              </tr>
              
              <tbody className=" divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedOrders.map((order, index) => (
                  <tr 
                    key={order.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onMouseEnter={() => setHoveredRow(order.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <h6 className="text-tertiary text-sm ">
                        {order.orderId}
                      </h6>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <img 
                            src={getProfileImage(index)} 
                            alt={`Profile ${index + 1}`} 
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <h6 className="text-tertiary text-sm">
                            {order.user.name}
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <h6 className="text-tertiary text-sm">
                        {order.project}
                      </h6>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-1 items-center">
                        <h6 className="text-tertiary text-sm truncate ">
                          {order.address}
                        </h6>
                        {order.hasDocument && (
                          <AddressIcon className="text-gray-900 dark:text-white" size={16} />
                        )}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2 items-center">
                       <DateIcon className="text-gray-900 dark:text-white" size={16} />
                        <h6 className="text-tertiary text-sm">
                          {order.date}
                        </h6>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${getStatusDot(order.status)}`}></span>
                        <h6 className="text-tertiary text-sm ">
                          {order.status}
                        </h6>
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        className={`text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-opacity duration-200 ${
                          hoveredRow === order.id ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <ActionIcon className="text-gray-900 dark:text-white" size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="order-2 sm:order-1">
            <h6 className="text-tertiary text-sm text-gray-500 dark:text-gray-400">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedOrders.length)} of {filteredAndSortedOrders.length} results
            </h6>
          </div>
          
          <div className="flex items-center justify-center space-x-2 order-1 sm:order-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    currentPage === pageNumber 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <h6 className="text-tertiary text-sm">
                    {pageNumber}
                  </h6>
                </button>
              );
            })}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

OrderTable.displayName = 'OrderTable';

export default OrderTable;
