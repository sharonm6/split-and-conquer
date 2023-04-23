import { useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

import Upload from "../components/Upload";
import Calculations from "@/components/Calculations";
import Match from "../components/Match";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [names, setNames] = useState([]);
  const [namesToItems, setNamesToItems] = useState({});
  const [itemsToCost, setItemsToCost] = useState({});
  const [itemNames, setItemNames] = useState([]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      <nav class="relative flex w-full flex-wrap items-center justify-between bg-neutral-900 py-2 text-neutral-200 shadow-lg lg:flex-wrap lg:justify-start lg:py-4">
        <div class="flex w-full flex-wrap items-center justify-between px-3 text-lg font-bold">
          Split and Conquer
        </div>
      </nav>
      <Upload
        setNamesToItems={setNamesToItems}
        setItemsToCost={setItemsToCost}
        setItemNames={setItemNames}
      />
      <Match
        namesToItems={namesToItems}
        setNamesToItems={setNamesToItems}
        names={names}
        setNames={setNames}
        itemNames={itemNames}
      />
      <Calculations nameToItems={namesToItems} itemsToCost={itemsToCost} />
    </main>
  );
}
