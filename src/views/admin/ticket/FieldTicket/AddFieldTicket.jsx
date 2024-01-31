import React, { useState, useEffect } from "react";
import EquipementList from "views/Modals/EquipementList";
import TechnicienList from "views/Modals/ListeTechnicien";
const AddFieldTicket = () => {
  const [isTechnicienModalOpen, setTechnicienModalOpen] = useState(false);
  const [isEquipementModalOpen, setEquipementModalOpen] = useState(false);
  const [equipement_sn,setequipement_sn] = useState('')
  const [firstname,setFirstname] = useState('')
  const [lastname,setLastname] = useState('')
  const [technicien,setTechnicien] = useState('')
  const [service_no,setServiceNo] = useState('')
  const [client,setClient] = useState('')
  const [adresse,setAdresse] = useState('')
  const [equipement_type,setEquipementType] = useState('')
  const [garantie_start_date,setGarantieStart]= useState('')
  const [garantie_end_date,setGarantieEnd]  = useState('')
  const[geolocalisation,setGeolocalisation] = useState('')

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
  const handleTechnicienSelection = (technicienInfo) => {
    setFirstname(technicienInfo.firstname);
    setLastname(technicienInfo.lastname);
    setTechnicien(technicienInfo._id);
    console.log("Selected technicien ID:", technicienInfo._id);
    closeTechnicienModal();
};
const handleEquipementSelection = (selectedEquipements) => {
  console.log(selectedEquipements);
  setequipement_sn(selectedEquipements.equipement_sn)
  closeEquipementModal()
  setServiceNo(selectedEquipements.service_no)
  setClient(selectedEquipements.client)
  setAdresse(selectedEquipements.adresse)
  setEquipementType(selectedEquipements.equipement_type)
  setGarantieStart(selectedEquipements.garantie_start_date)
  setGarantieEnd(selectedEquipements.garantie_end_date)
  setGeolocalisation(selectedEquipements.geolocalisation)
};

  return (
    <>
      <h1 className="text-[1.7em]  mb-2.5 mx-0 text-center font-semibold text-navy-700 dark:text-gray-500">Ajouter Field Ticket :</h1>
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="first-name" class="block  font-medium leading-6 text-gray-900 dark:text-gray-600">Equipement S/N</label>
              <div class="mt-2">
                <input type="text"
                 placeholder={equipement_sn ? equipement_sn : ''}
                 value={equipement_sn ? equipement_sn : ''}
                  onClick={openEquipementModal}
                  name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm: sm:leading-6" />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="last-name" class="block  font-medium leading-6 text-gray-900 dark:text-gray-600">Client</label>
              <div class="mt-2">
                <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm: sm:leading-6" />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="first-name" class="block  font-medium leading-6 text-gray-900 dark:text-gray-600">Call in time</label>
              <div class="mt-2">
                <input type="datetime-local" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm: sm:leading-6" />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="service-type" class="block font-medium leading-6 text-gray-900 dark:text-gray-600">Service Type</label>
              <div class="mt-2">
                <select name="service-type" id="service-type" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm: sm:leading-6">
                  <option value="option1">Corrective Maintenance</option>
                  <option value="option2">Preventive Maintenance</option>
                  <option value="option3">Staging Service</option>
                  <option value="option3">Installation-Onsite inpection</option>
                  <option value="option3">Installation-Physical Installation</option>
                  <option value="option3">Installation-Online Activation</option>
                  <option value="option3">Hardware-Online update</option>
                  <option value="option3">Software-upgrade update</option>
                  <option value="option3">Removal</option>
                  <option value="option3">Disable</option>
                  <option value="option3">Other</option>
                </select>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="first-name" class="block  font-medium leading-6 text-gray-900 dark:text-gray-600">Service Status</label>
              <div class="mt-2">
                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm: sm:leading-6" />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="last-name" class="block  font-medium leading-6 text-gray-900 dark:text-gray-600">Technicien</label>
              <div class="mt-2">
                <input type="text"
                  placeholder={firstname ? firstname : ''}
                  value={firstname ? firstname : ''}
                  onClick={openTechnicienModal}
                  name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm: sm:leading-6" />
              </div>
            </div> <div class="sm:col-span-3">
              <label for="first-name" class="block  font-medium leading-6 text-gray-900 dark:text-gray-600">Reference number</label>
              <div class="mt-2">
                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm: sm:leading-6" />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="last-name" class="block  font-medium leading-6 text-gray-900 dark:text-gray-600">Contact Person</label>
              <div class="mt-2">
                <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm: sm:leading-6" />
              </div>
            </div> <div class="sm:col-span-3">
              <label for="first-name" class="block  font-medium leading-6 text-gray-900 dark:text-gray-600">Equipement type</label>
              <div class="mt-2">
                <input 
                  placeholder={equipement_type ? equipement_type : ''}
                  value={equipement_type ? equipement_type : ''}
                type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm: sm:leading-6" />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="first-name" class="block  font-medium leading-6 text-gray-900 dark:text-gray-600">Service station</label>
              <div class="mt-2">
                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm: sm:leading-6" />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="last-name" class="block  font-medium leading-6 text-gray-900 dark:text-gray-600">Garantie End Date</label>
              <div class="mt-2">
              </div>
            </div> <div class="sm:col-span-3">
              <label for="first-name" class="block  font-medium leading-6 text-gray-900 dark:text-gray-600">Garantie Start Date</label>
              <div class="mt-2">
              </div>
            </div>
            <div class="col-span-full">
              <label for="about" class="block  font-medium leading-6 text-gray-900 dark:text-gray-600">Description</label>
              <div class="mt-2">
                <textarea id="about" name="about" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm: sm:leading-6"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isTechnicienModalOpen && <TechnicienList handleClose={closeTechnicienModal} handleTechnicienSelection={handleTechnicienSelection} />}
      {isEquipementModalOpen && <EquipementList handleClose={closeEquipementModal} handleEquipementSelection={handleEquipementSelection}/>}

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class=" font-semibold leading-6 text-gray-900">Cancel</button>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2  font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
      </div>
    </>)
}
export default AddFieldTicket