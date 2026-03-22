export const mockStudents = [
  { id: '2', name: 'Rahul Sharma', email: 'rahul@student.com', roomNumber: '204', mobile: '9876543210', parentMobile: '9876543211', address: 'Pune, Maharashtra', rentStatus: 'paid' as const, rentAmount: 5000 },
  { id: '3', name: 'Priya Patel', email: 'priya@student.com', roomNumber: '105', mobile: '9123456780', parentMobile: '9123456781', address: 'Ahmedabad, Gujarat', rentStatus: 'unpaid' as const, rentAmount: 5000 },
  { id: '4', name: 'Amit Kumar', email: 'amit@student.com', roomNumber: '312', mobile: '9988776655', parentMobile: '9988776656', address: 'Jaipur, Rajasthan', rentStatus: 'paid' as const, rentAmount: 4500 },
  { id: '5', name: 'Sneha Desai', email: 'sneha@student.com', roomNumber: '201', mobile: '9112233445', parentMobile: '9112233446', address: 'Mumbai, Maharashtra', rentStatus: 'unpaid' as const, rentAmount: 5000 },
  { id: '6', name: 'Vikram Singh', email: 'vikram@student.com', roomNumber: '308', mobile: '9556677889', parentMobile: '9556677880', address: 'Delhi', rentStatus: 'paid' as const, rentAmount: 4500 },
];

export const mockMenu = {
  date: new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
  breakfast: { time: '7:30 AM - 9:00 AM', items: ['Poha', 'Bread & Butter', 'Boiled Eggs', 'Tea / Coffee', 'Fresh Juice'] },
  lunch: { time: '12:30 PM - 2:00 PM', items: ['Dal Tadka', 'Jeera Rice', 'Roti', 'Mixed Veg Sabzi', 'Salad', 'Papad'] },
  dinner: { time: '7:30 PM - 9:30 PM', items: ['Paneer Butter Masala', 'Plain Rice', 'Naan', 'Raita', 'Gulab Jamun'] },
};

export const mockComplaints = [
  { id: '1', studentId: '2', studentName: 'Rahul Sharma', title: 'Water leakage in bathroom', description: 'There is constant water leakage from the bathroom tap.', status: 'pending' as const, date: '2026-03-18' },
  { id: '2', studentId: '3', studentName: 'Priya Patel', title: 'Fan not working', description: 'Ceiling fan in room 105 stopped working.', status: 'resolved' as const, date: '2026-03-15' },
  { id: '3', studentId: '5', studentName: 'Sneha Desai', title: 'WiFi connectivity issue', description: 'WiFi is very slow in room 201 since yesterday.', status: 'in-progress' as const, date: '2026-03-19' },
];

export const mockNotifications = [
  { id: '1', title: 'Rent Due Reminder', message: 'Monthly rent for March is due by 25th. Please pay on time to avoid late fees.', date: '2026-03-20', type: 'warning' as const },
  { id: '2', title: 'Water Tank Cleaning', message: 'Water supply will be interrupted on 22nd March from 10 AM to 2 PM for tank cleaning.', date: '2026-03-19', type: 'info' as const },
  { id: '3', title: 'New Menu Updated', message: 'The weekly menu has been updated. Check the menu section for details.', date: '2026-03-18', type: 'info' as const },
];

export const mockUpiId = 'hanumanthostel@upi';
