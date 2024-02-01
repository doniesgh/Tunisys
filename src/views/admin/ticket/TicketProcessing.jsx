import React, { useState } from 'react';

const TicketProcessing = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };
    return (
        <div>
            <div class="mt-9 relative overflow-x-auto shadow-lg sm:rounded-lg">
                <div className=" mt-2 flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4 ml-2">

                    <div className="relative inline-block text-left">
                        <button
                            id="dropdownRadioButton"
                            type="button"
                            className="text-tunisys-100 inline-flex items-center bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            onClick={toggleDropdown}
                        >
                            Field Tickets
                            <svg
                                className="w-2.5 h-2.5 ms-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="origin-top-right absolute right-0 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:divide-gray-700" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <div className="py-1">
                                    <a href="/admin/processing/phone" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-red-500" role="menuitem">Phone Tickets</a>

                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center flex-wrap space-x-5">
                        <label htmlFor="search" className="text-gray-500 dark:text-gray-400">
                            No Ticket:
                        </label>
                        <input
                            type="text"
                            id="search"
                            className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-40 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search"
                        />
                        <label htmlFor="search" className="text-gray-500 dark:text-gray-400">
                            Equipement S/N :      </label>
                        <input
                            type="text"
                            id="search"
                            className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-40 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search"
                        />

                        <label htmlFor="status" className="text-gray-500 dark:text-gray-400">
                            Status:
                        </label>
                        <select
                            id="status"
                            className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-24 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="active">en cours</option>
                            <option value="inactive">Inactive</option>
                        </select>

                        <label htmlFor="date" className="text-gray-500 dark:text-gray-400">
                            Date:
                        </label>
                        <input
                            type="date"
                            id="date"
                            className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-32 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <label htmlFor="technicien" className="text-gray-500 dark:text-gray-400">
                            Technicien:
                        </label>
                        <input
                            type="text"
                            id="technicien"
                            className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-32 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />


                        <button
                            type="button"
                            className="inline-flex ml-[-5px] items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-900 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        >
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>

                            Search

                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full sm:table lg:table text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="overflow-x-auto text-xs text-gray-700 uppercase bg-gray-50 dark:bg-red-900 dark:text-white">
                            <tr className="">
                                <th scope="col" class="p-4">
                                    <div class="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ticket No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Equipement S/N
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Service Station
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Service type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Fault Level
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Response Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Fixing Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Resolution Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Client
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Localisation
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Technicien
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Receiving Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Departure Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Arrival Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Completion Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Create Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Dispatch Time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input
                                            id="checkbox-table-search-1"
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </td>
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Apple MacBook Pro 17"
                                </td>

                                <td className="px-6 py-4 bg-tunisys-100 text-white">
                                    en cours                                </td>
                                <td className="px-6 py-4">
                                    Silver
                                </td> <td className="px-6 py-4">
                                    Silver
                                </td> <td className="px-6 py-4">
                                    Silver
                                </td> <td className="px-6 py-4">
                                    Silver
                                </td> <td className="px-6 py-4">
                                    Silver
                                </td> <td className="px-6 py-4">
                                    Silver
                                </td>
                                <td className="px-6 py-4 flex "> <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>  Online

                                </td>
                                <td className="px-6 py-4">
                                    Silver
                                </td>
                                <td className="px-6 py-4">
                                    Laptop
                                </td>
                                <td className="px-6 py-4">
                                    $2999
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>


                        </tbody>
                    </table>
                </div>
            </div>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">1000</span></span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">1</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">3</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default TicketProcessing;
