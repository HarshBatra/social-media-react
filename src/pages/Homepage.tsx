import React from "react";

const Homepage = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-center md:justify-around items-center pt-44 pb-10 md:px-40 px-10">
      <img
        src={require("../assets/intro.jpg")}
        className="w-2/3 md:w-1/3 rounded-lg drop-shadow-xl"
        alt=""
      />
      <div className="flex flex-col justify-center text-center md:justify-start md:text-left gap-8 drop-shadow-lg tracking-widest md:w-1/2">
        <div className="text-4xl md:text-6xl font-bold text-slate-600">
          ShareSpace
        </div>
        <div className="md:text-xl text-sm">
          Unite, Connect, and Share your World!
        </div>
        <div className="md:text-xl text-sm text-slate-400">
          Developed with ❤️ by{" "}
          <a href="https://github.com/HarshBatra">
            <span className="font-bold md:text-2xl text-base text-slate-600">
              Harsh Batra
            </span>
          </a>
        </div>
        <div className="md:text-sm text-xs text-justify">
          ShareSpace is a dynamic social media platform built using React,
          Tailwind, and Firebase. With the convenience of one-click login
          through your Google account, ShareSpace allows you to effortlessly
          connect with others and share your thoughts through interactive posts.
          Engage with the community by liking posts with a simple heart button,
          and stay informed with the displayed number of likes. Each post
          clearly displays the name of the author for easy identification. Join
          ShareSpace and unlock a world of seamless social interaction.
        </div>
      </div>
    </div>
  );
};

export default Homepage;
