import Container from "@/components/global/Container";
import Table from "@/components/global/Table";
import { columns, data } from "@/utils/data";

interface Data {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Users {
  items: Data[];
  totalPages: number;
  totalItems: number;
}

const users: Users = {
  items: [
    {
      id: 1,
      name: "Umair",
      email: "2323",
      phone: "2323",
      password: "2323",
      status: "active",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    },
    {
      id: 2,
      name: "Uzair",
      email: "2323",
      phone: "2323",
      password: "2323",
      status: "active",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    },
  ],
  totalPages: 1,
  totalItems: 10,
};

const UsersPage = () => {
  return (
    <Container title={"Users"}>
      <Table
        filters={[
          // Example text input
          {
            type: "date",
            placeholder: "Enter a name",
          },
          // Example text input
          {
            type: "select",
            // options: ["active", "pending", "cancelled"],
            placeholder: "Enter a name",
          },
          {
            type: "text",
            placeholder: " amount",
          },
        ]}
        checkbox={false}
        columns={columns}
        data={data}
        pagination={true}
        isFetching={false}
      />
    </Container>
  );
};

export default UsersPage;
