import { useActionState } from "react";

type FormType = {
  name: string;
  age: number;
};
type PrevFormDataType = {
  value: FormType;
  validationError: { name: Error | null; age: Error | null };
  apiError: Error | null;
};

const validationName = (name: string) => {
  if (name === "") {
    return new Error("名前を入力してください");
  } else if (name.length > 10) {
    return new Error("名前は10文字以内で入力してください");
  }
  return null;
};
const validationAge = (age: number) => {
  if (age <= 0) {
    return new Error("年齢は0以上で入力してください");
  }
  return null;
};

export const FormTest3 = () => {
  const initialFormData: PrevFormDataType = {
    value: { name: "", age: 0 },
    validationError: { name: null, age: null },
    apiError: null,
  };

  const [formData, action, isPending] = useActionState<
    PrevFormDataType,
    FormData
  >(async (_: PrevFormDataType, formData: FormData) => {
    // FormDataをobjectに変換
    const _formData = Object.fromEntries(formData.entries());
    const data: FormType = {
      name: _formData.name as string,
      age: Number(_formData.age),
    };

    // validationを掛ける　いい感じのライブラリがあれば参考にする
    const nameError = validationName(data.name);
    const ageError = validationAge(data.age);
    if (nameError || ageError) {
      return {
        value: { name: data.name, age: data.age },
        validationError: {
          name: nameError,
          age: ageError,
        },
        apiError: null,
      };
    }

    // ここでAPI処理を実装・今回は2秒待ってエラーを返す
    await new Promise((res) => setTimeout(res, 2000));
    const apiError = new Error("Failed to submit data");

    return {
      value: { name: data.name, age: data.age },
      validationError: {
        name: nameError,
        age: ageError,
      },
      apiError: apiError,
    };
  }, initialFormData);

  return (
    <>
      <form
        action={action}
        className="flex w-full max-w-xl flex-col gap-2 rounded-md p-4 shadow"
      >
        <label className="flex flex-col">
          <div className="flex flex-row text-xl">
            <span className="w-1/3">名前：</span>
            <input
              className="w-full border p-1 text-right"
              type="text"
              name="name"
              defaultValue={formData.value.name}
            />
          </div>
          <span className="h-4 text-xs text-red-500">
            {formData.validationError.name && (
              <>{formData.validationError.name.message}</>
            )}
          </span>
        </label>
        <label className="flex flex-col">
          <div className="flex flex-row text-xl">
            <span className="w-1/3">年齢：</span>
            <input
              className="w-full border p-1 text-right"
              type="number"
              name="age"
              defaultValue={formData.value.age}
            />
          </div>
          <span className="h-4 text-xs text-red-500">
            {formData.validationError.age && (
              <>{formData.validationError.age.message}</>
            )}
          </span>
        </label>
        <button
          className={
            "w-full rounded-md py-4 text-lg text-white" +
            (isPending ? " bg-gray-400" : " bg-blue-500")
          }
          type="submit"
          formAction={action}
          disabled={isPending}
        >
          送信{isPending && "中"}
        </button>
        <span className="h-4 text-xs text-red-500">
          {formData.apiError && <p>{formData.apiError.message}</p>}
        </span>
      </form>
    </>
  );
};