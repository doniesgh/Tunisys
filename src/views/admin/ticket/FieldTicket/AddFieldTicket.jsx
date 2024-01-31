import React, { useState, useEffect } from "react";
import EquipementList from "views/Modals/EquipementList";
import TechnicienList from "views/Modals/ListeTechnicien";
import axios from "axios"; // Correction : axios doit être importé depuis 'axios', pas 'react'
import { toast, ToastContainer } from "react-toastify";
const AddFieldTicket = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [equipement_type, setEquipementType] = useState("");
  const [fault_type, setFault_tpe] = useState("");
  //  const [client, setClient] = useState("");
  const [technicien, setTechnicien] = useState("");
  const [StartGarantie_Date, setStartGarantieDate] = useState("");
  const [EndGarantie_Date, setEndGarantieDate] = useState("");
  const [calltime, setCallTime] = useState("");
  const [contact, setContactPerson] = useState("");
  const [service_station, setservice_station] = useState("");
  const [equipement, setEquipement] = useState("");
  const [service_type, setServiceType] = useState("");
  const [service_status, setServiceStatus] = useState("");
  const [reference_number, setReferenceNumber] = useState("");
  const [isTechnicienModalOpen, setTechnicienModalOpen] = useState(false);
  const [isEquipementModalOpen, setEquipementModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  const handleClientSelection = (clientInfo) => {
    
};
  {/*useEffect(() => {
    // Effectuez une requête pour récupérer la liste des utilisateurs
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user/list");
        const userData = await response.json();

        if (response.ok) {
          setUsers(userData);
        } else {
          console.error("Erreur lors de la récupération des utilisateurs");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
      }
    };

    fetchUsers();
  }, []);*/}
  const Add = async (e) => {
    e.preventDefault();

    try {
      let technicienData;

      // Check if selectedUser is an object
      if (typeof selectedUser === "object") {
        technicienData = selectedUser;
      } else {
        // If selectedUser is a string (ID), fetch details from the API
        const technicienResponse = await fetch(`/api/user/id/${selectedUser}`, {
          method: "GET",
        });

        technicienData = await technicienResponse.json();

        if (!technicienResponse.ok) {
          console.error(
            "Erreur lors de la récupération des détails du technicien"
          );
          setError("Erreur lors de la récupération des détails du technicien");
          return;
        }
      }

      // Envoi du ticket avec les détails du technicien
      const ticketData = {
        equipement,
        equipement_type,
        service_status,
        StartGarantie_Date,
        technicien: technicienData, // Use the technicienData directly
        //   client,
        contact,
        localisation,
        service_station,
        fault_type,
        EndGarantie_Date,
      };

      const response = await fetch("/api/field/add", {
        method: "POST",
        body: JSON.stringify(ticketData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.error("Erreur lors de l'envoi du ticket", json.error);
        setError(json.error);
        return;
      }

      // Réussite
      setEquipement("");
      setError(null);

      // Use the firstname from the correct object
      const technicienFirstname = technicienData.firstname;

      toast.success(`Field ticket envoyé`);
      console.log("Request sent successfully");
    } catch (error) {
      console.error("Error:", error);
      setError(
        "Une erreur s'est produite lors de la soumission du formulaire."
      );
    }
  };

  const openTechnicienModal = () => {
    setTechnicienModalOpen(true);
  };

  const closeTechnicienModal = () => {
    setTechnicienModalOpen(false);
  };

  const openEquipementModal = () => {
    setEquipementModalOpen(true);
  };

  const closeEquipementModal = () => {
    setEquipementModalOpen(false);
  };
  const handleUserChange = (event) => {
    const userId = event.target.value;
    setSelectedUser(userId);
  };

  return (
    <>
      <ToastContainer />
      <h1 className="mx-0  mb-2.5 text-center text-[1.7em] font-semibold text-navy-700 dark:text-gray-500">
        Ajouter Field Ticket :
      </h1>
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label
                for="first-name"
                class="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Equipement S/N
              </label>
              <div class="mt-2">
                <input
                  value={equipement}
                  onChange={(e) => setEquipement(e.target.value)}
                  type="text"
                   onClick={openEquipementModal}
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label
                for="last-name"
                class="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Client
              </label>
              <div class="mt-2">
                <input
                  //  value={client}
                  //  onChange={(e) => setClient(e.target.value)}
                  type="text"
                  name="last-name"
                  id="last-name"
                  autocomplete="family-name"
                  class="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="user-list"
                className="block font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Technicien
              </label>
              <div className="mt-2">
              <input
                 onClick={openTechnicienModal}
                  value={technicien}
                  type="text" // Change the type to datetime-local

                  class="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block sm:leading-6"
                />
               { /*<select
                  value={selectedUser}
                  onChange={handleUserChange}
                  name="user-list"
                  id="user-list"
                  className="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                >
                  <option value="">Sélectionnez un utilisateur</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.firstname} {user.lastname}
                    </option>
                  ))}
                  </select>*/}
              </div>
            </div>
            <div class="sm:col-span-3">
              <label
                for="call-in-time"
                class="block font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Call in time
              </label>
              <div class="mt-2">
                <input
                  value={calltime}
                  onChange={(e) => setCallTime(e.target.value)}
                  type="datetime-local" // Change the type to datetime-local
                  name="call-in-time" // Provide a unique name for the input
                  id="call-in-time"
                  class="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block sm:leading-6"
                />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label
                for="service-type"
                class="block font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Service Type
              </label>
              <div class="mt-2">
                <select
                  value={service_type}
                  onChange={(e) => setServiceType(e.target.value)}
                  name="service-type"
                  id="service-type"
                  class="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                >
                  <option value="option1">Corrective Maintenance</option>
                  <option value="option2">Preventive Maintenance</option>
                  <option value="option3">Staging Service</option>
                  <option value="option3">Installation-Onsite inpection</option>
                  <option value="option3">
                    Installation-Physical Installation
                  </option>
                  <option value="option3">
                    Installation-Online Activation
                  </option>
                  <option value="option3">Hardware-Online update</option>
                  <option value="option3">Software-upgrade update</option>
                  <option value="option3">Removal</option>
                  <option value="option3">Disable</option>
                  <option value="option3">Other</option>
                </select>
              </div>
            </div>
            <div class="sm:col-span-3">
              <label
                for="first-name"
                class="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Service Status
              </label>
              <div class="mt-2">
                <input
                  value={service_status}
                  onChange={(e) => setServiceStatus(e.target.value)}
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label
                for="first-name"
                class="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Reference number
              </label>
              <div class="mt-2">
                <input
                  value={reference_number}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label
                for="last-name"
                class="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Contact Person
              </label>
              <div class="mt-2">
                <input
                  value={contact}
                  onChange={(e) => setContactPerson(e.target.value)}
                  type="text"
                  name="last-name"
                  id="last-name"
                  autocomplete="family-name"
                  class="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
              </div>
            </div>{" "}
            <div class="sm:col-span-3">
              <label
                for="first-name"
                class="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Equipement type
              </label>
              <div class="mt-2">
                <input
                  value={equipement_type}
                  onChange={(e) => setEquipementType(e.target.value)}
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label
                for="first-name"
                class="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Service station
              </label>
              <div class="mt-2">
                <input
                  value={localisation}
                  onChange={(e) => setLocalisation(e.target.value)}
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label
                for="last-name"
                class="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Garantie End Date
              </label>
              <input
                value={EndGarantie_Date}
                onChange={(e) => setEndGarantieDate(e.target.value)}
                type="date"
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                class="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
              />
              <div class="mt-2"></div>
            </div>{" "}
            <div class="sm:col-span-3">
              <label
                for="first-name"
                class="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Garantie Start Date
              </label>
              <input
                value={StartGarantie_Date}
                onChange={(e) => setStartGarantieDate(e.target.value)}
                type="date"
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                class="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
              />
              <div class="mt-2"></div>
            </div>
            <div class="col-span-full">
              <label
                for="about"
                class="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Description
              </label>
              <div class="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows="3"
                  class="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isTechnicienModalOpen && (
        <TechnicienList handleClose={closeTechnicienModal}  handleTechnicienSelection={handleClientSelection} />
      )}
      {isEquipementModalOpen && (
        <EquipementList handleClose={closeEquipementModal}  handleEquipementSelection={handleClientSelection}  />
      )}

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class=" font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          onClick={Add}
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2  font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </>
  );
};
export default AddFieldTicket;
