import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

import { loginRequired } from "@/features/auth/middleware/loginRequired";
module.exports = {
  async loginRequired(){
    return ["/", "/accounts/login"].includes(new URL(document.location.href).pathname);
  }
}