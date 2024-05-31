import { Avatar, WrapItem } from "@chakra-ui/react";
import React from "react";

const Post = ({ userName, caption, imageUrl }) => {
  return (
    <div className="border-b border-gray-800 py-4">
      <div className="flex items-center gap-2 mb-2">
        <WrapItem>
          <Avatar
            size="sm"
            name={userName}
            src="https://bit.ly/broken-link"
            className="text-white bg-gray-50"
            bg="gray"
            color="gray.50"
          />
        </WrapItem>
        <p className="text-sm">{userName}</p>
      </div>
      <div className="object-contain border-y-gray-800">
        <img src={imageUrl} alt="post_image" />
      </div>
      <div className="flex mt-2">
        <p className="font-bold">{userName}</p>&nbsp;<span>{caption}</span>
      </div>
    </div>
  );
};

export default Post;
