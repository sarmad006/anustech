// Connect to the equipment collection
const collection = db.equipment;

// First find the document to verify it exists
const documentToDelete = collection.findOne({ "name": "Conveyor Belt System" });

if (documentToDelete) {
    // Perform the deletion
    const result = collection.deleteOne({ "name": "Conveyor Belt System" });
    
    if (result.deletedCount === 1) {
        print("Successfully deleted the Conveyor Belt System record");
    } else {
        print("Error: Failed to delete the record");
    }
} else {
    print("No equipment found with name 'Conveyor Belt System'");
}

