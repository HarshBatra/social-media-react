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
    <div className="flex justify-center items-center mt-20 flex-col m-10 md:mx-60 border border-slate-600 rounded-lg p-5">
      <form onSubmit={handleSubmit(onCreatePost)}>
        <h1 className="font-extrabold mb-4 text-2xl flex items-center justify-center text-center text-slate-600">
          Create Post!
        </h1>
        <input
          className="flex mb-4  border border-slate-600 rounded-lg p-2 w-full"
          placeholder="Title..."
          {...register("title")}
        />
        <p className="" style={{ color: "red" }}>
          {errors.title?.message}
        </p>
        <textarea
          className="flex mb-4  border border-slate-600 rounded-lg p-2 w-full"
          placeholder="Description..."
          {...register("description")}
        />
        <p className="" style={{ color: "red" }}>
          {errors.description?.message}
        </p>
        <input
          className="flex mb-4 w-full tracking-wider font-bold bg-slate-600 text-slate-200 rounded-lg p-2 items-center justify-center text-center"
          type="submit"
        />
      </form>
    </div>
  );
};

export default CreateForm;
