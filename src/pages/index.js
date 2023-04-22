import { useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

import Upload from "../components/Upload";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Upload />
    </main>
  );
}
