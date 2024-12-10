import { fontPoppins } from "@/components/utils/fonts/poppins"

export const BtnAuth = ({
    text
}: {
    text: string,
}) => {
    return (
        <button type="submit" className={fontPoppins.className+  " bg-[#9575CD] w-full py-4 text-white rounded-full block "}>
            {text}
        </button>
    );
};