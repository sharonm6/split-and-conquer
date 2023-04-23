import { useEffect, useState } from "react";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Match() {
  const [ocr, setOcr] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [names, setNames] = useState([]);
  const [currItem, setCurrItem] = useState(null);
  const [itemsToNames, setItemsToNames] = useState({});

  useEffect(() => {
    setOcr({
      "bloody mary": 7.0,
      "Mimosa Special": 8.0,
      Coffee: 275,
      Florentine: 12.0,
      "French Toast": 13.0,
    });
    setNames(["John", "Mary"]);
  }, []);

  function handleInputChange(event) {
    const { value } = event.target;
    setInputVal(value);
  }

  function addName(event) {
    event.preventDefault();
    setNames((prev) => [...prev, inputVal]);
    setInputVal("");
  }

  function handleItemClick(event) {
    const { name } = event.target;
    setCurrItem(name);
    console.log(event.clientX);
  }

  function handleNameClick(event, item) {
    const { name } = event.target;
    console.log("item", item, itemsToNames);
    if (itemsToNames[item] == null || itemsToNames[item].indexOf(name) == -1) {
      setItemsToNames((prev) => ({
        ...prev,
        [item]: prev[item] == null ? [name] : [...prev[item], name],
      }));
    }
  }

  return (
    <>
      <form onSubmit={(e) => addName(e)} className="flex flex-col gap-4">
        Add name:
        <input
          name="nameInput"
          type="text"
          placeholder="ex. John"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
      <div>
        Names:
        {names.map((name) => (
          <p>{name}</p>
        ))}
      </div>

      <div className="flex col-auto">
        <div>
          {Object.keys(ocr).map((item) => (
            <button
              className={`text-white font-bold py-2 px-4 rounded m-4 ${
                currItem == item ? "bg-purple-500" : "bg-gray-500"
              } hover:bg-purple-700`}
              name={item}
              onClick={handleItemClick}
            >
              {item}
            </button>
            // {/* <p>{ocr[item]}</p> */}
          ))}
        </div>
        <div>
          {
            names.map((namesName) => (
              <button
                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4  ${
                  itemsToNames[currItem] != null &&
                  itemsToNames[currItem].indexOf(namesName) > -1
                    ? "bg-gray-500"
                    : "bg-green-500"
                }`}
                name={namesName}
                onClick={(event) => handleNameClick(event, currItem)}
              >
                {namesName}
              </button>
            ))
            // {/* <p>{ocr[item]}</p> */}
          }
        </div>
      </div>
    </>
  );
}
