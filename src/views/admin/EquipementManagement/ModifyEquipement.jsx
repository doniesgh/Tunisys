import React from "react";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Equipement from "../equipement";

const ModifyClient = ({ handleClose, equipement }) => {
  const [error, setError] = useState(null);
  console.log(equipement);

  const [newEquipement_sn, setnewEquipement_sn] = useState(
    equipement?.equipement_sn || ""
  );
  const [newModele, setnewModele] = useState(equipement?.modele || "");
  const [newCodeBureau, setnewCodeBureau] = useState(
    equipement?.code_bureau || ""
  );
  const [newEquipement_type, setnewEquipement_type] = useState(
    equipement?.equipement_type || ""
  );
  const [newTerminal_no, setnewTerminal_no] = useState(
    equipement?.terminal_no || ""
  );
  const [newservice_station, setnewservice_station] = useState(
    equipement?.service_station || ""
  );
  const [newclient, setnewclient] = useState(equipement?.client || "");
  const [newStaus, setnewStatus] = useState(equipement?.status || "");
  const [newadresse, setnewadresse] = useState(equipement?.adresse || "");
  const [newbranch_type, setnewbranch_type] = useState(
    equipement?.branch_type || ""
  );

  /*  useEffect(() => {
    console.log("Current equipement prop:", equipement);
    setnewModele(equipement?.modele || "");
    setnewEquipement_sn(equipement?.equipement_sn || "");
  }, [equipement]); */

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("bouton appuyé");
    const equipementData = {
      equipement_sn: newEquipement_sn,
      code_bureau: newCodeBureau,
      modele: newModele,
      equipement_type: newEquipement_type,
      terminal_no: newTerminal_no || "",
      client: newclient || "",
      adresse: newadresse,
      service_station: newservice_station || "",
      status: newStaus,
      branch_type: newbranch_type || "",
    };

    if (equipement && equipement._id) {
      try {
        const response = await fetch(`/api/equi/${equipement._id}`, {
          method: "PATCH",
          body: JSON.stringify(equipementData),
          headers: {
            "Content-type": "application/json",
          },
        });

        let responseData;

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 400 && errorData.error) {
            setError(errorData.error.toString());
          } else {
            throw new Error(errorData.error || "Error modifying equipment");
          }
        } else {
          responseData = await response.json();
          console.log("Updated equipment data:", responseData);
          handleClose();
        }
      } catch (error) {
        setError(error.toString());
      }
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center ">
        <div className="relative transform overflow-hidden rounded-lg rounded-md border-2 border-tunisys-100 bg-white bg-white p-8 text-left shadow-xl shadow-lg transition-all dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-lg">
          <h1 className="text-!center">Modifier Equipement</h1>
          <div className="overflow-x-auto">
            <div className="space-y-1">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Client"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600"
                    >
                      equipement_sn
                    </label>
                    <div className="">
                      <input
                        type="text"
                        value={newEquipement_sn}
                        onChange={(e) => setnewEquipement_sn(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Client"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600"
                    >
                      modele
                    </label>
                    <div className="">
                      <input
                        type="text"
                        value={newModele}
                        onChange={(e) => setnewModele(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Client"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600"
                    >
                      code_bureau
                    </label>
                    <div className="">
                      <input
                        type="text"
                        value={newCodeBureau}
                        onChange={(e) => setnewCodeBureau(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Client"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600"
                    >
                      equipement_type
                    </label>
                    <div className="">
                      <input
                        type="text"
                        value={newEquipement_type}
                        onChange={(e) => setnewEquipement_type(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Client"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600"
                    >
                      Terminam_no
                    </label>
                    <div className="">
                      <input
                        type="text"
                        value={newTerminal_no}
                        onChange={(e) => setnewTerminal_no(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Client"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600"
                    >
                      service_station
                    </label>
                    <div className="">
                      <input
                        type="text"
                        value={newservice_station}
                        onChange={(e) => setnewservice_station(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Client"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600"
                    >
                      client
                    </label>
                    <div className="">
                      <input
                        type="text"
                        value={newclient}
                        onChange={(e) => setnewclient(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Client"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600"
                    >
                      status
                    </label>
                    <div className="">
                      <input
                        type="text"
                        value={newStaus}
                        onChange={(e) => setnewStatus(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Client"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600"
                    >
                      adresse
                    </label>
                    <div className="">
                      <input
                        type="text"
                        value={newadresse}
                        onChange={(e) => setnewadresse(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="Client"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600"
                    >
                      branch_type
                    </label>
                    <div className="">
                      <input
                        type="text"
                        value={newbranch_type}
                        onChange={(e) => setnewbranch_type(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6">
              <button
                type="button"
                onClick={handleClose}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                save
              </button>
            </div>
            {/*error && <div className="error border rounded mx-0 my-5 p-2.5 border-solid bg-red-300">{error}</div>*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModifyClient;
