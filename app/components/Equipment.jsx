import { useState, useEffect } from 'react';
import EquipmentService from '../services/equipmentService';

const equipmentService = new EquipmentService();

export default function Equipment() {
    const [equipment, setEquipment] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newEquipment, setNewEquipment] = useState({
        name: '',
        type: '',
        status: 'Available'
    });

    useEffect(() => {
        loadEquipment();
    }, []);

    const loadEquipment = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await equipmentService.getAll();
            setEquipment(data);
        } catch (error) {
            setError(error.message);
            console.error('Failed to load equipment:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setError(null);
            await equipmentService.delete(id);
            setEquipment(equipment.filter(item => item._id !== id));
        } catch (error) {
            setError(error.message);
            console.error('Failed to delete equipment:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEquipment(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(null);
            const created = await equipmentService.create(newEquipment);
            setEquipment(prev => [...prev, created]);
            // Reset form
            setNewEquipment({
                name: '',
                type: '',
                status: 'Available'
            });
        } catch (error) {
            setError(error.message);
            console.error('Failed to add equipment:', error);
        }
    };

    const handleUpdate = async (id, updatedEquipment) => {
        try {
            setError(null);
            const updated = await equipmentService.update(id, updatedEquipment);
            setEquipment(equipment.map(item => 
                item._id === id ? { ...item, ...updated } : item
            ));
        } catch (error) {
            setError(error.message);
            console.error('Failed to update equipment:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            {error && <div className="text-red-500 mb-4">Error: {error}</div>}
            
            {/* Add Equipment Form */}
            <div className="mb-8 p-4 border rounded">
                <h2 className="text-xl font-bold mb-4">Add New Equipment</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={newEquipment.name}
                            onChange={handleInputChange}
                            className="border p-2 w-full rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Type:</label>
                        <input
                            type="text"
                            name="type"
                            value={newEquipment.type}
                            onChange={handleInputChange}
                            className="border p-2 w-full rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Status:</label>
                        <select
                            name="status"
                            value={newEquipment.status}
                            onChange={handleInputChange}
                            className="border p-2 w-full rounded"
                            required
                        >
                            <option value="Available">Available</option>
                            <option value="In Use">In Use</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Retired">Retired</option>
                        </select>
                    </div>
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Equipment
                    </button>
                </form>
            </div>

            {/* Equipment List */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {equipment.map(item => (
                    <div key={item._id} className="border p-4 rounded">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p>Type: {item.type}</p>
                        <p>Status: {item.status}</p>
                        <button 
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded mt-2 hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

