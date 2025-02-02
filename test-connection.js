require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// Connection options
const options = {
serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
},
maxPoolSize: 10,
minPoolSize: 5,
retryWrites: true,
connectTimeoutMS: 30000,
};

async function testConnection() {
const client = new MongoClient(process.env.MONGODB_URI, options);

try {
    // Parse connection URL for logging (without credentials)
    const uri = process.env.MONGODB_URI;
    const urlParts = new URL(uri);
    console.log('Attempting to conne    console.log('Connected to database:', db.databaseName);
    console.log('Database features:', await db.command({ buildInfo: 1 }).then(info => ({
        version: info.version,
        storageEngine: info.storageEngine?.name
    })));
    
    // Get authentication status
    const connectionStatus = await client.db().admin().serverStatus();
    console.log('Authentication active:', connectionStatus.security?.authentication?.authenticated || false);
    
    // Get user info (safely)
    const currentUser = await client.db().command({ connectionStatus: 1 });
    console.log('Connected user:', currentUser.authInfo?.authenticatedUsers?.[0]?.user || 'Unknown');
    
    // Test basic connection with ping
    console.log('\nTesting database connection...');
    await db.command({ ping: 1 });
    console.log('Ping successful - database is responsive.');
    
    console.log('\nBasic connection test completed successfully! \U0001F389');
    
} catch (error) {
    console.error('\n❌ Connection test failed');
    console.error('Error type:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    if (error.code === 18) {
        console.error('Authentication failed - please verify your credentials');
    }
    process.exit(1);
    
} finally {
    console.log('\nClosing connection...');
    await client.close();
    console.log('Connection closed.');
}
}

// Run the test
testConnection().catch(error => {
console.error('Unhandled error:', error);
process.exit(1);
});

