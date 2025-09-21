import { useState, useCallback, useMemo } from 'react';
import type { SortDirection } from '../types';

interface UseTableStateOptions<T> {
  initialSortKey?: keyof T;
  initialSortDirection?: SortDirection;
  initialPageSize?: number;
  searchableFields?: (keyof T)[];
}

interface UseTableStateReturn<T> {
  sortKey: keyof T;
  sortDirection: SortDirection;
  currentPage: number;
  pageSize: number;
  searchTerm: string;
  selectedItems: string[];
  
  sortedData: T[];
  paginatedData: {
    items: T[];
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    totalItems: number;
  };
  
  setSortKey: (key: keyof T) => void;
  setSortDirection: (direction: SortDirection) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSearchTerm: (term: string) => void;
  toggleItemSelection: (id: string) => void;
  selectAllItems: () => void;
  clearSelection: () => void;
  resetTable: () => void;
}

export function useTableState<T extends { id: string }>(
  data: T[],
  options: UseTableStateOptions<T> = {}
): UseTableStateReturn<T> {
  const {
    initialSortKey,
    initialSortDirection = 'desc',
    initialPageSize = 10,
    searchableFields = [],
  } = options;

  const [sortKey, setSortKeyState] = useState<keyof T>(
    initialSortKey || (Object.keys(data[0] || {})[0] as keyof T)
  );
  const [sortDirection, setSortDirectionState] = useState<SortDirection>(initialSortDirection);
  const [currentPage, setCurrentPageState] = useState(1);
  const [pageSize, setPageSizeState] = useState(initialPageSize);
  const [searchTerm, setSearchTermState] = useState('');
  const [selectedItems, setSelectedItemsState] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    if (!searchTerm || searchableFields.length === 0) {
      return data;
    }

    return data.filter(item =>
      searchableFields.some(field => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (typeof value === 'number') {
          return value.toString().includes(searchTerm);
        }
        return false;
      })
    );
  }, [data, searchTerm, searchableFields]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [filteredData, sortKey, sortDirection]);

  const paginatedData = useMemo(() => {
    const totalItems = sortedData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const items = sortedData.slice(startIndex, endIndex);

    return {
      items,
      totalPages,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
      totalItems,
    };
  }, [sortedData, currentPage, pageSize]);

  const setSortKey = useCallback((key: keyof T) => {
    if (sortKey === key) {
      setSortDirectionState(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKeyState(key);
      setSortDirectionState('desc');
    }
    setCurrentPageState(1);
  }, [sortKey]);

  const setSortDirection = useCallback((direction: SortDirection) => {
    setSortDirectionState(direction);
  }, []);

  const setCurrentPage = useCallback((page: number) => {
    setCurrentPageState(Math.max(1, Math.min(page, paginatedData.totalPages)));
  }, [paginatedData.totalPages]);

  const setPageSize = useCallback((size: number) => {
    setPageSizeState(size);
    setCurrentPageState(1);
  }, []);

  const setSearchTerm = useCallback((term: string) => {
    setSearchTermState(term);
    setCurrentPageState(1);
  }, []);

  const toggleItemSelection = useCallback((id: string) => {
    setSelectedItemsState(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  }, []);

  const selectAllItems = useCallback(() => {
    if (selectedItems.length === paginatedData.items.length) {
      setSelectedItemsState([]);
    } else {
      setSelectedItemsState(paginatedData.items.map(item => item.id));
    }
  }, [selectedItems.length, paginatedData.items]);

  const clearSelection = useCallback(() => {
    setSelectedItemsState([]);
  }, []);

  const resetTable = useCallback(() => {
    setSortKeyState(initialSortKey || (Object.keys(data[0] || {})[0] as keyof T));
    setSortDirectionState(initialSortDirection);
    setCurrentPageState(1);
    setPageSizeState(initialPageSize);
    setSearchTermState('');
    setSelectedItemsState([]);
  }, [initialSortKey, initialSortDirection, initialPageSize, data]);

  return {
    sortKey,
    sortDirection,
    currentPage,
    pageSize,
    searchTerm,
    selectedItems,
    
    sortedData,
    paginatedData,
    
    setSortKey,
    setSortDirection,
    setCurrentPage,
    setPageSize,
    setSearchTerm,
    toggleItemSelection,
    selectAllItems,
    clearSelection,
    resetTable,
  };
}
