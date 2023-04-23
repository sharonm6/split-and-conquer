import { useEffect, useState } from "react";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Match({
  namesToItems,
  setNamesToItems,
  names,
  setNames,
  itemNames,
}) {
  const [inputVal, setInputVal] = useState("");
  const [currName, setCurrName] = useState("");

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
    console.log("itemNames", Object.keys(itemNames));
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
    } else {
      setNamesToItems((prev) => ({
        ...prev,
        [cName]: prev[cName].filter((item) => item != name),
      }));
    }
    console.log(namesToItems);
  }

  return (
    <>
      <form onSubmit={(e) => addName(e)} className="flex flex-col gap-4 mt-5">
        <span className="text-center font-bold">Add name(s):</span>
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

      <div className="flex col-auto">
        <div>
          {names &&
            names.map((namesName) => (
              <div>
                <div>
                  <button
                    className={`hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4  ${
                      currName == namesName ? "bg-green-600" : "bg-green-400"
                    }`}
                    name={namesName}
                    onClick={handleNameClick}
                  >
                    {namesName}
                  </button>
                </div>
                <div>
                  {itemNames &&
                    itemNames.map((item) => (
                      <button
                        id={`${namesName}-${item}`}
                        className={`text-white font-bold py-2 px-4 rounded m-4 ${
                          namesToItems[namesName] != null &&
                          namesToItems[namesName].indexOf(item) > -1
                            ? "bg-purple-500 hover:disabled:bg-purple-500"
                            : "bg-gray-500 hover:disabled:bg-gray-500"
                        } hover:bg-purple-700 hover:disabled:bg-gray-500`}
                        name={item}
                        onClick={(event) => handleItemClick(event, currName)}
                        disabled={namesName == currName ? false : "disabled"}
                      >
                        {item}
                      </button>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
