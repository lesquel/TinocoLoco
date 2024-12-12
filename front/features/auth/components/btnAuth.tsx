import { fontPoppins } from "@/config/poppins"

export const BtnAuth = ({
    text, disabled
}: {
    text: string, disabled: boolean
}) => {
    return (
        <button disabled={disabled} type="submit" className={fontPoppins.className+  " bg-[#9575CD] w-full py-4 text-white rounded-full block "}>
            {text}
        </button>
    );
};