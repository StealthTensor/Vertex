"use client";
import { useAuth } from "@/hooks/zustand";
import { serverLogin } from "@/server/action";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Loader } from "../app/components/loader";
import { DEV_TOKEN_PREFIX } from "@/utils/devMode";

export const LoginComponent = () => {
  const [eyeOpen, setEyeOpen] = useState(false);
  const { error, setError, loading, setLoading, setEmail, email } = useAuth();
  const [captchaImage, setCaptchaImage] = useState<string | null>(null);
  const [captchaDigest, setCaptchaDigest] = useState<string | null>(null);
  const [captchaCode, setCaptchaCode] = useState("");

  useEffect(() => {
    window.localStorage.clear();
  }, []);

  const toMessage = (val: unknown) => {
    if (typeof val === "string") {
      if (val.includes("Unexpected token '<'") || val.toLowerCase().includes("<html") || val.includes("JSON")) {
        return "Login service is temporarily unavailable. Please try again in a few moments.";
      }
      return val;
    }
    if (val && typeof val === "object" && "message" in (val as any)) {
      const m = (val as any).message;
      return typeof m === "string" ? m : String(m);
    }
    try {
      return String(val);
    } catch {
      return "Unexpected error";
    }
  };

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setLoading(true);
    setError("");

    try {
      const form = new FormData(e.currentTarget);
      const hash1 = form.get("name") as string;
      const hash2 = form.get("password") as string;

      if (hash1 && hash1.length !== 0) {
        const addr = hash1.includes("@");
        const email = (addr ? hash1 : `${hash1}@srmist.edu.in`).toLowerCase();

        const devEmail = (process.env.NEXT_PUBLIC_DEV_EMAIL || "dev@srmist.edu.in").toLowerCase();
        if (email === devEmail) {
          setEmail({
            mail: email,
            digest: "dev",
            identifier: "dev",
          });
          setLoading(false);
          return;
        }
        setEmail({
          mail: email,
          digest: "step2",
          identifier: "step2",
        });
        setCaptchaImage(null);
        setCaptchaDigest(null);
        setCaptchaCode("");
        setLoading(false);
        return;
      }

      // Second step: Validate password
      if (hash2 && hash2.length !== 0) {
        if (!email.digest || !email.identifier) {
          setError("Please enter your email first");
          setLoading(false);
          return;
        }

        const devEmail = (process.env.NEXT_PUBLIC_DEV_EMAIL || "dev@srmist.edu.in").toLowerCase();
        const devPassword = process.env.NEXT_PUBLIC_DEV_PASSWORD || "vertex123";
        if (email.mail.toLowerCase() === devEmail) {
          if (hash2 === devPassword) {
            const devToken = `${DEV_TOKEN_PREFIX}${Math.random().toString(36).slice(2)}`;
            Cookies.set("token", devToken, { expires: 30, path: "/" });
            Cookies.set("user", email.mail, { expires: 30, path: "/" });
            return (window.location.href = "/app/timetable");
          } else {
            setError("Invalid dev credentials");
            setLoading(false);
            return;
          }
        }
        const payload: any = { account: email.mail, password: hash2 };
        if (captchaDigest && captchaCode) {
          payload.cdigest = captchaDigest;
          payload.captcha = captchaCode;
        }
        const { res }: any = await serverLogin(payload);
        const response = res ?? {};

        console.log("Full Backend Response:", response);

        if (response?.captcha || response?.image || response?.data?.captcha) {
          const captchaData = response.captcha ?? response.data?.captcha ?? {};
          const img = captchaData?.image ?? captchaData?.Image ?? response?.image ?? null;
          const dig = captchaData?.cdigest ?? captchaData?.Cdigest ?? response?.cdigest ?? null;

          if (img) {
            const imageSrc = img.startsWith("data:image") ? img : `data:image/png;base64,${img}`;
            setCaptchaImage(imageSrc);
            setCaptchaDigest(dig);
            setCaptchaCode("");
            setError("Please enter the code shown below.");
            setLoading(false);
            return;
          }
        }

        if (
          response?.authenticated ||
          response?.status === "success" ||
          (typeof response?.cookies === "string" && response.cookies.length > 0)
        ) {
          if (typeof response?.cookies === "string" && response.cookies.length > 0) {
            Cookies.set("token", response.cookies, { expires: 30, path: "/" });
            Cookies.set("user", email.mail, { expires: 30, path: "/" });
          }
          setCaptchaImage(null);
          setCaptchaDigest(null);
          setCaptchaCode("");
          return (window.location.href = "/app/timetable");
        }

        const msg =
          response?.message || response?.error || response?.errors?.[0] || response?.session?.message || "Login failed";
        setError(toMessage(msg));
        setLoading(false);
        return;
      }

      // If neither hash1 nor hash2 is provided
      setError("Please enter your credentials");
      setLoading(false);
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error?.message || String(error);
      
      // Handle JSON parsing errors
      if (errorMessage.includes("Unexpected token '<'") || 
          errorMessage.includes("<html") || 
          errorMessage.includes("JSON") ||
          errorMessage.includes("not valid JSON")) {
        setError("Login service is temporarily unavailable. Please try again in a few moments.");
      } else {
        setError(toMessage(errorMessage));
      }
      setLoading(false);
    }
  };
  return (
    <div className="flex-1 flex items-center justify-center px-6 lg:px-0">
      <div className="relative max-w-5xl min-h-[50%] w-full rounded-2xl grid grid-cols-1 lg:grid-cols-2 bg-white/5 apply-border-md backdrop-blur-3xl apply-inner-shadow-sm">
        <div className="absolute inset-0 bg-white/10 blur-3xl -z-10" />

        <div className="flex items-center justify-center min-h-20 lg:text-4xl h-full text-2xl ">
          Login
        </div>
        <div className="w-full h-full flex items-center justify-center ">
          <form
            onSubmit={HandleSubmit}
            className="w-[90%] h-[90%] flex flex-col justify-center items-center gap-10 p-4"
          >
            <div className="w-full flex flex-col gap-4 ">
              {/* Show email input if digest is empty (first step) */}
              {email?.digest.length === 0 && (
                <input
                  id="name"
                  name="name"
                  type="name"
                  className="w-full px-4 py-3 rounded-xl apply-inner-shadow-sm bg-white/10 focus:outline-none "
                  placeholder="SRM Mail ID"
                  autoComplete="email"
                  autoFocus
                  required
                />
              )}
              {/* Show password input if digest is present and password is not yet set (second step) */}
              {email?.digest.length !== 0 && (
                <div className="w-full relative z-10 ">
                  <input
                    id="password"
                    name="password"
                    type={eyeOpen ? "name" : "password"}
                    className="w-full px-4 py-3 rounded-xl apply-inner-shadow-sm bg-white/10 focus:outline-none "
                    placeholder="Password"
                    autoComplete="current-password"
                    autoFocus
                    required
                  />
                  <div className="right-0 top-1/2 -translate-y-1/2 absolute flex items-center justify-end pr-5 ">
                    {eyeOpen ? (
                      <Eye
                        onClick={() => setEyeOpen((prev) => !prev)}
                        className="h-6 w-6 cursor-pointer"
                      />
                    ) : (
                      <EyeOff
                        onClick={() => setEyeOpen((prev) => !prev)}
                        className="h-6 w-6 cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              )}
              {email?.digest.length !== 0 && captchaImage && (
                <div className="w-full flex flex-col gap-3">
                  <img src={captchaImage} alt="captcha" className="w-full max-w-60 h-auto rounded-xl apply-inner-shadow-sm bg-white/10" />
                  <input
                    id="captcha"
                    name="captcha"
                    type="text"
                    value={captchaCode}
                    onChange={(e) => setCaptchaCode(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl apply-inner-shadow-sm bg-white/10 focus:outline-none "
                    placeholder="Enter CAPTCHA"
                    autoComplete="off"
                  />
                </div>
              )}
            </div>
            {typeof error === "string" && error.length !== 0 && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl apply-inner-shadow-md bg-black  focus:outline-none  flex item-center justify-center cursor-pointer"
            >
              {loading ? <Loader className="w-5 h-5 " /> : "Authenticate"}
            </button>
          </form>
        </div>
        <a
          href="https://academia.srmist.edu.in/reset"
          target="_blank"
          rel="noopener"
          className="absolute -bottom-20 left-1/2 -translate-x-1/2  px-3 py-1 apply-border-sm bg-white/5 rounded text-sm"
        >
          Forget Password ?
        </a>
      </div>
    </div>
  );
};
