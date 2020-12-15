"use strict";
import minimist from "minimist";
import fs from "fs";
import { listAllItems } from "./argument-functions.js";
import { AllItemsCount } from "./argument-functions.js";
import { header } from "./argument-functions.js";
import { jsonTodos } from "./argument-functions.js";

const args = minimist(process.argv);

//importing existing data from module
const todoTemp = jsonTodos;

// define class and class functions
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

// validate arguments
const manualText = `
HASZNÁLAT:
-l   Kilistázza a teendőket
-a   "teendő szövege"  - Új teendőt ad hozzá
-r   teendő sorszáma   - Eltávolít egy teendőt (még nem használható)
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

// -a kapcsoló ellenőrzése
const aOptionIndex = process.argv.indexOf("-a");
const aOptionValue = process.argv[aOptionIndex + 1];

// console.log( Object.keys( args ).every ( arg => typeof arg === 'string'));

if (args.l && AllItemsCount != 0) {
  listAllItems();
} else if (args.l && AllItemsCount == 0) {
  //   console.clear();  enable if no error during run
  console.log(`${header}

  Mára nincs több teendőd :)
  
  `);
} else if ((args.a && aOptionValue === undefined) || aOptionValue[0] === "-") {
  console.log(
    `HIBA: Nem adtál meg teendőt a kapcsoló után! HASZNÁLAT: todo.js -a "teendő szövege"`
  );
} else if (args.a) {
  todoTemp.push(createItem());
  let jsonToWrite = JSON.stringify(todoTemp, null, "\t");
  fs.writeFileSync("todos.json", jsonToWrite);
} else if (args.r) {
  todoTemp.splice(Object.values(args)[1] - 1, 1);
  // megnövelni az id-t 1-el, azoknál az elemeknél, ahol az id nagyobb, mint az argumentum
  todoTemp.forEach((element) => {
    if (element.id > Object.values(args)[1]) {
      element.id--;
    }
  });
  let jsonToWrite = JSON.stringify(todoTemp, null, "\t");
  fs.writeFileSync("todos.json", jsonToWrite);

  // if (typeof args.r === 'number') {
  //     console.log( `Remove ${ args.r }`);
}
// } else if (args.c) {

// TODO

// file-ból betölteni az adatokat - filekezelés try catch

// ötlet: a message-eket külön file-ba (module)

// ha -a:
// TodoList.add
// kell-e külön funkció, ami kiírja file-ba?
// 1fv -> 1 funkció: a program végén visszírjuk a file-ba

// ha -r: akkor remove
// TodoList.remove

// státusz állítás
