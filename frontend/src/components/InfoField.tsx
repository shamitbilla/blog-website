import { ChangeEvent } from "react"

interface InfoFieldProps {
  Label: string,
  prompt: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  type?: string;
}

export const InfoField = ({ Label, prompt, onChange, type }: InfoFieldProps) => {
  return (
    <>
      <div className="text-md py-3 font-bold">
        {Label}
      </div>
      <div>
        <input
          type={type === 'password' ? 'password' : 'text'}
          placeholder={prompt}
          onChange={onChange}
          className="w-full py-2 px-4 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
        />
      </div>
    </>
  );
}