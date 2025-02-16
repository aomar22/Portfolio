import customersData from '../../data/customers.json';

// Temporary array (resets on server restart)
let customers = [...customersData];

export default function handler(req, res) {
    if (req.method === 'GET') {
        return res.status(200).json(customers);
    } 

    if (req.method === 'DELETE') {
        try {
            const { id } = req.body; // Extract ID from request body

            console.log(`Received DELETE request for ID: ${id}`); // Debugging log

            if (!id) {
                return res.status(400).json({ message: "Customer ID is required" });
            }

            // Find customer index
            const customerIndex = customers.findIndex((customer) => customer.id.toString() === id);
            if (customerIndex === -1) {
                return res.status(404).json({ message: "Customer not found" });
            }

            // Remove the customer from the list
            customers.splice(customerIndex, 1);
            console.log("Updated Customers List:", customers); // Debugging log

            return res.status(200).json({ message: "Customer deleted successfully.", customers });
        } catch (error) {
            console.error("Error processing DELETE request:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } 
    
    // Handle unsupported methods
    return res.status(405).json({ message: "Method Not Allowed" });
}
