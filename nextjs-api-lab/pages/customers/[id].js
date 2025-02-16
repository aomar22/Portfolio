import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
 
export default function CustomerDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [customer, setCustomer] = useState(null);
 
  useEffect(() => {
    if (id) {
      fetch(`/api/customers/${id}`)
        .then((res) => res.json())
        .then((data) => setCustomer(data));
    }
  }, [id]);
 
  if (!customer) 
    return <p className="text-center text-grey=600 mt-10">Loading...</p>;
 
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-grey-100 container mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-xl w-96 border border-grey-300">
        <h1 className="text-center text-blue-700 text-3xl font-bold">{customer.name}</h1>
        <div className="mt-6 space-y-4">
          <p className="text-gray-700 text-lg">
            <strong>Email:</strong> <span className="text-grey-1000">{customer.email}</span>
            </p>
          <p className="text-gray-700 text-lg">
              <strong>Phone:</strong> <span className="text-gray-1000">{customer.phone}</span>
            </p>
      </div>
    </div>
   </div>
  </div>
);
}