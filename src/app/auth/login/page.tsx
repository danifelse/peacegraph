import FormLogin from "@/components/Forms/FormLogin";

export default function Login() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex  items-center justify-center  mx-auto h-screen lg:py-0 bg-login">
        <div className="hidden md:w-1/2 h-[100%] md:flex md:flex-col md:gap-5 items-center justify-center bg-black bg-opacity-30">
          <div>
            <h1 className="text-5xl text-center font-extrabold  text-white [text-shadow:_2px_3px_0_rgb(0_0_0_/_70%)]">
              Content Management System
            </h1>
          </div>
          <img src="/icon/LOGO.png" alt="peacegraph" className="h-20" />
        </div>
        <div className="md:w-1/2 w-full flex items-center justify-center h-[100%] bg-white bg-opacity-50 backdrop-blur-lg">
          <FormLogin />
        </div>
      </div>
    </section>
  );
}
