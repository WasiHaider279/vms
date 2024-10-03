"use client"
import React from 'react';

const customers = [
    {
        name: 'John Doe',
        address: '123 Main St',
        email: 'john.doe@example.com',
        phone: '555-1234',
        totalOrders: 10,
    },
    {
        name: 'Jane Smith',
        address: '456 Elm St',
        email: 'jane.smith@example.com',
        phone: '555-5678',
        totalOrders: 5,
    },
    {
        name: 'Mike Johnson',
        address: '789 Oak St',
        email: 'mike.johnson@example.com',
        phone: '555-9012',
        totalOrders: 3,
    },
    {
        name: 'Sarah Williams',
        address: '321 Pine St',
        email: 'sarah.williams@example.com',
        phone: '555-3456',
        totalOrders: 8,
    },

   
];

const CustomerPage: React.FC = () => {
    const tableHeaders = ['Name', 'Address', 'Email', 'Phone', 'Total Orders'];

    return (
        
        
        <div className="container mx-auto">
             <h1 className="font-bold text-2xl mb-4">Customers</h1>
            <table className="table-auto w-full">
                
            <thead>
                <tr>
                    {tableHeaders.map((header, index) => (
                        <th key={index} className="px-4 py-2 bg-gray-200 text-gray-600">{header}</th>
                    ))}
                </tr>
            </thead>
                <tbody>
                    {customers.map((customer, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{customer.name}</td>
                            <td className="border px-4 py-2">{customer.address}</td>
                            <td className="border px-4 py-2">{customer.email}</td>
                            <td className="border px-4 py-2">{customer.phone}</td>
                            <td className="border px-4 py-2">{customer.totalOrders}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerPage;
