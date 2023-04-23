import { useEffect, useState } from "react";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Match({
  namesToItems,
  setNamesToItems,
  names,
  setNames,
  itemsToCost,
}) {
  const [inputVal, setInputVal] = useState("");
  const [currName, setCurrName] = useState("");

  useEffect(() => {
    // setNames(["John", "Mary"]);
    // setCurrName("John");

    console.log("itemsToCost", Object.keys(itemsToCost));
  }, []);

  function handleInputChange(event) {
    const { value } = event.target;
    setInputVal(value);
  }

  function addName(event) {
    event.preventDefault();
    setNames((prev) => [...prev, inputVal]);
    setInputVal("");

    if (currName == "") {
      setCurrName(inputVal);
    }
  }

  function handleNameClick(event) {
    const { name } = event.target;
    setCurrName(name);
    console.log("itemsToCost", Object.keys(itemsToCost));
  }

  function handleItemClick(event, cName) {
    const { name } = event.target;
    if (
      namesToItems[cName] == null ||
      namesToItems[cName].indexOf(name) == -1
    ) {
      setNamesToItems((prev) => ({
        ...prev,
        [cName]: prev[currName] == null ? [name] : [...prev[cName], name],
      }));
    }
    console.log(namesToItems);
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
          {names.map((namesName) => (
            <div>
              <div>
                <button
                  className={`hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4  ${
                    currName == namesName ? "bg-green-500" : "bg-gray-500"
                  }`}
                  name={namesName}
                  onClick={handleNameClick}
                >
                  {namesName}
                </button>
              </div>
              <div>
                {Object.keys(itemsToCost).map((item) => (
                  <button
                    id={`${namesName}-${item}`}
                    className={`text-white font-bold py-2 px-4 rounded m-4 ${
                      namesToItems[namesName] != null &&
                      namesToItems[namesName].indexOf(item) > -1
                        ? "bg-purple-500"
                        : "bg-gray-500"
                    } hover:bg-purple-700`}
                    name={item}
                    onClick={(event) => handleItemClick(event, currName)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* <div>
          {names.map((namesName) => (
            <button
              className={`hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4  ${
                currName == namesName ? "bg-green-500" : "bg-gray-500"
              }`}
              name={namesName}
              onClick={handleNameClick}
            >
              {namesName}
            </button>
          ))}
        </div>
        <div>
          {Object.keys(ocr).map((item) => (
            <button
              className={`text-white font-bold py-2 px-4 rounded m-4 ${
                namesToItems[currName] != null &&
                namesToItems[currName].indexOf(item) > -1
                  ? "bg-gray-500"
                  : "bg-purple-500"
              } hover:bg-purple-700`}
              name={item}
              onClick={(event) => handleItemClick(event, currName)}
            >
              {item}
            </button>
          ))}
        </div> */}
      </div>
    </>
  );
}
