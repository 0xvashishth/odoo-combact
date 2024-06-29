'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const Profile = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');
    };

    if (user === null) {
        router.push('/login');
        return;
    }

    return (
        <div class="bg-white md:mx-auto rounded shadow-xl w-full md:w-full overflow-hidden mt-20 md:px-40">
            <div class="h-[140px] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <div class="px-5 py-2 flex flex-col gap-3 pb-6">
                <div class="h-[90px] shadow-md w-[90px] rounded-full border-4 overflow-hidden -mt-14 border-white"><img src="https://avatars.dicebear.com/api/gridy/xyz.svg" class="w-full h-full rounded-full object-center object-cover" /></div>
                <div class="">
                    <h3 class="text-xl text-slate-900 relative font-bold leading-6">{user.user.name}</h3>
                    <p class="text-sm text-gray-600">{user.user.email}</p>
                </div>
                <div class="flex gap-3 flex-wrap">
                    <span class="rounded-sm bg-green-100 px-3 py-1 text-xs font-medium text-green-800">Contact</span>
                    <span class="rounded-sm bg-yellow-100 px-3 text-xs font-medium text-yellow-800">{user.user.phone}</span>
                </div>

                <div class="flex gap-2">
                    <button type="button" class="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 transition hover:border-gray-300 active:bg-white hover:bg-gray-100 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300">Update Profile</button>

                    <button type="button" class="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-red-700 px-3 py-2 text-sm font-medium text-white transition hover:border-red-300 hover:bg-red-600 active:bg-red-700 focus:blue-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300" onClick={() => { handleLogout() }}>Logout ?</button></div>
                <h4 class="text-md font-medium leading-3">Address</h4>
                <p class="text-sm text-stone-500">1969 Rosewood Court, Rochester, Minnesota, 55902, United States</p>

                <h4 class="text-md font-medium leading-3">My Furniture Collection</h4>
                <div class="flex flex-col gap-3">
                    <div class="flex items-center gap-3 px-2 py-3 bg-white rounded border w-full ">
                        <img class="h-8 w-8 text-slate-500" height="1em" width="1em" src="https://www.google.com/imgres?q=coffee%20table%20photo&imgurl=http%3A%2F%2F5.imimg.com%2Fdata5%2FSELLER%2FDefault%2F2024%2F1%2F380302157%2FNF%2FCD%2FJO%2F47254332%2Fmodern-coffee-table.jpg&imgrefurl=https%3A%2F%2Fm.indiamart.com%2Fproddetail%2Fmodern-coffee-table-19191281773.html&docid=iz83IBzrsFoRrM&tbnid=aBvoUPTMz0q6zM&vet=12ahUKEwjl1aHT-oCHAxWr7zgGHS7uA2QQM3oFCIABEAA..i&w=1200&h=1600&hcb=2&ved=2ahUKEwjl1aHT-oCHAxWr7zgGHS7uA2QQM3oFCIABEAA" />
                        <div class="leading-3">
                            <a href="#"><p class=" text-sm font-bold text-slate-700">Coffee Table</p></a>
                            <span class="text-xs text-slate-600">2 months</span>
                        </div>
                        <p class="text-sm text-slate-500 self-start ml-auto">3 Months Left</p>
                    </div>
                    <div class="flex items-center gap-3 px-2 py-3 bg-white rounded border w-full ">
                        <img class="h-8 w-8 text-slate-500" height="1em" width="1em" src="https://www.google.com/imgres?q=coffee%20table%20photo&imgurl=http%3A%2F%2F5.imimg.com%2Fdata5%2FSELLER%2FDefault%2F2024%2F1%2F380302157%2FNF%2FCD%2FJO%2F47254332%2Fmodern-coffee-table.jpg&imgrefurl=https%3A%2F%2Fm.indiamart.com%2Fproddetail%2Fmodern-coffee-table-19191281773.html&docid=iz83IBzrsFoRrM&tbnid=aBvoUPTMz0q6zM&vet=12ahUKEwjl1aHT-oCHAxWr7zgGHS7uA2QQM3oFCIABEAA..i&w=1200&h=1600&hcb=2&ved=2ahUKEwjl1aHT-oCHAxWr7zgGHS7uA2QQM3oFCIABEAA" />
                        <div class="leading-3">
                            <a href="#"><p class=" text-sm font-bold text-slate-700">Dining Chairs</p></a>
                            <span class="text-xs text-slate-600">7 months</span>
                        </div>
                        <p class="text-sm text-slate-500 self-start ml-auto">3 Months Left</p>
                    </div>
                    <div class="flex items-center gap-3 px-2 py-3 bg-white rounded border w-full ">

                        <img class="h-8 w-8 text-slate-500" height="1em" width="1em" src="https://www.google.com/imgres?q=coffee%20table%20photo&imgurl=http%3A%2F%2F5.imimg.com%2Fdata5%2FSELLER%2FDefault%2F2024%2F1%2F380302157%2FNF%2FCD%2FJO%2F47254332%2Fmodern-coffee-table.jpg&imgrefurl=https%3A%2F%2Fm.indiamart.com%2Fproddetail%2Fmodern-coffee-table-19191281773.html&docid=iz83IBzrsFoRrM&tbnid=aBvoUPTMz0q6zM&vet=12ahUKEwjl1aHT-oCHAxWr7zgGHS7uA2QQM3oFCIABEAA..i&w=1200&h=1600&hcb=2&ved=2ahUKEwjl1aHT-oCHAxWr7zgGHS7uA2QQM3oFCIABEAA" />
                        <div class="leading-3">
                            <a href="#"><p class=" text-sm font-bold text-slate-700">Dining Table</p></a>
                            <span class="text-xs text-slate-600">7 Months</span>
                        </div>
                        <p class="text-sm text-slate-500 self-start ml-auto">3 Months Left</p>
                    </div>
                </div>
                <button type="button" class="inline-flex w-1/2 mx-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-blue-700 px-3 py-2 text-sm font-medium text-white transition hover:border-blue-300 hover:bg-blue-600 active:bg-blue-700 focus:blue-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300">View All Collections?</button>
                <br />
                <br />
                <h4 class="text-md font-medium leading-3">Past Rentals Portfolio</h4>
                <div class="flex flex-col gap-3">
                    <div class="flex items-center gap-3 px-2 py-3 bg-white rounded border w-full ">
                        <img class="h-8 w-8 text-slate-500" height="1em" width="1em" src="https://www.google.com/imgres?q=coffee%20table%20photo&imgurl=http%3A%2F%2F5.imimg.com%2Fdata5%2FSELLER%2FDefault%2F2024%2F1%2F380302157%2FNF%2FCD%2FJO%2F47254332%2Fmodern-coffee-table.jpg&imgrefurl=https%3A%2F%2Fm.indiamart.com%2Fproddetail%2Fmodern-coffee-table-19191281773.html&docid=iz83IBzrsFoRrM&tbnid=aBvoUPTMz0q6zM&vet=12ahUKEwjl1aHT-oCHAxWr7zgGHS7uA2QQM3oFCIABEAA..i&w=1200&h=1600&hcb=2&ved=2ahUKEwjl1aHT-oCHAxWr7zgGHS7uA2QQM3oFCIABEAA" />
                        <div class="leading-3">
                            <a href="#"><p class=" text-sm font-bold text-slate-700">Bunk Bed</p></a>
                            <span class="text-xs text-slate-600">Used 1 year</span>
                        </div>
                        <p class="text-sm text-slate-500 self-start ml-auto">Want to renew?</p>
                    </div>
                    <div class="flex items-center gap-3 px-2 py-3 bg-white rounded border w-full ">
                        <img class="h-8 w-8 text-slate-500" height="1em" width="1em" src="https://www.google.com/imgres?q=coffee%20table%20photo&imgurl=http%3A%2F%2F5.imimg.com%2Fdata5%2FSELLER%2FDefault%2F2024%2F1%2F380302157%2FNF%2FCD%2FJO%2F47254332%2Fmodern-coffee-table.jpg&imgrefurl=https%3A%2F%2Fm.indiamart.com%2Fproddetail%2Fmodern-coffee-table-19191281773.html&docid=iz83IBzrsFoRrM&tbnid=aBvoUPTMz0q6zM&vet=12ahUKEwjl1aHT-oCHAxWr7zgGHS7uA2QQM3oFCIABEAA..i&w=1200&h=1600&hcb=2&ved=2ahUKEwjl1aHT-oCHAxWr7zgGHS7uA2QQM3oFCIABEAA" />
                        <div class="leading-3">
                            <a href="#"><p class=" text-sm font-bold text-slate-700">Sectional Sofa</p></a>
                            <span class="text-xs text-slate-600">Used 2 years</span>
                        </div>
                        <p class="text-sm text-slate-500 self-start ml-auto">Want to renew?</p>
                    </div>
                    <div class="flex items-center gap-3 px-2 py-3 bg-white rounded border w-full ">
                        <img class="h-8 w-8 text-slate-500" height="1em" width="1em" src="https://www.google.com/imgres?q=coffee%20table%20photo&imgurl=http%3A%2F%2F5.imimg.com%2Fdata5%2FSELLER%2FDefault%2F2024%2F1%2F380302157%2FNF%2FCD%2FJO%2F47254332%2Fmodern-coffee-table.jpg&imgrefurl=https%3A%2F%2Fm.indiamart.com%2Fproddetail%2Fmodern-coffee-table-19191281773.html&docid=iz83IBzrsFoRrM&tbnid=aBvoUPTMz0q6zM&vet=12ahUKEwjl1aHT-oCHAxWr7zgGHS7uA2QQM3oFCIABEAA..i&w=1200&h=1600&hcb=2&ved=2ahUKEwjl1aHT-oCHAxWr7zgGHS7uA2QQM3oFCIABEAA" />
                        <div class="leading-3">
                            <a href="#"><p class=" text-sm font-bold text-slate-700">Bar Stools</p></a>
                            <span class="text-xs text-slate-600">Used 8 Months</span>
                        </div>
                        <p class="text-sm text-slate-500 self-start ml-auto">Want to renew?</p>
                    </div>
                </div>
                <button type="button" class="inline-flex w-1/2 mx-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-blue-700 px-3 py-2 text-sm font-medium text-white transition hover:border-blue-300 hover:bg-blue-600 active:bg-blue-700 focus:blue-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300">View All Past Collections?</button>
                <br />
                <br />
            </div>
        </div>
    );
}

export default Profile;