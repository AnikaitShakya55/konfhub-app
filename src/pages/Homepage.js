"use client";
import React, { useEffect, useState } from "react";
import FetchApi from "@/utils/FetchApi";
import { IoVideocamSharp } from "react-icons/io5";
import { MdOutlinePaid } from "react-icons/md";
import Link from "next/link";

const Homepage = () => {
  const [data, setData] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await FetchApi();
      setData(result);

      // Calculate time remaining until event starts
      const startDate = new Date(
        result.start_date + "T" + result.start_time + "Z"
      );

      // Update time remaining every second
      const interval = setInterval(() => {
        const newCurrentTime = new Date();
        const newDifference = startDate.getTime() - newCurrentTime.getTime();
        setTimeRemaining(newDifference);
      }, 1000);

      return () => clearInterval(interval);
    };

    fetchData();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  // Function to format milliseconds into readable time
  const formatTime = (milliseconds) => {
    if (milliseconds <= 0) {
      return "Event has started";
    }

    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    return `${days}D:  ${hours}H: ${minutes}M: ${seconds}S`;
  };

  return (
    <div>
      <div>
        <img src={data.navbar_icon} alt="Navbar Icon" />
      </div>

      <div className="container grid grid-cols-2 size-auto gap-4">
        <div className="container ml-16 flex flex-col justify-start">
          <img
            src={data.poster_thumbnail}
            className="rounded-lg shadow-lg object-cover object-center lg:h-96 md:h-44 lg:ml-20 lg:mr-auto lg:mt-12 lg:rounded-lg lg:shadow-2xl lg:object-cover lg:object-center"
            alt="Poster Thumbnail"
          />
        </div>

        <div className="container flex flex-col mt-11 ml-56 border border-gray-600 h-72 w-72 rounded-lg lg:h-96 md:h-44 mr-20">
          <div className="flex flex-col">
            <h1 className="mx-5 text-xl font-bold text-gray-800 my-4">
              {data.name}
            </h1>
            <div className="mx-5 flex gap-20">
              <div className="flex items-center">
                <IoVideocamSharp />
                <span className="ml-1">Online</span>
              </div>
              <div className="flex items-center">
                <MdOutlinePaid />
                <span className="ml-1">Paid</span>
              </div>
            </div>

            <h2 className="mx-5 text-sm font-semibold mt-3">
              Event Live Link:{" "}
              <Link href={data.event_live_link} className="ml-2 text-blue-500">
                Open Streaming Website
              </Link>
            </h2>

            <h2 className="mx-5 text-sm font-semibold mt-1">
              Date:{" "}
              <span className="ml-2 font-light">
                {data.start_date} {data.start_time} - {data.end_date}{" "}
                {data.end_time} IST
              </span>
            </h2>

            <h2 className="mx-5 text-sm font-semibold mt-3">EVENT STARTS IN</h2>
            <span className="mx-5 mt-1 text-xl font-extrabold ">
              {formatTime(timeRemaining)}
            </span>

            <div className="flex justify-center mt-4">
              <div className="bg-slate-900 h-8 w-60 flex justify-center rounded-sm ">
                <button className="text-sm text-yellow-50">Buy Now</button>
              </div>
            </div>

            <div className="flex justify-center mt-2">
              <div className="bg-slate-400 h-8 w-60 flex justify-center rounded-sm ">
                <button className="text-sm text-yellow-50">
                  <Link href={data.event_live_link}>Offical Website </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
