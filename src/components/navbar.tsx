/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase"; //for accessing the info about the user and displaying it as the logged-in username.
import { useAuthState } from "react-firebase-hooks/auth"; //this library allows us to use pre-made hooks to facilitate using Firebase.
import { signOut } from "firebase/auth";
const navbar = () => {
  const [user] = useAuthState(auth); //this hook will automatically update this user variable whenever we login with a different account.

  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="m-0 p-0 left-0 top-0 w-full h-20 flex justify-between items-center text-sm md:text-lg bg-slate-600 drop-shadow-xl sticky">
      <div className="flex flex-row items-center text-center no-underline text-slate-200 pb-1 m-2 justify-between md:ml-10">
        <Link to="/">
          <div className="flex mx-3 md:mx-10 cursor-pointer">Home</div>
        </Link>
        {!user ? (
          <Link to="/login">
            <div className="flex border border-slate-200 rounded-lg py-1 px-2 mx-3 md:mx-10 cursor-pointer">
              Log in
            </div>
          </Link>
        ) : (
          <Link to="/createpost">
            <div className="flex mx-3 md:mx-10 bg-slate-200 py-2 px-3 drop-shadow-sm text-slate-600 rounded-md  whitespace-nowrap cursor-pointer">
              Create Post
            </div>
          </Link>
        )}
      </div>
      <div className="flex items-center align-middle justify-end text-slate-200 mr-5">
        {user && (
          <>
            <div className="flex flex-col justify-center align-middle items-center">
              <div className="flex">
                <img
                  className="rounded-full"
                  src={user?.photoURL || ""}
                  width="30"
                  height="30"
                />{" "}
              </div>
              <div className="flex text-xs mt-1 md:mx-6">
                <p>{user?.displayName}</p>
              </div>
            </div>
            <div className="flex border border-slate-200 rounded-lg py-1 px-2 ml-5 md:mx-10 cursor-pointer">
              <button onClick={signUserOut}>Log Out</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default navbar;
