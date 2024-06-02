import { Avatar, Button, Input, WrapItem } from "@chakra-ui/react";
import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const Post = ({ postId, user, userName, caption, imageUrl }) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    // ==================== getting comments from firestore ====================

    useEffect(() => {
        const postDocRef = doc(db, "posts", postId);
        const commentsCollectionRef = query(
            collection(postDocRef, "comments"),
            orderBy("timestamp", "desc")
        );

        const unsubscribe = onSnapshot(commentsCollectionRef, (snapshot) => {
            setComments(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    comment: doc.data(),
                }))
            );
        });

        // Cleanup subscription on unmount
        return () => {
            unsubscribe();
        };
    }, [postId]);

    // **********************************************************************

    // ==================== posting comments to firestore ====================

    const postComment = async (e) => {
        e.preventDefault();
        const postDocRef = doc(db, "posts", postId);
        const commentRef = collection(postDocRef, "comments");

        // Add a new document with a generated id.
        const docRef = await addDoc(commentRef, {
            text: comment,
            username: user.displayName,
            timestamp: serverTimestamp(),
        });
        setComment("");
        console.log("Document written: ", docRef);
    };

    return (
        <div className="border-b border-gray-800 py-4 w-4/5 mx-auto">
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
            <div className="w-96 mx-auto border-y-gray-800">
                <img
                    src={imageUrl}
                    alt="post_image"
                    className="object-contain"
                />
            </div>
            <div className="flex mt-2">
                <p className="font-bold">{userName}</p>&nbsp;
                <span>{caption}</span>
            </div>
            {comments?.map((item) => (
                <div className="flex mt-2" key={item?.id}>
                    <p className="font-bold">{item.comment.username}</p>&nbsp;
                    <span>{item.comment.text}</span>
                </div>
            ))}
            {user ? (
                <div className="flex mt-4">
                    <Input
                        type="text"
                        className="flex-1"
                        placeholder={`Add a comment for ${userName}...`}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={!comment}
                        onClick={postComment}
                        className="flex items-center justify-center bg-[#3182ce] rounded outline-2 outline-transparent px-4 font-bold"
                    >
                        Post
                    </button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Post;
