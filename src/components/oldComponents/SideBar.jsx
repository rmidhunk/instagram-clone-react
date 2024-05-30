import React from "react";
import {
  FaHeart,
  FaHome,
  FaInternetExplorer,
  FaMailBulk,
  FaMobile,
  FaPlusSquare,
  FaSearch,
} from "react-icons/fa";

const SideBar = () => {
  return (
    <div className="w-2/6">
      <div className="w-40 mb-16">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3V603wWEsxxQTXxVVVmE2mzDdfNEP-EIZdvXCmmuIMQ&s"
          alt="Instagram Font Logo White Png - Instagram White Text@pngkey.com"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-1">
          <div className="">
            <FaHome className="fill-white" />
          </div>
          <p className="text-base font-bold">Home</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="">
            <FaSearch className="fill-white" />
          </div>
          <p className="text-base font-bold">Search</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="">
            <FaInternetExplorer className="fill-white" />
          </div>
          <p className="text-base font-bold">Explore</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="">
            <FaMobile className="fill-white" />
          </div>
          <p className="text-base font-bold">Reels</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="">
            <FaMailBulk className="fill-white" />
          </div>
          <p className="text-base font-bold">Messages</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="">
            <FaHeart className="fill-white" />
          </div>
          <p className="text-base font-bold">Notifications</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="">
            <FaPlusSquare className="fill-white" />
          </div>
          <p className="text-base font-bold">Create</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
