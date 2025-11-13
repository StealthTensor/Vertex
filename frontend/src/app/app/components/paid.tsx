"use client";
import { getPaymentClient } from "@/utils/getCookieClient";
import React from "react";

const Paid = () => {
  const data = getPaymentClient();
  if (!data) return;
  const date = new Date(data.created_at * 1000);
  const time =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  return (
    <div className="w-full h-full items-center  flex flex-col ">
      <div className="max-w-sm lg:mt-40 mt-24 w-full text-center text-xl flex flex-col items-center  p-4  ">
        <div className="w-full text-white/50 ">
          <h1>Transaction Info</h1>
        </div>
        <h2 className="text-sm text-white/50 w-full text-start flex flex-col mt-5 justify-center border-2 border-dotted bg-background border-white/10 rounded-lg p-4">
          <ul className="flex flex-col gap-5">
            <li className="flex justify-between">
              <p>Mail ID</p>{" "}
              <span className="text-white ">{data?.email}</span>
            </li>
            <li className="flex justify-between">
              <p>Phone No</p>{" "}
              <span className="text-white ">{data?.payload.contact}</span>
            </li>
            <li className="flex justify-between">
              <p>Amount</p>{" "}
              <span className="text-white ">
                ₹ {(data?.payload.amount / 100).toFixed(2)} / M
              </span>
            </li>
            <li className="flex justify-between ">
              <p>Method</p>{" "}
              <span className="uppercase text-white ">
                {data?.payload.method}
              </span>
            </li>
            <li className="flex justify-between">
              <p>Paid on</p> <span className="text-white ">{time}</span>
            </li>
            <li className="flex justify-between">
              <p>Valid Till</p>
              <span className="text-white ">
                {(() => {
                  const expiryDate = new Date(date.getTime());
                  expiryDate.setDate(expiryDate.getDate() + 30);
                  return (
                    expiryDate.getDate() +
                    "/" +
                    (expiryDate.getMonth() + 1) +
                    "/" +
                    expiryDate.getFullYear()
                  );
                })()}
              </span>
            </li>
          </ul>
        </h2>
      </div>
    </div>
  );
};

export default Paid;
