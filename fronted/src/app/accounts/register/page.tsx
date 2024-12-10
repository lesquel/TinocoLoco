import { Register } from "@/features/auth/pages/register";
import authBG from "@/../public/images/authBG.jpg";
export default function Page() {
  return (
    <div className={"  flex flex-col items-center justify-center min-h-screen py-2"}>
      <div style={{
        backgroundImage: `url(${authBG.src})`,
      }} className={`bg-center bg-no-repeat bg-cover w-full h-full`}>

      </div>
      {/* <img src={authBG.src} alt="auth background" className="w-full bg-cover fixed -z-10 backdrop-blur-xl bg-white " /> */}
      <Register />
    </div>
  );
};