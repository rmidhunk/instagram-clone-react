import { Button, Input, Progress } from "@chakra-ui/react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const PostUpload = ({ userName }) => {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState("");

    const handleChange = (e) => {
        if (e.target.files[0]) {
            console.log(
                "e.target.files= ",
                e.target.files,
                "e.target.files[0]= ",
                e.target.files[0]
            );
            setImage(e.target.files[0]);
        }
    };
    const handleUpload = () => {
        const storageRef = ref(storage, `images/${image.name}`);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        console.log("its default case in upload");
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log("image upload error", error);
                alert(error.message);
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then(
                    async (downloadURL) => {
                        await addDoc(collection(db, "posts"), {
                            timestamp: serverTimestamp(),
                            username: userName,
                            caption: caption,
                            imageUrl: downloadURL,
                        });
                        console.log("File available at", downloadURL);
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    }
                );
            }
        );
    };

    return (
        <div>
            <Progress hasStripe value={progress} colorScheme="green" />
            <div className="flex items-center">
                <Input
                    type="text"
                    size="sm"
                    placeholder="Enter your caption..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                />
                <Input
                    type="file"
                    size="sm"
                    variant="unflushed"
                    name=""
                    id=""
                    value={image}
                    onChange={handleChange}
                />
                {/* <input
                    type="file"
                    size="sm"
                    variant="unflushed"
                    name=""
                    id=""
                    onChange={(e) => handleChange(e)}
                /> */}
            </div>
            <Button colorScheme="blue" onClick={handleUpload}>
                Upload
            </Button>
        </div>
    );
};

export default PostUpload;
