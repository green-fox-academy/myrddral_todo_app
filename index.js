import minimist from 'minimist';

const args = minimist (process.argv );

//npm init -y
// package.json kiegészítése "type":"module"-lal
// npm install minimist (egy fv ami kigyűjti a kulcsokhoz a megfelelő értéket)

// if (typeof args.u === 'string' && typeof args.p === 'string') {
//     console.log(`Logged in as ${ args.u }: ${args.p}`);
// }

// if (typeof args.r === 'number') {
//     console.log( `Remove ${ args.r }`);
// }

