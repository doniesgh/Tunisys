import React from 'react';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ModifyService = ({ handleClose, service }) => {
    console.log(service)
    const [service_no, setservice_no] = useState(service?.service_no || "");
    const [contrat_sn, setcontrat_sn] = useState(service?.contrat_sn || "");
    const [effective_date, seteffective_date] = useState(service?.effective_date || "");
    const [termination_date, settermination_date] = useState(service?.termination_date || "");
    const [error, setError] = useState(null)
    useEffect(() => {
        setservice_no(service?.service_no || "");
        setcontrat_sn(service?.contrat_sn || "");
        seteffective_date(service?.effective_date || "");
        settermination_date(service?.termination_date || "");
    }, [service]);
  return (
    <>
    <ToastContainer />
    <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center " >
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg rounded-md bg-white p-8 border-2 shadow-lg border-tunisys-100 dark:bg-gray-900">
            <div className="overflow-x-auto">
                <h1 className="text-[1.7em]  mb-2.5 mx-0 text-center font-semibold dark:text-gray-600">Modifier contrat:</h1>
                <div className="space-y-1">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">
                                    Service  No  </label>
                                <div className="">
                                    <input type="text"
                                        value={service_no}
                                        onChange={(e) => setservice_no(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">
                                    Contrat S/N  </label>
                                <div className="">
                                    <input type="text"
                                        value={contrat_sn}
                                        onChange={(e) => setcontrat_sn(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">
                                    Effective Date</label>
                                <div className="">
                                    <div className="">
                                        <input
                                            type="date"
                                            value={effective_date && !isNaN(new Date(effective_date).getTime()) ? new Date(effective_date).toISOString().split('T')[0] : ""}
                                            onChange={(e) => seteffective_date(e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>

                                </div>

                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">
                                    Termination Date
                                </label>
                                <div >
                                    <input type="date"
                                        value={termination_date && !isNaN(new Date(termination_date).getTime()) ? new Date(termination_date).toISOString().split('T')[0] : ""}
                                        onChange={(e) => settermination_date(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                           

                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" onClick={handleClose} className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                </div>
                {error && <div className="error border rounded mx-0 my-5 p-2.5 border-solid bg-red-300">{error}</div>}

            </div>
        </div>
    </div>
</>
  )
}

export default ModifyService