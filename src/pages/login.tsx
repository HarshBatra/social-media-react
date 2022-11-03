import React from "react";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const login = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  async function signInWithGoogle() {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/"); //redirects to home page after logging in
  }

  return (
    <div className="flex justify-center items-center mt-20 flex-col m-10 border border-slate-600 rounded-lg py-8 px-2 drop-shadow-xl md:text-2xl md:mx-60 text-slate-600">
      <p>Sign in with Google</p>
      <button
        className="border border-slate-600 rounded-lg py-1 px-2 cursor-pointer mt-6"
        onClick={signInWithGoogle}
      >
        Sign in
      </button>
    </div>
  );
};

export default login;
