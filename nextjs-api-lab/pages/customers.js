
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';

 
export default function Customers() {
  const [customers, setCustomers] = useState([]);
  
  //implementing a simple search feature to search for customer by name
  const [searchTerm, setSearchTerm] = useState(""); //create state for search
  const [filteredCustomers, setFilteredCustomers] = useState([]); // ✅ Stores the filtered customer list

  //Fetch all customers
  useEffect(() => {
    fetch(`/api/customers`) 
      .then((res) => res.json())
     // .then((data) => setCustomers(data));
     .then((data)=>{
      setCustomers(data);
      setFilteredCustomers(data);
     });
}, []);

//function to filter customers when user types real-time
useEffect(()=>{
    const results = customers.filter((customer) =>
    customer.name.toLowerCase().startsWith(searchTerm.toLowerCase()) //Only matches names that start with input
  );
  setFilteredCustomers(results);
}, [searchTerm, customers]); //Runs every time searchTerm changes


 //related to search feature, filter customers based on search input
 const handleSearch=()=>{
  const results=customers.filter((customer)=>
  customer.name.toLowerCase().includes(searchTerm.toLowerCase()));
  setFilteredCustomers(results);
}
  // Adding Delete customer feature
  //1_Modify deleteCustomer to send "id" inside the request body, not the URL
  const deleteCustomer = async (id) => {
    const response = await fetch(`/api/customers`, { // API expects ID in body, not in URL
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id.toString() }), //ensure id is string
    });

    if (response.ok) {
      const updatedCustomers = customers.filter((customer) => customer.id !== id);
      setCustomers(updatedCustomers);
    } else {
      console.error("Failed to delete customer");
    }
};

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Customer List</h1>
       
       {/* Adding Search Bar (real-time filtering) */}
       <div className="mb-4 flex justify-center">
        <input 
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e)=> setSearchTerm(e.target.value)}
          className="text-black w-1/3 p-2 border border-grey-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
       />
       <button
       onClick={handleSearch} //search when clicked
       className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
      Search
      </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border-gray-500 bg-white shadow-md p-4">
            <thead className="bg-gray-200 text-blue-900 divide-x divide-gray-300">
              <tr className="border border-gray-300">
                <th className="border border-gray-300 p-4">ID</th>
                <th className="border border-gray-300 p-4">Name</th>
                <th className="border border-gray-300 p-4">Email</th>
                <th className="border border-gray-300 p-4">Phone</th>
                <th className="border border-gray-300 p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-x divide-gray-300">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-t text-center divide-x divide-gray-300">
                    <td className="px-4 py-2 text-black">{customer.id}</td>
                    <td className="px-4 py-2 text-black">
                      <Link href={`/customers/${customer.id}`} className="text-blue-600 hover:underline">
                        {customer.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-black">{customer.email}</td>
                    <td className="px-4 py-2 text-black">{customer.phone}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => deleteCustomer(customer.id)}
                        className="bg-red-400 text-white px-4 py-1 rounded hover:bg-red-700 font-bold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}