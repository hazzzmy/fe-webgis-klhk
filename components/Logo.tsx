import { RadioTower } from "lucide-react";
import React from "react";
import Image from "next/image";

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2 w-full p-2 mb-5 justify-center bg-white">
      <Image src={"/image/logo.png"} alt="Logo" width={140} height={140} />
    </a>
  );
}

export function LogoMobile() {
  return (
    <a href="/" className="flex items-center gap-2 w-full p-2 mb-5 justify-center bg-white">
      <Image src={"/image/brand.png"} alt="Brand" width={50} height={50} />
    </a>
  );
}

export default Logo;
