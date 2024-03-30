"use client";
import GlobalApi from "@/app/Utils/GlobalApi";
import { CircleUserRound } from "lucide-react";
import React, { useState, useEffect } from "react";

function Profilepage() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const jwt = token.jwt;
      getData(jwt);
    }
  }, []);

  const getData = async (jwt) => {
    try {
      const res = await GlobalApi.getProfile(jwt);
      setProfileData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(profileData);

  return (
    <div className="h-full w-full">
      <h2 className="text-3xl font-semibold text-center bg-primary text-white py-3">
        Profile
      </h2>
      {profileData && (
        <div className="mt-5 flex justify-center items-center">
          <div className="flex flex-col items-center md:w-[30%] gap-y-5 p-4 md:py-10 md:px-6 border border-black shadow-lg ">
            <CircleUserRound
              className="bg-green-100
            p-2 rounded-full cursor-pointer
             text-primary h-24 w-24"
            />
            <div className="font-normal w-full">
              <p>
                Username :{" "}
                <span className="font-light py-4 ">{profileData.username}</span>
              </p>
              <p>
                Email :{" "}
                <span className="font-light py-4 ">{profileData.email}</span>
              </p>
              <p>
                CreatedAt :{" "}
                <span className="font-light py-4 ">
                  {profileData.createdAt}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profilepage;
