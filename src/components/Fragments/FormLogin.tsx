import InputForm from "../Elements/Input";

export default function FormLogin() {
  return (
    <div className="w-full bg-transparent rounded-lg  dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <div>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2">
            Login
          </h1>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Welcome back, please enter your credentials.
          </p>
        </div>

        <form className="space-y-4 md:space-y-6">
          <InputForm
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
          />
          <InputForm
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
          />
        </form>
        <button className="bg-gradient-to-r from-pink-600 to-blue-700 text-white font-bold py-2 px-6 rounded-full">
          Login
        </button>
      </div>
    </div>
  );
}
