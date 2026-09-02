import { useState, useEffect } from 'react';
import { mockCustomers, mockEmployees, mockOrders, mockMeasurements, mockLabourEntries, mockAttendance, mockSales, mockPurchases, mockLedger } from '../data/mockData';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export const initializeData = () => {
  if (!localStorage.getItem('customers')) localStorage.setItem('customers', JSON.stringify(mockCustomers));
  if (!localStorage.getItem('employees')) localStorage.setItem('employees', JSON.stringify(mockEmployees));
  if (!localStorage.getItem('orders')) localStorage.setItem('orders', JSON.stringify(mockOrders));
  if (!localStorage.getItem('measurements')) localStorage.setItem('measurements', JSON.stringify(mockMeasurements));
  if (!localStorage.getItem('labourEntries')) localStorage.setItem('labourEntries', JSON.stringify(mockLabourEntries));
  if (!localStorage.getItem('attendance')) localStorage.setItem('attendance', JSON.stringify(mockAttendance));
  if (!localStorage.getItem('sales')) localStorage.setItem('sales', JSON.stringify(mockSales));
  if (!localStorage.getItem('purchases')) localStorage.setItem('purchases', JSON.stringify(mockPurchases));
  if (!localStorage.getItem('ledger')) localStorage.setItem('ledger', JSON.stringify(mockLedger));
};
