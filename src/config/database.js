import mongoose from 'mongoose';
import bluebird from 'bluebird';

function connect(connectionString) {
  mongoose.Promise = bluebird;

  /* eslint-disable no-console */
  mongoose.connect(connectionString, {
    useMongoClient: true,
  }).then(() => {
    console.log('Successfully connected!');
  }).catch(console.error.bind(console, 'Connection error: '));
}

function mountConnectionString(host, db) {
  return `mongodb://${host}/${db}`;
}

function mountAuthenticatedConnectionString(host, user, password, db) {
  return `mongodb://${user}:${password}@${host}/${db}`;
}

function createConnectionString(host, user, password, db) {
  let connectionString;
  if (!user || !password) {
    connectionString = mountConnectionString(host, db);
  } else {
    connectionString = mountAuthenticatedConnectionString(host, user, password, db);
  }

  return connectionString;
}

function connectToDatabase(database, host, user, password) {
  const connectionString = createConnectionString(host, user, password, database);
  connect(connectionString);
}

export default {
  connectToDatabase,
};
