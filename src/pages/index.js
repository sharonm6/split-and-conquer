import { useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

import Upload from "../components/Upload";
import Calculations from "@/components/Calculations";
import Match from "../components/Match";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [ocr, setOcr] = useState([]);
  const [namesToItems, setNamesToItems] = useState({});

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Upload ocr={ocr} />
      <Calculations ocr={ocr} namesToItems={namesToItems} />
      <Match
        ocr={ocr}
        setOcr={setOcr}
        namesToItems={namesToItems}
        setNamesToItems={setNamesToItems}
      />
    </main>
  );
}
