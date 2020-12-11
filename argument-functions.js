'use strict';
import fs from 'fs';

const jsonContent = fs.readFileSync( 'todos.json', 'utf-8' );
let jsonTodos = JSON.parse( jsonContent );
let TodosList = JSON.stringify(jsonTodos);

function listAllItems () {
    console.clear();
    console.log('* * * * * * * * * * * * * * * TEENDŐK * * * * * * * * * * * * * * *');
    console.log();
    let fileContent = fs.readFileSync('todos.json', 'utf8');
    let AllItemsCount = fileContent.split('\n').length-2;
    for (let i = 0; i < AllItemsCount; i++ ) {
        console.log(`${jsonTodos[i].id}. ${jsonTodos[i].content}  ${jsonTodos[i].status}`);
    }
    console.log();
}

// listAllItems();



// console.log(Object.keys(jsonTodos));

export { listAllItems };