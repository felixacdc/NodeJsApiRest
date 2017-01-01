module.exports = {
    port: process.env.PORT || 5000,
    db: process.env.MONGODB || 'mongodb://localhost/shop',
    SECRET_TOKEN: 'miclavedetokens'
}