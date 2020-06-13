const db = require('./dbConfig');

module.exports = {
    find,
    findById,
    findBy,
    add
}

function find () {
    return db('users').select('id','username')
}
function findById ( id ){
    return db('users')
        .where({id})
        .first();
}
function findBy(criteria){
    return db('users').where(criteria)
}
async function add (user){
    const [id] = await db('users').insert(user, 'id')
    return findById(id)
}