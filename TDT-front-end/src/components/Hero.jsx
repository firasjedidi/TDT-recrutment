import { useNavigate } from 'react-router-dom';


const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-full" >
    <h1 className=" text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
      Welcome to our website
    </h1>
    <p className=" mt-6 text-lg leading-8 text-gray-600">
      Create an account and start exploring our features
    </p>
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <a
        onClick={() => navigate('signup')}
        className="rounded-md bg-indigo-600 w-28 h-10 flex items-center justify-center text-sm font-semibold cursor-pointer text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Sign up now
      </a>
      <a
        onClick={() => navigate('login')}
        className="text-sm bg-slate-50 w-28 h-10 flex items-center justify-center rounded-md font-semibold leading-6 hover:border-2 hover:bg-[#F5F2FD] text-gray-900 cursor-pointer"
      >
        Login
      </a>
    </div>
  </div>
  );
};

export default Hero;