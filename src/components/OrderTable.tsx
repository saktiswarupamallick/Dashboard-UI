import React, { useState } from 'react';
import type { Order } from '../types';
import { THEME_CLASSES } from '../utils/theme';
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

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const getProfileImage = (index: number) => {
    const profileImages = [Female08Icon, Female09Icon, Female15Icon, Male3DIcon];
    return profileImages[index % profileImages.length];
  };

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      'In Progress': 'text-purple-800',
      'Complete': 'text-green-800',
      'Pending': 'text-blue-800',
      'Approved': 'text-yellow-800',
      'Rejected': 'text-gray-800'
    };
    return colors[status];
  };

  const getStatusDot = (status: Order['status']) => {
    const colors = {
      'In Progress': 'bg-purple-500',
      'Complete': 'bg-green-500',
      'Pending': 'bg-blue-500',
      'Approved': 'bg-yellow-500',
      'Rejected': 'bg-gray-500'
    };
    return colors[status];
  };

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map(order => order.id));
    }
  };

  const filteredOrders = orders.filter(order =>
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddOrder = () => {
    console.log('Add order clicked');
  };

  const handleFilter = () => {
    console.log('Filter clicked');
  };

  const handleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="w-full  rounded-lg shadow-sm">
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-4">Order List</h2>
        
        <div className={`flex flex-col sm:flex-row items-start sm:items-center ${THEME_CLASSES.CARD_BG} justify-between gap-4 p-2 rounded-lg`}>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleAddOrder}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <PlusIcon className="text-gray-900 dark:text-white" size={20} />
            </button>
            <button 
              onClick={handleFilter}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FilterIcon className="text-gray-900 dark:text-white" size={20} />
            </button>
            <button 
              onClick={handleSort}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowIcon className={`text-gray-900 dark:text-white transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} size={20} />
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
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`block w-full sm:w-64 pl-10 pr-3 py-1 border ${THEME_CLASSES.BORDER_DEFAULT} rounded-lg ${THEME_CLASSES.DASHBOARD_BG} ${THEME_CLASSES.TEXT_PRIMARY} placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>
        </div>
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
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider min-w-[120px]">
                    Order ID
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider min-w-[180px]">
                    User
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider min-w-[150px]">
                    Project
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider min-w-[200px]">
                    Address
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider min-w-[140px]">
                    Date
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider min-w-[120px]">
                    Status
                  </th>
                 
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200 dark:divide-gray-700">
                {filteredOrders.map((order, index) => (
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
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {order.orderId}
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
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {order.user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {order.project}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div className="flex gap-1 items-center">
                        <span className="truncate max-w-[180px]">{order.address}</span>
                        {order.hasDocument && (
                          <AddressIcon className="text-gray-900 dark:text-white" size={16} />
                        )}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div className="flex gap-2 items-center">
                       <DateIcon className="text-gray-900 dark:text-white" size={16} />
                        {order.date}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${getStatusDot(order.status)}`}></span>
                        {order.status}
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
          <div className="text-sm text-gray-500 dark:text-gray-400 order-2 sm:order-1">
            Showing {filteredOrders.length} of {orders.length} results
          </div>
          
          <div className="flex items-center justify-center space-x-2 order-1 sm:order-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50" disabled>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-3 py-1 text-sm rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  page === 1 ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''
                }`}
              >
                {page}
              </button>
            ))}
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
