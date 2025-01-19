"use client";


export default function login(){
    return(
        <div className="bg-cream-white flex items-center justify-center h-screen">
            {/* Top left on home page */}
            <div className="flex justify-between items-center p-4">
                <div className="text-xl font-bold text-black">calorific</div> {/* change font of this */}
                <div className="text-2xl cursor-pointer text-black">
                    <span className="material-icons">
                    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="2" x2="23.8924" y2="2" stroke="#878787" strokeWidth="4"/>
                        <line x1="0.107635" y1="20" x2="24" y2="20" stroke="#878787" strokeWidth="4"/>
                        <line x1="0.107635" y1="11" x2="24" y2="11" stroke="#878787" strokeWidth="4"/>
                    </svg>
                </span>
                </div>
            </div>
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
                <button type="submit" className="w-full bg-light-orange text-white py-2 rounded-lg hover:bg-theme-orange focus:outline-none focus:ring-2 focus:ring-blue-500">Log in</button>
            </form>
        </div>
    );
}