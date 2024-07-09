"use client";
import React, { useEffect, useState } from "react";
import FetchApi from "@/utils/FetchApi";
import { IoVideocamSharp } from "react-icons/io5";
import { MdOutlinePaid } from "react-icons/md";
import Link from 'next/link';



const Homepage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await FetchApi();
      setData(result);
      console.log(result);
    };

    fetchData();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <img src={data.navbar_icon} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="container mx-auto    ">
          <img
            src={data.poster_thumbnail}
            className="   ml-4  rounded-lg shadow-lg object-cover object-center lg:h-96 md:h-44 lg:ml-20 lg:mr-auto lg:mt-12 lg:rounded-lg lg:shadow-2xl lg:object-cover lg:object-center"
            alt="Poster Thumbnail"
          />
        </div>

        <div className="container flex flex-col ml-56 border border-gray-600 h-96 w-72 rounded-lg lg:h-96 md:h-44 mr-20">
         
          <div className="flex flex-col  ">

            <h1 className="mx-5 text-xl font-bold text-gray-800 my-4">
              KonfHub Frontend Evaluation Task
            </h1>
            <div className="mx-5 flex gap-20">
              
              <div className="flex items-center ">
              <IoVideocamSharp  />
              <span className="ml-1">Online</span>
              </div>

              <div className="flex items-center">
              <MdOutlinePaid />
              <span className="ml-1">Paid</span>
              </div>
           
            
            </div>

            
              <h2 className=" mx-5 text-sm font-semibold mt-3 ">Event Live Link: <Link href="">Open Streaming Website</Link> </h2>
            
           
            <div className="bg-slate-300 h-7 w-4 mt-4">
              <button></button>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
