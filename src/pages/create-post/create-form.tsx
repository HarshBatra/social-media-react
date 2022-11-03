import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { auth } from "../../config/firebase"; //for accessing the info about the user and passing it to the firestore db.
import { useAuthState } from "react-firebase-hooks/auth"; //this library allows us to use pre-made hooks to facilitate using Firebase.
import { useNavigate } from "react-router-dom";

interface CreateFormData {
  title: string;
  description: string;
}

const CreateForm = () => {
  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title."),
    description: yup.string().required("You must add a description."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts"); //reference to the collection we made in firebase sirestore database

  const onCreatePost = async (data: CreateFormData) => {
    // console.log(data);
    await addDoc(postsRef, {
      // title: data.title,
      // description: data.description,
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder="Title..." {...register("title")} />
      <p style={{ color: "red" }}>{errors.title?.message}</p>
      <textarea placeholder="Description..." {...register("description")} />
      <p style={{ color: "red" }}>{errors.description?.message}</p>
      <input type="submit" />
    </form>
  );
};

export default CreateForm;
