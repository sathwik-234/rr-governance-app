'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const push = ()=>{
    router.push("/signup")
  }

  return (
    <>
      <button onClick={push}>signup</button>
    </>
  );
}
