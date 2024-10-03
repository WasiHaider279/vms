"use client"
import React from 'react';

const vendors = [
    {
        id: 1,
        name: 'John Doe',
        storeName: 'ABC Store',
        storeAddress: '123 Main St',
        city: 'New York',
        country: 'USA',
    },
    {
        id: 2,
        name: 'Jane Smith',
        storeName: 'XYZ Store',
        storeAddress: '456 Elm St',
        city: 'Los Angeles',
        country: 'USA',
    },
    {
        id: 3,
        name: 'Mike Johnson',
        storeName: 'PQR Store',
        storeAddress: '789 Oak St',
        city: 'Chicago',
        country: 'USA',
    },
    {
        id: 4,
        name: 'Sarah Williams',
        storeName: 'LMN Store',
        storeAddress: '321 Pine St',
        city: 'Miami',
        country: 'USA',
    },
];

const VendorPage: React.FC = () => {
    const tableHeaders = ['ID', 'Name', 'Store Name', 'Store Address', 'City', 'Country'];

    return (
        <div className="container mx-auto">
            <h1 className="font-bold text-2xl mb-4">Vendors</h1>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        {tableHeaders.map((header, index) => (
                            <th key={index} className="px-4 py-2 bg-gray-200 text-gray-600">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {vendors.map((vendor) => (
                        <tr key={vendor.id}>
                            <td className="border px-4 py-2">{vendor.id}</td>
                            <td className="border px-4 py-2">{vendor.name}</td>
                            <td className="border px-4 py-2">{vendor.storeName}</td>
                            <td className="border px-4 py-2">{vendor.storeAddress}</td>
                            <td className="border px-4 py-2">{vendor.city}</td>
                            <td className="border px-4 py-2">{vendor.country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VendorPage;
