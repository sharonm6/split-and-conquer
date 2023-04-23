import { useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

import Upload from "../components/Upload";
import Calculations from "@/components/Calculations";
import Match from "../components/Match";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [ocr, setOcr] = useState([]);
  const [names, setNames] = useState([]);
  const [namesToItems, setNamesToItems] = useState({});
  const [itemsToCost, setItemsToCost] = useState({});

  useEffect(() => {
    setOcr([
      "bloody mary 7.0",
      "Mimosa Special 8.0",
      "Coffee 275",
      "Florentine 12.0",
      "French Toast 13.0",
    ]);
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Upload ocr={ocr} setOcr={setOcr} setItemsToCost={setItemsToCost} />
      <Calculations nameToItems={namesToItems} itemsToCost={itemsToCost} />
      <Match
        namesToItems={namesToItems}
        setNamesToItems={setNamesToItems}
        names={names}
        setNames={setNames}
        itemsToCost={itemsToCost}
      />
    </main>
  );
}
