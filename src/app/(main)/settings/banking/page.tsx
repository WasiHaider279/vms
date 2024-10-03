"use client";
import React, { useState } from "react";
import { useGetBankQuery } from "@/redux/services/bankApi";
import Loader from "@/components/global/Loader";
import { MdAdd } from "react-icons/md";
import Table from "@/components/global/Table";
import { BankingColumns } from "@/utils/data";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

const SettingsBankPage = () => {
  const router = useRouter();

  // db calls
  const { data: bank, isLoading, isFetching } = useGetBankQuery({});

  if (isLoading) return <Loader />;
  return (
    <main className="w-full">
      <section className="flex justify-between items-center mb-5">
        <h1 className="text-[2.25rem] font-[700]">Banking</h1>
        <Button
          color="blue"
          onClick={() => router.push("/settings/banking/add")}
        >
          <MdAdd className="mr-1 h-5 w-5" />
          Add
        </Button>
      </section>
      {bank && (
        <Table
          checkbox={false}
          columns={BankingColumns}
          data={bank?.data?.items}
          pagination={false}
          isFetching={isFetching}
          actions={[{ type: "edit", url: "/settings/banking" }]}
        />
      )}
    </main>
  );
};

export default SettingsBankPage;
