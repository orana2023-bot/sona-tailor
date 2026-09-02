import React from 'react';
import { DataTable, StatusBadge } from '../components/ui';
import { useLocalStorage } from '../utils/localStorage';
import { Link, Routes, Route, useLocation } from 'react-router-dom';

function EmployeeList() {
  const [employees] = useLocalStorage('employees', []);
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Department', accessor: 'department' },
    { header: 'Type', accessor: 'salaryType' },
    { header: 'Basic Salary', render: row => `₹${row.basicSalary}` }
  ];
  return <div className="bg-white rounded-xl shadow-sm border border-gray-100"><DataTable columns={columns} data={employees} /></div>;
}

function Attendance() {
  const [attendance] = useLocalStorage('attendance', []);
  const columns = [
    { header: 'Date', accessor: 'date' },
    { header: 'Employee', accessor: 'employeeName' },
    { header: 'Department', accessor: 'department' },
    { header: 'Status', render: row => <StatusBadge status={row.status} /> }
  ];
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100"><button className="bg-indigo-600 text-white px-3 py-1 rounded">Mark Present All</button></div>
      <DataTable columns={columns} data={attendance} />
    </div>
  );
}

function Salary() {
  const [employees] = useLocalStorage('employees', []);
  const columns = [
    { header: 'Employee', accessor: 'name' },
    { header: 'Basic', render: row => `₹${row.basicSalary}` },
    { header: 'Working Days', render: () => '26' },
    { header: 'Net Salary', render: row => `₹${row.basicSalary}` },
    { header: 'Status', render: () => <StatusBadge status="Pending" /> }
  ];
  return <div className="bg-white rounded-xl shadow-sm border border-gray-100"><DataTable columns={columns} data={employees} /></div>;
}

export default function Employees() {
  const location = useLocation();
  const getTabClass = (path) => {
    const isMatch = path === '' ? location.pathname === '/employees' || location.pathname === '/employees/' : location.pathname.includes(path);
    return `py-2 px-4 border-b-2 font-medium text-sm ${isMatch ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Employee Management</h2>
      </div>

      <div className="flex space-x-4 border-b border-gray-200">
        <Link to="/employees" className={getTabClass('')}>Employees</Link>
        <Link to="/employees/attendance" className={getTabClass('attendance')}>Attendance</Link>
        <Link to="/employees/salary" className={getTabClass('salary')}>Salary</Link>
      </div>

      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/salary" element={<Salary />} />
      </Routes>
    </div>
  );
}
