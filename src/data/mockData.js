export const mockCustomers = [
  { id: 'C001', name: 'Anjali Das', phone: '9876543210', address: 'Howrah, West Bengal', totalOrders: 5, totalAmount: 12500, paid: 10000, due: 2500 },
  { id: 'C002', name: 'Priya Sharma', phone: '9876543211', address: 'Kolkata, West Bengal', totalOrders: 2, totalAmount: 4500, paid: 4500, due: 0 },
  { id: 'C003', name: 'Rina Ghosh', phone: '9876543212', address: 'Salt Lake, Kolkata', totalOrders: 1, totalAmount: 1500, paid: 500, due: 1000 },
  { id: 'C004', name: 'Moumita Roy', phone: '9876543213', address: 'Ballygunge, Kolkata', totalOrders: 8, totalAmount: 25000, paid: 20000, due: 5000 },
  { id: 'C005', name: 'Sneha Singh', phone: '9876543214', address: 'New Town, Kolkata', totalOrders: 3, totalAmount: 6000, paid: 6000, due: 0 },
];

export const mockEmployees = [
  { id: 'E001', name: 'Rina', phone: '9000000001', department: 'Embroidery', salaryType: 'Monthly', basicSalary: 12000 },
  { id: 'E002', name: 'Sima', phone: '9000000002', department: 'Stitching', salaryType: 'Daily', basicSalary: 400 },
  { id: 'E003', name: 'Puja', phone: '9000000003', department: 'Finishing', salaryType: 'Monthly', basicSalary: 10000 },
  { id: 'E004', name: 'Ananya', phone: '9000000004', department: 'Cutting', salaryType: 'Monthly', basicSalary: 15000 },
  { id: 'E005', name: 'Kajal', phone: '9000000005', department: 'Office', salaryType: 'Monthly', basicSalary: 14000 },
];

export const mockOrders = [
  { id: 'ST-10025', date: '2023-10-01', deliveryDate: '2023-10-10', customerId: 'C001', customerName: 'Anjali Das', items: [{ name: 'Blouse', workType: 'Embroidery', qty: 2 }], amount: 3000, advance: 1000, due: 2000, productionStatus: 'In Progress', paymentStatus: 'Partial' },
  { id: 'ST-10026', date: '2023-10-02', deliveryDate: '2023-10-12', customerId: 'C002', customerName: 'Priya Sharma', items: [{ name: 'Salwar', workType: 'Stitching', qty: 1 }], amount: 1500, advance: 1500, due: 0, productionStatus: 'Ready', paymentStatus: 'Paid' },
  { id: 'ST-10027', date: '2023-10-03', deliveryDate: '2023-10-15', customerId: 'C003', customerName: 'Rina Ghosh', items: [{ name: 'Lehenga', workType: 'Ari', qty: 1 }], amount: 5000, advance: 2000, due: 3000, productionStatus: 'New', paymentStatus: 'Partial' },
];

export const mockMeasurements = [
  { customerId: 'C001', customerName: 'Anjali Das', date: '2023-09-15', length: 38, hbl: 14, chest: 36, waist: 30, shoulder: 14, sleeve: 5, fNeck: 6, bNeck: 8 },
];

export const mockLabourEntries = [
  { id: 'L001', date: '2023-10-05', orderNo: 'ST-10025', item: 'Blouse', workType: 'Embroidery', labourName: 'Rina', qty: 2, rate: 150, amount: 300 },
  { id: 'L002', date: '2023-10-06', orderNo: 'ST-10026', item: 'Salwar', workType: 'Stitching', labourName: 'Sima', qty: 1, rate: 200, amount: 200 },
];

export const mockAttendance = [
  { date: '2023-10-01', employeeId: 'E001', employeeName: 'Rina', department: 'Embroidery', status: 'Present' },
  { date: '2023-10-01', employeeId: 'E002', employeeName: 'Sima', department: 'Stitching', status: 'Present' },
  { date: '2023-10-01', employeeId: 'E003', employeeName: 'Puja', department: 'Finishing', status: 'Absent' },
];

export const mockSales = [
  { id: 'INV-001', date: '2023-10-01', customerName: 'Anjali Das', total: 3000, paid: 1000, due: 2000, status: 'Partial' },
];

export const mockPurchases = [
  { id: 'PO-001', date: '2023-10-02', supplier: 'ABC Fabrics', item: 'Silk Thread', qty: 50, rate: 20, total: 1000, paid: 1000, due: 0, status: 'Paid' },
];

export const mockLedger = [
  { date: '2023-10-01', reference: 'ST-10025', description: 'Advance Received', debit: 1000, credit: 0, balance: 1000 },
  { date: '2023-10-02', reference: 'PO-001', description: 'Material Purchase', debit: 0, credit: 1000, balance: 0 },
];
