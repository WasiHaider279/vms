import Container from "@/components/global/Container";
import React from "react";

const RefundOrder = () => {
  return (
    <div>
      <Container title="Refund">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-4">
            <img className="w-10 h-10" src="/assets/avatar.png" />
            <div className="text-xs">
              <p>title</p>
              <p>Price</p>
              <p>Quantity</p>
            </div>
          </div>
          <input type="number" />
          <p>Price here</p>
        </div>
      </Container>
      <Container className="mt-10" title="Summary">
        <div className="rounded-lg w-full ">
          <div className="flex justify-between">
            <div>
              <p>Subtotal</p>
              <p>Add discount</p>
              <p>Add shipping</p>
              <p>Estimated Tax</p>
            </div>
            <div>
              <p>4800</p>
              <p>0.00</p>
              <p>0.00</p>
              <p>768</p>
              <p>5568</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RefundOrder;
