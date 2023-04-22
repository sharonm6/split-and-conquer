import { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [ocr, setOcr] = useState("");
  const [imageData, setImageData] = useState(null);
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    const initWorker = async () => {
      const worker = createWorker({
        logger: (m) => {
          console.log(m);
        },
      });
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      setWorker(worker);
    };

    initWorker();
  }, []);

  const convertImageToText = async () => {
    if (!imageData) return;
    const {
      data: { text },
    } = await worker.recognize(imageData);
    setOcr(text);
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
      console.log({ imageDataUri });
      setImageData(imageDataUri);
    };
    reader.readAsDataURL(file);
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
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
        <img src={imageData} alt="" srcset="" />
        <p>{ocr}</p>
      </div>
    </main>
  );
}
