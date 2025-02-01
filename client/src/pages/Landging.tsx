import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4"> Calex</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">Analyze your spending and manage your finances effectively!</p>
      
      <div className="flex gap-4">
        <button
          onClick={handleSignIn}
          className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-lg text-lg font-semibold transition duration-300 hover:bg-blue-700 focus:outline-none"
        >
          Sign In
        </button>
        <button
          onClick={handleSignUp}
          className="cursor-pointer px-6 py-2 bg-green-600 text-white rounded-lg text-lg font-semibold transition duration-300 hover:bg-green-700 focus:outline-none"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
