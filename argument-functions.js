"use strict";
import fs from "fs";

const jsonContent = fs.readFileSync("todos.json", "utf-8");
const jsonTodos = JSON.parse(jsonContent);
const header =
  "* * * * * * * * * * * * * * * TEENDŐK * * * * * * * * * * * * * * *";
let AllItemsCount = jsonTodos.length;
function listAllItems() {
  console.clear();
  console.log(header);
  console.log();
  for (let i = 0; i < AllItemsCount; i++) {
    if (jsonTodos[i].status = true) {jsonTodos[i].status = "[ x ]"}
    else {jsonTodos[i].status = "[   ]"}
    console.log(
      `${jsonTodos[i].id}. ${jsonTodos[i].status} ${jsonTodos[i].content}`
    );
  }
  console.log();
}

export { listAllItems };
export { AllItemsCount };
export { header };
export { jsonTodos };

