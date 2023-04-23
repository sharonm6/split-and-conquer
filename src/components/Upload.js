import { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Upload({
  setNamesToItems,
  setItemsToCost,
  setItemNames,
}) {
  const [ocr, setOcr] = useState([]);
  const [imageData, setImageData] = useState(null);
  const worker = createWorker({
    logger: (m) => {},
  });

  useEffect(() => {
    setNamesToItems({});
    let itemsCostNames = getItemsToCost(ocr);
    setItemsToCost(itemsCostNames[0]);
    setItemNames(itemsCostNames[1]);
  }, [ocr]);

  function getItemsToCost(items) {
    let itemstoCost = {};
    let itemNames = [];

    for (let i = 0; i < items.length; i++) {
      let lastSpaceIdx = items[i].lastIndexOf(" ");
      let item = items[i].slice(0, lastSpaceIdx);
      if (item != "") {
        let cost = items[i].slice(lastSpaceIdx + 1);
        itemstoCost[item] = parseFloat(cost);
        itemNames.push(item);
      }
    }

    return [itemstoCost, itemNames];
  }

  const convertImageToText = async () => {
    if (!imageData) return;
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(imageData);
    setOcr(text.split("\n"));
  };

  useEffect(() => {
    convertImageToText();
  }, [imageData]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageDataUri = reader.result;
      setImageData(imageDataUri);
    };
    reader.readAsDataURL(file);
  }

  return (
    <>
      <div>
        <p>Choose an Image</p>
        <input
          type="file"
          name=""
          id=""
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      <div className="display-flex">
        <img src={imageData} alt="" srcSet="" />
        <p>{JSON.stringify(ocr)}</p>
      </div>
    </>
  );
}
