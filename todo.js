"use strict";
import minimist from "minimist";
import fs, { write } from "fs";
import { listAllItems } from "./argument-functions.js";
import { AllItemsCount } from "./argument-functions.js";
import { header } from "./argument-functions.js";
import { jsonTodos } from "./argument-functions.js";
import { clear } from "console";

const args = minimist(process.argv);

//importing existing data from module
const todoTemp = jsonTodos;

// define class
class Todo {
  constructor(id, content, status = false) {
    this.id = id;
    this.content = content;
    this.status = status;
  }
}

// creating instances
function createItem() {
  const todo = new Todo(getUniqueId(), Object.values(args)[1]);
  return todo;
}

function getUniqueId() {
  if (jsonTodos[0] == undefined) {
    return 1;
  } else {
    return Object.keys(jsonTodos).length + 1;
  }
}

//writing data to json file
function writeToFile() {
  let jsonToWrite = JSON.stringify(todoTemp, null, "\t");
  fs.writeFileSync("todos.json", jsonToWrite);
}

// validate arguments
const manualText = `
HASZNÁLAT:
-l   Kilistázza a teendőket
-a   "teendő szövege"  - Új teendőt ad hozzá
-r   teendő sorszáma   - Eltávolít egy teendőt
-c   teendő sorszáma   - Teljesít egy teendőt ( még nem használható)
`;
if (Object.keys(args)[1] === undefined) {
  console.log(manualText);
}

if (
  args._.length > 2 ||
  !Object.keys(args).every((arg) => ["_", "l", "a", "r", "c"].includes(arg))
) {
  console.log(`
  Érvénytelen kapcsoló!
  ${manualText}`);
}

const aOptionIndex = process.argv.indexOf("-a");
const aOptionValue = process.argv[aOptionIndex + 1];
const rOptionIndex = process.argv.indexOf("-r");
const rOptionValue = process.argv[rOptionIndex + 1];
const cOptionIndex = process.argv.indexOf("-c");
const cOptionValue = process.argv[cOptionIndex + 1];

if (args.l && AllItemsCount != 0) {
  listAllItems();
} else if (args.l && AllItemsCount == 0) {
  console.clear();
  console.log(`${header}
  Mára nincs több teendőd :)
  
  `);
} else if ((args.a && aOptionValue === undefined) || aOptionValue[0] === "-") {
  console.log(
    `HIBA: Nem adtál meg teendőt a kapcsoló után! HASZNÁLAT: todo.js -a "teendő szövege"`
  );
} else if (args.a) {
  todoTemp.push(createItem());
  writeToFile();
  listAllItems();
} else if (args.r && rOptionValue === undefined) {
  console.log(
    `HIBA: Nem adtál meg sorszámot a kapcsoló után! HASZNÁLAT: todo.js -r teendő sorszáma`
  );
} else if (args.r && typeof args.r === "string") {
  console.log(
    `HIBA: Nem számot adtál meg! HASZNÁLAT: todo.js -r teendő sorszáma`
  );
} else if ((args.r && rOptionValue > AllItemsCount) || rOptionValue == 0) {
  console.log(`HIBA: Nincs ilyen sorszám!`);
} else if (args.r) {
  todoTemp.splice(Object.values(args)[1] - 1, 1);
  todoTemp.forEach((element) => {
    if (element.id > Object.values(args)[1]) element.id--;
  });
  writeToFile();
  listAllItems();
} else if (args.c && cOptionValue === undefined) {
  console.log(
    `HIBA: Nem adtál meg sorszámot a kapcsoló után! HASZNÁLAT: todo.js -c teendő sorszáma`
  );
} else if (args.c && typeof args.c === "string") {
  console.log(
    `HIBA: Nem számot adtál meg! HASZNÁLAT: todo.js -c teendő sorszáma`
  );
} else if ((args.c && cOptionValue > AllItemsCount) || cOptionValue == 0) {
  console.log(`HIBA: Nincs ilyen sorszám!`);
} else if (args.c) {
  todoTemp.forEach((element) => {
    if (element.id == Object.values(args)[1]) {
      element.status = true;
    }
  });
  writeToFile();
  listAllItems();
}

// TODO

// try-catch a filekezelésre
// törlés töröl a file-ból de hibára fut utána - módosításnál nem