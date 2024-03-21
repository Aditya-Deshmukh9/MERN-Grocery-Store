"use client";
import GlobalApi from "@/app/Utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    setisLoading(true);
    try {
      const response = await GlobalApi.loginuser(email, password);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("jwt", JSON.stringify(response.data.jwt));
      router.push("/");
      setisLoading(false);
    } catch (error) {
      toast(error.message);
      console.log("An error occurred:", error);
      setisLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl capitalize px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          Web<span className="text-primary">Food</span>Store.com
        </h1>

        <p className="mx-auto mt-1 max-w-md text-center text-gray-500">
          Enter your email and password to sign in
        </p>

        <form
          className="mb-0 mt-6 space-y-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          onSubmit={handleSubmit}
        >
          <p className="text-center text-lg font-medium">
            Sign in to your account
          </p>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={!email || !password}
            className=" w-full rounded-lg text-xl bg-indigo-600 px-5 mt-2 font-medium text-white flex items-center"
          >
            {isLoading === true ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Sign in"
            )}
          </Button>

          <p className="text-center text-sm text-gray-500">
            No account?
            <Link className="underline" href="/create-account">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SigninPage;
