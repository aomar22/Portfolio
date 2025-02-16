
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';

export default function Home() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Form Submitted:", data);
        alert(`Form submitted successfully!\nName: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone}`);
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Submit Form</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="bg-black p-6 shadow-md rounded-md text-black">
                    
                    {/* Full Name Field */}
                    <label className="block font-medium text-white">Full Name:</label>
                    <input
                        type="text"
                        {...register("fullName", { required: "Full Name is required", maxLength: 50 })}
                        className={`border p-2 w-full ${errors.fullName ? "border-red-500" : ""}`}
                    />
                    {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
                
                    {/* Email Field */}
                    <label className="block font-medium text-white">Email:</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" }
                        })}
                        className={`border p-2 w-full ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    {/* Phone Field */}
                    <label className="block font-medium text-white">Phone:</label>
                    <input
                        type="tel"
                        {...register("phone", {
                            required: "Phone number is required",
                            pattern: { value: /^[0-9]{10,15}$/, message: "Phone must be 10-15 digits and numeric" }
                        })}
                        className={`border p-2 w-full ${errors.phone ? "border-red-500" : ""}`}
                    />
                    {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md disabled:bg-gray-300"
                        disabled={Object.keys(errors).length > 0}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
