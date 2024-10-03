"use client";
import React, { useState } from "react";
import Modal from "@/components/global/Modal";
import { FloatingLabel, Button } from "flowbite-react";
import StaffAndPermissions from "@/components/settings/StaffAndPermissions";

function UsersAndPermissions() {
  const [open, setOpen] = useState(false);
  return (
    <main>
      <h1 className="text-[1.875rem] font-[700] leading-[2.8125rem]">
        Users and Permissions
      </h1>
      <h3 className="text-[1.25rem] font-[600]">Permissions</h3>
      <p className="text-[#6F6F6F] font-[500] text-[0.875rem]">
        Permissions Manage what users can see or do in your store.
      </p>
      <section className="mt-[1.5rem] bg-white shadow-md rounded-lg p-[1rem]">
        <h1 className="font-[700] text-[0.875rem]">Store Owner</h1>
        <h5 className="font-[500] text-[0.875rem] mt-[1.5rem]">
          Habib Nor Mohammed
        </h5>
        <p className="text-[0.75rem] text-[#6F6F6F]">
          Last login was Monday, December 11, 2023 10:53 AM GMT+5
        </p>
      </section>
      <section className="mt-[2.5rem] bg-white shadow-md rounded-lg p-[1rem]">
        <div className="flex justify-between">
          <h1 className="font-[700] text-[0.875rem]">Staff</h1>
          <button
            className="text-[#3669C9] text-[0.875rem] font-[500]"
            onClick={() => setOpen(true)}
          >
            Add Staff
          </button>
        </div>
      </section>
      <section className="bg-white">
        <StaffAndPermissions />
      </section>
      <Modal open={open} setOpen={setOpen} title="Edit Profile">
        <form className="grid grid-cols-1 lg:grid-cols-2 gap-[1rem]">
          <FloatingLabel variant="outlined" label="Full Name" />
          <FloatingLabel variant="outlined" label="Email Address" />
          <FloatingLabel variant="outlined" label="Phone Number" />
          <FloatingLabel variant="outlined" type="password" label="Password" />
          <FloatingLabel
            variant="outlined"
            type="password"
            label="Confirm Password"
          />

          <div className="lg:col-span-2 flex justify-end gap-[1rem]">
            <Button color="blue" outline onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button color="blue">Save</Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default UsersAndPermissions;
