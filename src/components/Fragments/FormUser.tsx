import InputForm from "@/components/Elements/Input";
import SelectOption from "../Elements/SelectOption";
export default function FormUser() {
  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create an user
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
          <InputForm
            label="Name"
            name="name"
            type="text"
            placeholder="Example"
          />
          <SelectOption
            label={"Role"}
            name={"role"}
            options={["Admin", "Super Admin"]}
          />
          <InputForm
            label="Email"
            name="name"
            type="email"
            placeholder="Example@gmail.com"
          />

          <InputForm
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
          />
          <InputForm
            label="Confirm password"
            name="password"
            type="password"
            placeholder="••••••••"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create user
          </button>
        </form>
      </div>
    </div>
  );
}
