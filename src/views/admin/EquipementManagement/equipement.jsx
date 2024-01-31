import React, { useState, useEffect } from 'react'
import { IoMdAdd, IoMdDoneAll, IoMdEye} from 'react-icons/io'
import { MdDelete, MdEdit } from 'react-icons/md';
import { format, differenceInMonths } from 'date-fns';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ManagementEquipement = () => {
    const [equipementData, setEquipementData] = useState([]);
    const [selectedEquipementIds, setSelectedEquipementIds] = useState([]);
    const [selectedEquipement, setSelectedEquipement] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleOpenModal = (selectedEquipement) => {
        setSelectedEquipement(selectedEquipement);
        setIsModalOpen(true);
    }
    const handleCheckboxChange = equipementId => {
        setSelectedEquipementIds(prevSelectedIds => {
            if (prevSelectedIds.includes(equipementId)) {
                return prevSelectedIds.filter(id => id !== equipementId);
            } else {
                return [...prevSelectedIds, equipementId];
            }
        });
        console.log(equipementId)
    };
    useEffect(() => {
        fetch('/api/equi/list')
            .then(response => response.json())
            .then(data => setEquipementData(data))
            .catch(error => console.error('Error fetching contrat data:', error));

    }, []);
    const handleDeleteClick = () => {
    };
    const [scnquery, setSCNQuery] = useState("");
    return (
        <div>
            <div className="mt-9 relative overflow-x-auto shadow-lg sm:rounded-lg">
                <div className="ml-2 flex items-center flex-wrap space-x-5">
                <a href='/admin/add/equipement'><button className="dark:text-gray-300 flex text-gray-900 dark:text-gray-600"><IoMdAdd className="h-6 w-6" />Add</button></a>
                    <Link to={selectedEquipementIds.length === 1 ? `/admin/equipement/${selectedEquipementIds[0]}` : '#'}>
                        <button
                            className={`text-gray-900 dark:text-gray-300 flex dark:text-gray-600 ${selectedEquipementIds.length !== 1 ? 'cursor-not-allowed' : ''}`}
                            onClick={() => {
                                if (selectedEquipementIds.length !== 1) {
                                    Swal.fire({
                                        icon: 'warning',
                                        title: 'Please select one equipement',
                                    });
                                }
                            }}
                        >
                            <IoMdEye className="h-6 w-6" />
                            View
                        </button>
                    </Link>                    
                    <button className=" text-gray-900 dark:text-gray-300 flex  dark:text-gray-600"><MdDelete className="h-6 w-6" />Delete<a href='/admin/equipement/modifier'></a></button>
                </div>
                <br />
                <div className="ml-4 flex items-center flex-wrap space-x-5">
                    <label htmlFor="search" className=" text-gray-700    dark:text-gray-300">
                        Equipement S/N :     
                     </label>
                    <input
                        type="text"
                        id="search"
                        className="block p-2 text-sm text-gray-700 border border-gray-300 rounded-lg w-40 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search"
                        onChange={(e) => setSCNQuery(e.target.value)}
                    />
                </div>
                <div className="border-b border-gray-900/10 pb-6">
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full sm:table lg:table text-sm text-left rtl:text-right  text-gray-900 dark:text-gray-900">
                        <thead className="overflow-x-auto text-xs uppercase bg-gray-50 dark:bg-gray-900 ">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="checkbox-all-search" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-gray-900   dark:text-gray-300">
                                    Equipement S/N </th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300" >
                                    Equipement Type </th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300">
                                    Terminal No </th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300">
                                    Client </th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300">
                                    Status </th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300">
                                    Modéle</th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300">
                                    Date création</th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300">
                                    Modifier</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipementData
                                .filter((equipement) =>
                                    Object.values(equipement)
                                        .filter((value) => typeof value === "string")
                                        .some((value) => value.toLowerCase().includes(scnquery.toLowerCase()))
                                )
                                .map((equipement, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                            <input
                                                    id={`checkbox-table-search-${index}`}
                                                    type="checkbox"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    checked={selectedEquipementIds.includes(equipement._id)}
                                                    onChange={() => handleCheckboxChange(equipement._id)}
                                                />
                                                <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
                                                    checkbox
                                                </label>
                                            </div>
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {equipement.equipement_sn}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {equipement.equipement_type}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {equipement.terminal_no}
                                        </td> <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {equipement.client}                                </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {equipement.status}</td>
                                        <td className="px-6 py-4">
                                            {equipement.modele}   </td>
                                        <td className="px-6 py-4">
                                        {/*format(new Date(equipement.createdAt || 'N/A'), 'yyyy/MM/dd')*/}
                                        </td>
                                        <td className="px-6 py-4">
                                        <button scope="row" className=" px-6 py-4  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <MdEdit className="h-6 w-6" /></button>
                                        </td>
                                    </tr>)
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                <span className="text-sm font-normal  text-gray-900    dark:text-gray-300 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight  text-gray-900 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">1</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight  text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight  text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">3</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight  text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight  text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight  text-gray-900 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default ManagementEquipement;