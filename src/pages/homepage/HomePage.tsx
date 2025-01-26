import Button from "../../components/Button";

export default function HomePage() {

  return (
    <div className="flex justify-center pt-[220px] px-[24px] relative">
      <div className="flex flex-col gap-5 md:items-center ">
        <h1 className="text-3xl text-center mx-auto md:w-[590px] md:text-6xl leading-9 md:leading-tight">
          Streamline your tasks and stay organized with our app
        </h1>
        <h3 className="text-center md:text-md text-gray-600">
          Plan smarter, work better, and achieve more every day with us!
        </h3>
        <Button title="Try it Here" className="w-full md:w-[200px] mx-auto" />
      </div>
    </div>
  );
}
