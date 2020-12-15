"use strict";
import fs from "fs";

const jsonContent = fs.readFileSync("todos.json", "utf-8");
const jsonTodos = JSON.parse(jsonContent);
const header =
  "* * * * * * * * * * * * * * * TEENDŐK * * * * * * * * * * * * * * *";
let AllItemsCount = (jsonContent.split("\n").length - 2)/5;
function listAllItems() {
  // console.clear();   enable if no error during run
  console.log(header);
  console.log();
  for (let i = 0; i < AllItemsCount; i++) {
    console.log(
      `${jsonTodos[i].id}. ${jsonTodos[i].content}  ${jsonTodos[i].status}`
    );
  }
  console.log();
}

export { listAllItems };
export { AllItemsCount };
export { header };
export { jsonTodos };