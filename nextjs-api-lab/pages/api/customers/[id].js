import customersData from '../../../data/customers.json';

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ message: "Customer ID is required" });
    }

    // Find the customer in the JSON data
    const customer = customersData.find((c) => c.id.toString() === id);

    if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
    }

    return res.status(200).json(customer);
}
