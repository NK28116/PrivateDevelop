import { useOptimistic, useState } from "react";

async function updateName(name: string) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return name;
}

export const UseOptimisticDemo = () => {
  const [name, setName] = useState("");
  const [optimisticName, setOptimisticName] = useOptimistic("");

  const submitAction = async (formData: FormData) => {
    const newName = formData.get("name") as string;
    setOptimisticName(newName);
    console.log(newName)
    const updatedName = await updateName(newName);
    await setName(updatedName);
    console.log(optimisticName);
  };

  return (
    <div className="mt-10">
      <h1 className="flex justify-center font-bold text-xl">useOptimistic</h1>
      <form
        action={submitAction}
        className="space-y-4 bg-white p-6 shadow-md max-w-md mx-auto"
      >
        <div className="flex flex-col">
          <input
            type="text"
            name="name"
            className="border border-gray-300 "
            disabled={"" !== optimisticName}
          />
        </div>
        <button type="submit" className="bg-blue-500  text-white py-2 px-4  ">
          Submit
        </button>
      </form>
      <p className="mt-4 text-center">
        Your name is:{" "}
        <span className="font-semibold text-red-500">{optimisticName}</span>
        <span className="font-semibold text-blue-500">{name}</span>
      </p>
    </div>
  );
};

