import { ImgInfo } from "@/services/types/imgInfo";
import { fontPoppins } from "@/config/poppins"
export const Input = ({
  name, type, value, placeholder, children, errorMessage, ...rest
}: {
  name: string, type: string, value?: string, placeholder: string, children?: React.ReactNode, errorMessage: any
}) => {
  return (
    <div>
      <div className="flex gap-4 justify-center items-center shadow-inner rounded-full px-5 py-2">
        <input

          {...rest}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          className={fontPoppins.className + " bg-transparent w-full  px-6 py-3  text-gray-600 focus:outline-none  placeholder:text-gray-400"}
        />
        <span className=" flex items-center text-gray-400">
          {children}
        </span>
      </div>
      {errorMessage && (
        <span className="text-red-500 text-xs text-center block">{errorMessage}</span>
      )}
    </div>

  );
};