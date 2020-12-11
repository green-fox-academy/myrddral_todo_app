'use strict';
import minimist from 'minimist';
import fs from 'fs';
import {listAllItems} from './argument-functions.js';
import {AllItemsCount} from './argument-functions.js';
import {header} from './argument-functions.js';
import { clear } from 'console';

const args = minimist (process.argv );

//npm init -y
// package.json kiegészítése "type":"module"-lal
// npm install minimist (egy fv ami kigyűjti a kulcsokhoz a megfelelő értéket)


// if (typeof args.r === 'number') {
//     console.log( `Remove ${ args.r }`);
// }

/*
milyen fileok kellenek? 

    json parse-olás (vissza JSON.stringify)
        console.log(JSON.parse( )
        
milyen function-ök kellenek? 
- kiírja a lista tartalmát
- hozzáad a listához
- töröl a listáról
- teendő teljesítése, pipa

*/

// validate arguments

if (Object.keys(args)[1] === undefined) {
    console.log(`
    HASZNÁLAT:
    -l   Kilistázza a teendőokat
    -a   <teendő szövege>  Új teendőt ad hozzá
    -r   <teendő sorszáma>  Eltávolít egy teendőt
    -c   <teendő sorszáma>  Teljesít egy teendőt
    `);
}

if (args._.length > 2 || !Object.keys( args ).every ( arg => ['_', 'l', 'a', 'r', 'c'].includes (arg))) {
    console.log('Test');
}

const aOptionIndex = process.argv.indexOf( '-a' );
const aOptionValue = process.argv[ aOptionIndex + 1 ];

if (aOptionValue === undefined || aOptionValue[0] === '-') {
    console.log('HIBA: Nem adtál meg teendőt a kapcsoló után! HASZNÁLAT: todo.js -a teendő szövege');
}

// console.log( Object.keys( args ).every ( arg => typeof arg === 'string'));
// console.log( Object.keys( args ).every ( arg => ['_', 'l', 'a', 'r', 'c'].includes (arg)));

if (args.l && AllItemsCount != 0) {
    listAllItems();
} else {
    console.clear();
    console.log(header);
    console.log();
    console.log('Mára nincs több teendőd :)');
    console.log();
}
// else if (args.a) {}


class Todos {
    list;

    getStatus() {}
    setStatus(index) {}
    add(todo) {}
    delete(index) {}
}

const TodoList = new Todos();

// létre kell hoznom a todokat, manuálisan is
// file-ból betölteni az adatokat - filekezelés try catch
// ha -l: 
// forEach-el végigmegyünk a listánkon és kiírjuk
// sorszámot adni
// printList();

// ötlet: a message-eket külön file-ba (module)

// ha -a:
// TodoList.add
// kell-e külön funkció, ami kiírja file-ba?
// 1fv -> 1 funkció: a program végén visszírjuk a file-ba

// ha -r: akkor remove
// TodoList.remove

// státusz állítás
