'use strict';
import fs from 'fs';

const jsonContent = fs.readFileSync( 'todos.json', 'utf-8' );
const jsonTodos = JSON.parse( jsonContent );
const header = '* * * * * * * * * * * * * * * TEENDŐK * * * * * * * * * * * * * * *';
let AllItemsCount = jsonContent.split('\n').length-2;

function listAllItems () {
    console.clear();
    console.log(header);
    console.log();
    for (let i = 0; i < AllItemsCount; i++ ) {
        console.log(`${jsonTodos[i].id}. ${jsonTodos[i].content}  ${jsonTodos[i].status}`);
    }
    console.log();
}

// console.log(Object.keys(jsonTodos));

export { listAllItems };
export { AllItemsCount };
export { header };
