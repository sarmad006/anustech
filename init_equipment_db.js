// Create equipment collection and insert sample data
db = db.getSiblingDB('equipmentDB');
db.equipment.insertMany([
{
    name: "Industrial Drill Press",
    type: "Manufacturing",
    status: "Operational",
    lastMaintenance: ISODate("2023-10-15"),
    serialNumber: "DP-2023-001",
    manufacturer: "PowerTools Inc",
    location: "Workshop A"
},
{
    name: "Forklift Model X",
    type: "Material Handling",
    status: "Under Maintenance",
    lastMaintenance: ISODate("2023-11-01"),
    serialNumber: "FL-2023-102",
    manufacturer: "Heavy Lifters Co",
    location: "Warehouse B"
},
{
    name: "CNC Machine",
    type: "Manufacturing",
    status: "Operational",
    lastMaintenance: ISODate("2023-10-28"),
    serialNumber: "CNC-2023-045",
    manufacturer: "Precision Tools Ltd",
    location: "Workshop A"
},
{
    name: "Conveyor Belt System",
    type: "Material Handling",
    status: "Needs Repair",
    lastMaintenance: ISODate("2023-09-20"),
    serialNumber: "CBS-2023-033",
    manufacturer: "Industrial Systems Co",
    location: "Assembly Line 2"
}
]);

// Print confirmation
print("Database 'equipmentDB' and collection 'equipment' initialized with sample data.");

