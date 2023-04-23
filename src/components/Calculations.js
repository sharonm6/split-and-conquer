import { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function getItemsToNumNames(nameToItems) {
    let itemsToNumNames = {};

    for (let name in nameToItems) {
        let items = nameToItems[name];
        for (let item in items) {
            item = items[item];
            if (itemsToNumNames[item] == null) {
                itemsToNumNames[item] = 1;
            } else {
                itemsToNumNames[item] += 1;
            }
        }
    }

    return itemsToNumNames;
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

export default function Calculations({nameToItems, itemsToCost}) {
  let itemsToNumNames = getItemsToNumNames(nameToItems);
  let nameToCost = calculateNameToCost(
    itemsToCost,
    nameToItems,
    itemsToNumNames
  );

  return (
    <>
      <div className="mt-4">
        <p className="font-bold">Results:</p>
      </div>
      <div className="display-flex pb-10">
        <ul>
          {Object.entries(nameToCost).map(([name, cost]) => (
            <li key={name}>
              {name} pays ${cost.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
