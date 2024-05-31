import React, { useEffect, useState } from "react";
import Post from "./Post";
import { db, auth } from "../firebase";
// import { collection, getDocs } from "firebase/firestore";
import { collection, onSnapshot } from "firebase/firestore";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    ModalBody,
    ModalFooter,
    Stack,
} from "@chakra-ui/react";
import InstaModal from "./general/InstaModal";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";

const Main = () => {
    const [posts, setPosts] = useState([]);

    // sign up operations
    const [isOpenSignUpModal, setOpenSignUpModal] = useState(false);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    // sign in operations
    const [openSignIn, setOpenSignIn] = useState(false);

    // ==================== get data from database ====================
    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         const querySnapshot = await getDocs(collection(db, "posts"));
    //         const postsData = querySnapshot.docs.map((doc) => doc.data());
    //         setPosts(postsData);
    //     };

    //     fetchPosts();
    // }, []);

    useEffect(() => {
        // the advantage of using onSnapshot is whenever data is added in db, the feed updates
        const callPosts = onSnapshot(collection(db, "posts"), (snapshot) => {
            setPosts(
                snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
            );
        });

        // Cleanup subscription on unmount
        return () => {
            callPosts();
        };
    }, []);

    // **********************************************************************

    // ========================= sign up operations =========================

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                console.log("authUser=", authUser);
                setUser(authUser);
            } else {
                // User is signed out
                setUser(null);
            }
        });

        return () => {
            // perform some cleanup actions
            unSubscribe();
        };
    }, [user, userName]);

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((authUser) => {
                return updateProfile(authUser.user, {
                    displayName: userName,
                });
            })
            .catch((error) => alert(error.message));

        setOpenSignUpModal(false);
    };

    const signUpModalContent = () => {
        return (
            <form>
                <ModalBody>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="text"
                            placeholder="Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        variant="outline"
                        mr={3}
                        onClick={() => setOpenSignUpModal(false)}
                    >
                        Close
                    </Button>
                    <Button type="submit" colorScheme="blue" onClick={signUp}>
                        Sign Up
                    </Button>
                </ModalFooter>
            </form>
        );
    };
    // **********************************************************************

    // ========================= sign in operations =========================

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).catch((error) =>
            alert(error.message)
        );
        // .then((authUser) => {
        //     return updateProfile(authUser.user, {
        //         displayName: userName,
        //     });
        // })

        setOpenSignIn(false);
    };

    const signInModalContent = () => {
        return (
            <form>
                <ModalBody>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        variant="outline"
                        mr={3}
                        onClick={() => setOpenSignUpModal(false)}
                    >
                        Close
                    </Button>
                    <Button type="submit" colorScheme="blue" onClick={signIn}>
                        Sign In
                    </Button>
                </ModalFooter>
            </form>
        );
    };

    // **********************************************************************

    return (
        <div className="wrapper">
            <InstaModal
                isOpen={isOpenSignUpModal}
                onClose={() => setOpenSignUpModal(false)}
                modalTitle={
                    <div className="w-28">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3V603wWEsxxQTXxVVVmE2mzDdfNEP-EIZdvXCmmuIMQ&s"
                            alt="Instagram Font Logo White Png - Instagram White Text@pngkey.com"
                        />
                    </div>
                }
                modalContent={signUpModalContent()}
            />
            <InstaModal
                isOpen={openSignIn}
                onClose={() => setOpenSignIn(false)}
                modalTitle={
                    <div className="w-28">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3V603wWEsxxQTXxVVVmE2mzDdfNEP-EIZdvXCmmuIMQ&s"
                            alt="Instagram Font Logo White Png - Instagram White Text@pngkey.com"
                        />
                    </div>
                }
                modalContent={signInModalContent()}
            />
            <div className="w-40">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3V603wWEsxxQTXxVVVmE2mzDdfNEP-EIZdvXCmmuIMQ&s"
                    alt="Instagram Font Logo White Png - Instagram White Text@pngkey.com"
                />
            </div>

            {user ? (
                <Stack direction="row" spacing={4} align="center">
                    <Button
                        colorScheme="red"
                        variant="outline"
                        onClick={() => signOut(auth)}
                    >
                        Log Out
                    </Button>
                </Stack>
            ) : (
                <Stack direction="row" spacing={4} align="center">
                    <Button
                        colorScheme="teal"
                        variant="solid"
                        onClick={() => setOpenSignUpModal(true)}
                    >
                        Sign Up
                    </Button>
                    <Button
                        colorScheme="teal"
                        variant="outline"
                        onClick={() => setOpenSignIn(true)}
                    >
                        Log In
                    </Button>
                </Stack>
            )}
            <h1>Instagram Stories</h1>
            <div>
                {posts?.map(({ post, id }) => (
                    <Post
                        userName={post?.username}
                        caption={post?.caption}
                        imageUrl={post?.imageUrl}
                        key={`OII83_${id}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Main;
