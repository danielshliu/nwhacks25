"use client";


export default function login(){
    return(
        <div className="bg-theme-orange flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>
                <form action="#" method="POST">
                    <div className="mb-4">
                        <label for="email" className="block text-gray-700">Email</label>
                        <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                    </div>
                    <div className="mb-6">
                        <label for="password" className="block text-gray-700">Password</label>
                        <input type="password" id="password" name="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Login</button>
                </form>
            </div>
        </div>
    );
}