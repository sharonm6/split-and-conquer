import { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function getNameToItems() {
  return {
    Mark: ["Lorem", "Ipsum"],
    Jane: ["Dolor Sit", "Amet"],
    Doe: ["Consectetur", "Adipiscing Elit", "Sed Do"],
    John: ["Lorem", "Sed Do"],
  };
}

function getItemsToNumNames() {
  return {
    Lorem: 2,
    Ipsum: 1,
    "Dolor Sit": 1,
    Amet: 1,
    Consectetur: 1,
    "Adipiscing Elit": 1,
    "Sed Do": 2,
  };
}

function getItemsToCost(items) {
  let itemstoCost = {};

  for (let i = 0; i < items.length; i++) {
    let lastSpaceIdx = items[i].lastIndexOf(" ");
    let item = items[i].slice(0, lastSpaceIdx);
    let cost = items[i].slice(lastSpaceIdx + 1);
    itemstoCost[item] = parseFloat(cost);
  }

  return itemstoCost;
}

function calculateNameToCost(itemsToCost, nameToItems, itemsToNumNames) {
  let nameToCost = {};

  for (let name in nameToItems) {
    let cost = 0;
    let items = nameToItems[name];

    for (let item in items) {
      item = items[item];
      cost += itemsToCost[item] / itemsToNumNames[item];
    }
    nameToCost[name] = cost;
  }
  return nameToCost;
}

export default function Calculations({ ocr, namesToItems, names }) {
  let itemsToCost = getItemsToCost([
    "Lorem 6.50",
    "Ipsum 7.50",
    "Dolor Sit 48.00",
    "Amet 9.30",
    "Consectetur 11.90",
    "Adipiscing Elit 1.20",
    "Sed Do 0.40",
    "",
  ]);
  let nameToItems = getNameToItems();
  let itemsToNumNames = getItemsToNumNames();
  let nameToCost = calculateNameToCost(
    itemsToCost,
    nameToItems,
    itemsToNumNames
  );

  console.log("itemsToCost", itemsToCost);
  console.log("nameToItems", nameToItems);
  console.log("itemsToNumNames", itemsToNumNames);
  console.log("nameToCost", nameToCost);

  return (
    <>
      <div>
        <p>Results:</p>
      </div>
      <div className="display-flex">
        <ul>
          {Object.entries(nameToCost).map(([name, cost]) => (
            <li key={name}>
              {name} pays {cost}.
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
