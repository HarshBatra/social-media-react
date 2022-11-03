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
    <div>
      <Link to="/">Home</Link>
      {!user ? (
        <Link to="/login">Login</Link>
      ) : (
        <Link to="/createpost">Create Post</Link>
      )}
      <div>
        {user && (
          <>
            <p>{user?.displayName}</p>
            <img src={user?.photoURL || ""} width="50" height="50" />
            <button onClick={signUserOut}>Log Out</button>
          </>
        )}
      </div>
    </div>
  );
};

export default navbar;
