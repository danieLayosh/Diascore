export const SignIn = () => {
  return (
    <div className="max-w-sm bg-gradient-to-t from-white to-[#f4f7fb] rounded-3xl p-8 border-4 border-white shadow-xl mx-0">
      <div className="text-center text-3xl font-extrabold text-[#1089d3]">Sign In</div>
      <form className="mt-5" action>
        <input
          placeholder="E-mail"
          id="email"
          name="email"
          type="email"
          className="w-full bg-white border-none p-4 rounded-3xl mt-4 shadow-[0px_10px_10px_-5px_#cff0ff] focus:outline-none focus:border-[#12b1d1] border-transparent"
          required
        />
        <input
          placeholder="Password"
          id="password"
          name="password"
          type="password"
          className="w-full bg-white border-none p-4 rounded-3xl mt-4 shadow-[0px_10px_10px_-5px_#cff0ff] focus:outline-none focus:border-[#12b1d1] border-transparent"
          required
        />
        <span className="block mt-3 ml-2">
          <a href="#" className="text-[#0099ff] text-xs">Forgot Password ?</a>
        </span>
        <input
          defaultValue="Sign In"
          type="submit"
          className="w-full font-bold bg-gradient-to-br from-[#1089d3] to-[#12b1d1] text-white py-4 my-5 rounded-3xl shadow-[0px_20px_10px_-15px_rgba(133,189,215,0.8784313725)] transition-all ease-in-out hover:scale-105 active:scale-95"
        />
      </form>
      <div className="mt-7">
        <span className="block text-center text-xs text-[#aaa]">Or Sign in with</span>
        <div className="flex justify-center gap-4 mt-2">
          <button className="bg-gradient-to-br from-black to-[#707070] border-4 border-white p-1 rounded-full w-10 h-10 grid place-content-center shadow-[0px_12px_10px_-8px_rgba(133,189,215,0.8784313725)] transition-all ease-in-out hover:scale-110 active:scale-95">
            <svg
              viewBox="0 0 488 512"
              height="1em"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-white m-auto"
            >
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
          </button>
          <button className="bg-gradient-to-br from-black to-[#707070] border-4 border-white p-1 rounded-full w-10 h-10 grid place-content-center shadow-[0px_12px_10px_-8px_rgba(133,189,215,0.8784313725)] transition-all ease-in-out hover:scale-110 active:scale-95">
            <svg
              viewBox="0 0 384 512"
              height="1em"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-white m-auto"
            >
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
