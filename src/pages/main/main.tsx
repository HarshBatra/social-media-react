/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-redeclare */
import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Post } from "./post";

export interface Post {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

const main = () => {
  const [postsList, setPostsList] = useState<Post[] | null>(null); //array of Post
  const postsRef = collection(db, "posts"); //reference to the collection we made in firebase firestore database

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 w-full justify-center items-center align-middle py-40 px-10">
      {postsList?.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

export default main;
