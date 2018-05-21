const mongodbUsername = process.env.MONGODB_USERNAME || ''
const mongodbPassword = process.env.MONGODB_PASSWORD || ''
const mongodbHost = process.env.MONGODB_HOST || 'localhost'
const mongodbPort = process.env.MONGODB_PORT || '27017'
const mongodbCollection = process.env.MONGODB_COLLECTION || 'test'

let mongodbConnectLink = ''

let userpwd = ''
if (mongodbUsername) {
    userpwd = `${mongodbUsername}:${mongodbPassword}@`
}

mongodbConnectLink = `mongodb://${userpwd}${mongodbHost}:${mongodbPort}/${mongodbCollection}`

exports.link = mongodbConnectLink
exports.show = mongodbHost + ':' + mongodbPort + '/' + mongodbCollection