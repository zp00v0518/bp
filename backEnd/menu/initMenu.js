const createMenuInDB = require('./db/createMenuInDB')

async function main(){
    await createMenuInDB();
}

main()