import React, { useState, useMemo } from 'react';
import type { Product, SortDirection, TableColumn } from '../types';
import { formatCurrency, sortData, paginateData } from '../utils';
import { ChevronDownIcon, ChevronRightIcon } from './Icons';
import { THEME_CLASSES } from '../utils/theme';

interface ProductTableProps {
  products: Product[];
  className?: string;
}

const columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true, width: '150px' },
  { key: 'price', label: 'Price', sortable: true, width: '120px' },
  { key: 'quantity', label: 'Quantity', sortable: true, width: '100px' },
  { key: 'amount', label: 'Amount', sortable: true, width: '120px' }
];

const ProductTable: React.FC<ProductTableProps> = ({ products, className = '' }) => {
  const [sortKey, setSortKey] = useState<keyof Product>('amount');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const handleSort = (key: keyof Product) => {
    if (sortKey === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  const processedData = useMemo(() => {
    const sorted = sortData(products, sortKey, sortDirection);
    return paginateData(sorted, currentPage, pageSize);
  }, [products, sortKey, sortDirection, currentPage, pageSize]);

  const getSortIcon = (key: keyof Product) => {
    if (sortKey !== key) {
      return <ChevronDownIcon className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" size={14} />;
    }
    return sortDirection === 'asc' 
      ? <ChevronRightIcon className="text-blue-600 dark:text-blue-400 rotate-[-90deg] transition-transform duration-200" size={14} />
      : <ChevronRightIcon className="text-blue-600 dark:text-blue-400 rotate-90 transition-transform duration-200" size={14} />;
  };

  return (
    <div className={`h-full flex flex-col p-6 ${className} ${THEME_CLASSES.CARD_BG} rounded-2xl`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-900 text-secondary dark:text-white">Top Selling Products</h3>
      </div>

      <div className="flex-1 overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[400px]">
          <thead >
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-3 sm:px-4 py-3 text-left text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key as keyof Product)}
                >
                  <div className="flex items-center justify-between">
                    <span>{column.label}</span>
                    {column.sortable && getSortIcon(column.key as keyof Product)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tr>
            <td colSpan={4} className="px-0">
              <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-500"></div>
            </td>
          </tr>
          
          <tbody >
            {processedData.items.map((product, index) => (
              <tr 
                key={product.id} 
                className={`${THEME_CLASSES.HOVER_BG} transition-colors duration-200`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'slideUp 0.3s ease-out forwards'
                }}
              >
                <td className="px-3 sm:px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className={`text-sm  ${THEME_CLASSES.TEXT_PRIMARY}`}>
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className={`px-3 sm:px-4 py-4 text-sm ${THEME_CLASSES.TEXT_PRIMARY} whitespace-nowrap`}>
                  {formatCurrency(product.price)}
                </td>
                <td className={`px-3 sm:px-4 py-4 text-sm ${THEME_CLASSES.TEXT_PRIMARY} whitespace-nowrap`}>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ">
                    {product.quantity}
                  </span>
                </td>
                <td className={`px-3 sm:px-4 py-4 text-sm  ${THEME_CLASSES.TEXT_PRIMARY} whitespace-nowrap`}>
                  {formatCurrency(product.amount)}
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>

      {processedData.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className={`text-sm ${THEME_CLASSES.TEXT_SECONDARY}`}>
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, products.length)} of {products.length} results
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={!processedData.hasPrev}
              className={`px-3 py-2 text-sm ${THEME_CLASSES.CARD_BG} border ${THEME_CLASSES.BORDER_DEFAULT} rounded-lg ${THEME_CLASSES.HOVER_BG} disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: processedData.totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                    page === currentPage
                      ? 'bg-blue-600 text-white'
                      : `${THEME_CLASSES.CARD_BG} border ${THEME_CLASSES.BORDER_DEFAULT} ${THEME_CLASSES.TEXT_SECONDARY} ${THEME_CLASSES.HOVER_BG}`
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(processedData.totalPages, prev + 1))}
              disabled={!processedData.hasNext}
              className={`px-3 py-2 text-sm ${THEME_CLASSES.CARD_BG} border ${THEME_CLASSES.BORDER_DEFAULT} rounded-lg ${THEME_CLASSES.HOVER_BG} disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
