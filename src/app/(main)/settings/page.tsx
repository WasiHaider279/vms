"use client";
import React, { useState } from "react";

import {
  useGetCurrentUserQuery,
  useReverifyMutation,
} from "@/redux/services/authApi";
import { confirmation, failure, success } from "@/utils/notifications";
import { removeAuthToken } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";

import { MdCheck } from "react-icons/md";
import { Button, Checkbox } from "flowbite-react";
import Container from "@/components/global/Container";
import Loader from "@/components/global/Loader";

const Settings = () => {
  const { data, isLoading } = useGetCurrentUserQuery({});
  const [reverify, { isLoading: isReverifying }] = useReverifyMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const user = data?.data;
  const reason = user?.reason;

  const signout = () => {
    dispatch(removeAuthToken());
    router.push("/signin");
  };

  const onSubmit = () => {
    confirmation(
      "",
      "Confirm",
      "You want to resend for evaluation? You will be logged out after this and would not be able to make any new changes."
    ).then((result) => {
      if (result.isConfirmed) {
        reverify({})
          .unwrap()
          .then((res) => {
            signout();
            success(res?.data?.message);
          })
          .catch((err) => failure(err?.data?.message || "Server Error"));
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-5 justify-center items-center">
      <Container className="w-[30rem] -mt-10">
        <h1 className="text-red-600 text-center">
          Your account is currently <span className="font-bold">REJECTED</span>
        </h1>
      </Container>
      <Container className="w-full" title={"Reason"}>
        {isLoading ? (
          Array(15)
            .fill(0)
            .map((_item, index) => (
              <div
                key={index}
                className={`w-full bg-accent h-[10px] animate-pulse`}
              />
            ))
        ) : (
          <p>{reason}</p>
        )}
      </Container>
      <div className="w-full flex gap-5 items-center">
        <Checkbox checked={checked} onClick={() => setChecked(!checked)} />
        <p className="w-full text-start">
          I have successfully updated my account, aligning it with the
          compelling reasons outlined above.
        </p>
      </div>
      <Button
        color="blue"
        onClick={!checked ? () => {} : onSubmit}
        disabled={!checked}
      >
        {isReverifying ? (
          <Loader h={"20px"} w={"20px"} color="white" />
        ) : (
          <>
            <MdCheck className="mr-1 h-5 w-5" />
            Resend For Evaluation
          </>
        )}
      </Button>
    </div>
  );
};

export default Settings;
