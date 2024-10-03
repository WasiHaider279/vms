export const columns = [
  { header: "ID", accessor: "id" },
  { header: "Name", accessor: "name" },
  { header: "Age", accessor: "age" },
  { header: "City", accessor: "city.name" },
  { header: "status", accessor: "status" },
  { header: "Address", accessor: "city.address" },
];

export const orderColumns = [
  { header: "ORDER ID", accessor: "orderId" },
  { header: "AMOUNT", accessor: "totals.total" },
  { header: "CUSTOMER NAME", accessor: "customer.name" },
  { header: "CUSTOMER PHONE", accessor: "customer.phone" },
  { header: "CUSTOMER EMAIL", accessor: "customer.email" },
  {
    header: "ITEMS",
    accessor: (items: any) => items?.lineitems?.length,
  },
  { header: "DATE", accessor: (items: any) => items?.createdAt?.slice(0, 10) },
  { header: "PAYMENT STATUS", accessor: "paymentStatus" },
  { header: "FULFILLMENT STATUS", accessor: "fulfilmentStatus" },
  { header: "DELIVERY STATUS", accessor: "deliveryStatus" },
  { header: "DELIVERY METHOD", accessor: "shippingMethod.type" },
  { header: "MARKET", accessor: "orderDetails.market" },
  { header: "CHANNEL", accessor: "orderDetails.channel" },
];

export const returnColumns = [
  { header: "ORDER ID", accessor: "_id" },
  { header: "Tracking ID", accessor: "totals.total" },
  { header: "CUSTOMER ID", accessor: "customer.name" },
  { header: "CUSTOMER Name", accessor: "customer.name" },
  { header: "CUSTOMER Phone", accessor: "customer.phone" },
  { header: "CUSTOMER EMAIL", accessor: "customer.email" },
  { header: "ITEMS", accessor: (items: any) => items.items?.length },
  { header: "DATE", accessor: (items: any) => items?.createdAt?.slice(0, 10) },
];

export const productColumns = [
  { header: "Name", accessor: "name" },
  { header: "Type", accessor: "type.name" },
  {
    header: "category",
    accessor: (items: any) =>
      items.categories.map((category: any) => category.name).join(", "),
  },
  { header: "variant count", accessor: "variants" },
  { header: "Total Quantity", accessor: "quantity" },
  { header: "starting price", accessor: "price" },
  // { header: "Total quantity", accessor: (items: any) => items.items?.length },
  {
    header: "status",
    accessor: "status",
  },
  // {
  //   header: " check",
  //   accessor: () => {
  //     return <button className="btn !text-xs">abcd</button>;
  //   },
  // },
];

export const LocationColumns = [
  { header: "NAME", accessor: "name" },
  { header: "COUNTRY", accessor: "country.name" },
  { header: "CITY", accessor: "city.name" },
  { header: "ADDRESS", accessor: "address" },
  { header: "STATUS", accessor: "status" },
  {
    header: "CREATED AT",
    accessor: (items: any) => items?.createdAt?.slice(0, 10),
  },
  {
    header: "UPDATED AT",
    accessor: (items: any) => items?.updatedAt?.slice(0, 10),
  },
];

export const BankingColumns = [
  { header: "NAME", accessor: "title" },
  { header: "BANK NAME", accessor: "name" },
  { header: "ACCOUNT NUMBER", accessor: "accountNumber" },
  { header: "IBAN", accessor: "iban" },
];

export const data = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    status: "Active",
    city: { name: "New York", address: "abc" },
    sortable: true,
  },
  {
    id: 2,
    name: "Jane Doe",
    age: 25,
    status: "Pending",
    city: { name: "New York", address: "abc" },
    sortable: false,
  },
  {
    id: 3,
    name: "Bob Smith",
    age: 35,
    status: "Paid",

    city: { name: "New York", address: "abc" },
    sortable: true,
  },
  {
    id: 4,
    name: "Alice Johnson",
    age: 28,
    status: "In progress",

    city: { name: "New York", address: "abc" },
    sortable: false,
  },
  {
    id: 5,
    name: "Charlie Brown",
    age: 32,
    status: "Active",

    city: { name: "New York", address: "abc" },
    sortable: true,
  },
  // Add more rows as needed
];
