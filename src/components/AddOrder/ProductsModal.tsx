import React from "react";
import Table from "../global/Table";

type Props = { getSelectedProducts: Function };

const ProductsModal = ({ getSelectedProducts }: Props) => {
  const productsList = [
    {
      id: 123456789,
      title: "Sample Product",
      body_html: "<p>This is a sample product description.</p>",
      vendor: "Dummy Vendor",
      product_type: "Dummy Type",
      created_at: "2023-01-01T12:00:00Z",
      handle: "sample-product",
      updated_at: "2023-12-12T10:30:00Z",
      published_at: "2023-01-02T08:00:00Z",
      template_suffix: null,
      published_scope: "web",
      tags: "tag1, tag2, tag3",
      variants: [
        {
          id: 987654321,
          product_id: 123456789,
          title: "Default Title",
          sku: "SKU123",
          position: 1,
          product_type: "Dummy Type",
          grams: 200,
          inventory_policy: "deny",
          fulfillment_service: "manual",
          inventory_management: "shopify",
          option1: "Default",
          vendor: "Dummy Vendor",
          option2: null,
          option3: null,
          created_at: "2023-01-01T12:00:00Z",
          updated_at: "2023-12-12T10:30:00Z",
          taxable: true,
          barcode: "123456789",
          inventory_quantity: 50,
          weight: 0.2,
          weight_unit: "kg",
          price: "19.99",
          compare_at_price: "29.99",
          requires_shipping: true,
        },
      ],
      images: [
        {
          id: 111111111,
          product_id: 123456789,
          position: 1,
          created_at: "2023-01-01T12:00:00Z",
          updated_at: "2023-01-01T12:00:00Z",
          alt: "Sample Product Image",
          width: 800,
          height: 800,
          src: "https://example.com/sample-product-image.jpg",
          variant_ids: [],
        },
      ],
    },
  ];
  return (
    <div>
      {/* @ts-ignore */}
      <Table>
        {productsList.map((data) => (
          <>
            <tr key={data.id}>
              <td>{data.title}</td>
              {/* <td>{data.vendor}</td>
              <td>{data.product_type}</td>
              <td>{data.variants[0].price}</td>
              <td>{data.variants[0].inventory_quantity}</td> */}
            </tr>
            {data.variants.map((item, index) => (
              <tr key={item.id} className="">
                <td
                  onClick={() => {
                    getSelectedProducts(item?.id);
                  }}
                  className=""
                >
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.vendor}</td>
                <td>{item.product_type}</td>
                <td>{item.price}</td>
                <td>{item.inventory_quantity}</td>
              </tr>
            ))}
          </>
        ))}
      </Table>
    </div>
  );
};

export default ProductsModal;
