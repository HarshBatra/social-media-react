/* eslint-disable react-hooks/exhaustive-deps */
import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../config/firebase";
import { Post as IPost } from "./main";

interface Props {
  post: IPost;
}

interface Like {
  likeId: string;
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesRef = collection(db, "likes"); //reference to the collection we made in firebase firestore database

  const likesDoc = query(likesRef, where("postId", "==", post.id)); //we're just making a query in our collection, we're specifying which collection we're talking about (Likes), and we're saying that we only wanna get the data where the postId is equal to the Id of the post we are currently in.

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };
  const addLike = async () => {
    //optimistic rendering
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  }; //we are first querying the specific like that we want to delete we're then getting the data from that like just to get the id of it and put it inside of this function doc because this function

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []); //adding empty array to useEffect to ensure that to only do this when the component is mounting and not when its updating

  return (
    <div>
      <div className="title">
        <h1> {post.title}</h1>
      </div>
      <div className="body">
        <p> {post.description} </p>
      </div>

      <div className="footer">
        <p> @{post.username} </p>
        <button onClick={hasUserLiked ? removeLike : addLike}>
          {hasUserLiked ? <>❤️</> : <>🤍</>}{" "}
        </button>
        {likes && <p> Likes: {likes?.length} </p>}
      </div>
    </div>
  );
};
