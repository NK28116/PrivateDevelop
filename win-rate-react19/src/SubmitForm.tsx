import { useFormStatus } from "react-dom";
import { useRef } from "react";
async function submitForm(query:any) {
    await new Promise((res) => setTimeout(res, 1000));
}

function Submit() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending}>
            {pending ? "Submitting..." : "Submit"}
        </button>
    );
}

function Form({ action }:{action:any}) {
    return (
        <form action={action}>
            <Submit />
        </form>
    );
}

export  function SubmitButton() {
    return <Form action={submitForm} />;
}

///placeHolder付き
function UsernameForm() {
    const { pending, data } = useFormStatus();
    return (
        <div>
            <h3>Request a Username: </h3>
            <input type="text" name="username" disabled={pending} />
            <button type="submit" disabled={pending}>
                Submit
            </button>
            <br />
            <p>{data ? `Requesting ${data?.get("username")}...` : ""}</p>
        </div>
    );
}

export  function SubmitInput() {
    const ref = useRef<HTMLFormElement>(null!);
    return (
        <form
            ref={ref}
            action={async (formData) => {
            await submitForm(formData);
            ref.current.reset();
            }}
        >
        <UsernameForm />
        </form>
    );
}
