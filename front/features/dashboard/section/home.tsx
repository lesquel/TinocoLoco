import {UserActiveGraphic} from "../components/graphics/userActive";
import { UserEmailVerificate } from "../components/graphics/userEmailVerificate";

export default function HomeDashboard() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <UserActiveGraphic />
        <UserEmailVerificate />
        <UserEmailVerificate />
      </div>
    </div>
  );
}
