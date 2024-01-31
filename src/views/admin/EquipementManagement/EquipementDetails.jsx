import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EquipementDetails = () => {
  const { equipementId } = useParams();
  const [equipementDetails, setEquipementDetails] = useState(null);
  useEffect(() => {
    if (equipementId) {
      fetch(`/api/equi/${equipementId}`)
        .then((response) => response.json())
        .then((data) => setEquipementDetails(data))
        .catch((error) =>
          console.error("Error fetching equipement details:", error)
        );
    }
  }, [equipementId]);
  if (!equipementDetails) {
    return <div>Loading...</div>;
  }
  console.log(equipementDetails);
  return (
    <>
      <h1 className="text-text-navy-900 mx-0 mb-2.5 text-center text-[1.7em] font-semibold dark:text-gray-600">
        Equipement S/N : {equipementDetails.equipement_sn}
      </h1>

      <div className="min-w-screen dark:bg-text-navy-900 relative mx-auto my-5 rounded-2xl bg-white p-5 py-10 shadow-[2px_2px_5px_rgba(0,0,0,0.05)]">
        <div class=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${
                equipementDetails.terminal_no ? "navy-900" : "red-700"
              } dark:text-gray-200`}
            >
              <strong className="text-navy-900">Numéro terminal :</strong>
              {equipementDetails.terminal_no
                ? equipementDetails.terminal_no
                : "Non rempli"}
            </p>
          </div>
          <div class="flex  sm:col-span-3">
            <strong className="text-navy-900"> Status:</strong>
            <p
              className={`ml-2 mb-1 text-${
                equipementDetails.status ? "navy-900" : "red-700"
              } dark:text-gray-200`}
            >
              {equipementDetails.status
                ? equipementDetails.status
                : "Non rempli"}{" "}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <strong className="text-navy-900">Equipement Type : </strong>
            <p
              className={`mb-1 text-${
                equipementDetails.equipement_type ? "navy-900" : "red-700"
              } dark:text-gray-200`}
            >
              {equipementDetails.equipement_type
                ? equipementDetails.equipement_type
                : "Non rempli"}{" "}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <strong className="text-navy-900">Client : </strong>
            <p
              className={`mb-1 text-${
                equipementDetails.client ? "navy-900" : "red-700"
              } dark:text-gray-200`}
            >
              {equipementDetails.client
                ? equipementDetails.client
                : "Non rempli"}{" "}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <strong className="text-navy-900">Service Station : </strong>
            <p
              className={`mb-1 text-${
                equipementDetails.service_station ? "navy-900" : "red-700"
              } dark:text-gray-200`}
            >
              {equipementDetails.service_station
                ? equipementDetails.service_station
                : "Non rempli"}{" "}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <strong className="text-navy-900">Contrat : </strong>
            <p
              className={`mb-1 text-${
                equipementDetails.contrat ? "navy-900" : "red-700"
              } dark:text-gray-200`}
            >
              {equipementDetails.contrat
                ? equipementDetails.contrat
                : "Non rempli"}{" "}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <strong className="text-navy-900">Nombre casette : </strong>
            <p
              className={`mb-1 text-${
                equipementDetails.nb_casette ? "navy-900" : "red-700"
              } dark:text-gray-200`}
            >
              {equipementDetails.nb_casette
                ? equipementDetails.nb_casette
                : "Non rempli"}{" "}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <strong className="text-navy-900">Nombre caméra :</strong>
            <p
              className={`mb-1 text-${
                equipementDetails.nb_camera ? "navy-900" : "red-700"
              } dark:text-gray-200`}
            >
              {equipementDetails.nb_camera
                ? equipementDetails.nb_camera
                : "Non rempli"}{" "}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${
                equipementDetails.modele_ecran ? "navy-900" : "red-700"
              } dark:text-gray-200`}
            >
              <strong className="text-navy-900">Modéle écran : </strong>
              {equipementDetails.modele_ecran
                ? equipementDetails.modele_ecran
                : "Non rempli"}{" "}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${
                equipementDetails.modele_pc ? "navy-900" : "red-700"
              } dark:text-gray-200`}
            >
              <strong className="text-navy-900">Modéle pc : </strong>
              {equipementDetails.modele_pc
                ? equipementDetails.modele_pc
                : "Non rempli"}{" "}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${
                equipementDetails.version_application ? "navy-900" : "red-700"
              } dark:text-gray-200`}
            >
              <strong className="text-navy-900">Version Application : </strong>
              {equipementDetails.version_application
                ? equipementDetails.version_application
                : "Non rempli"}{" "}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${
                equipementDetails.garantie_start_date ? "navy-900" : "red-700"
              } dark:text-gray-200`}
            >
              <strong className="text-navy-900">Début garantie : </strong>
              {equipementDetails.garantie_start_date
                ? equipementDetails.garantie_start_date
                : "Non rempli"}{" "}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${
                equipementDetails.garantie_end_date ? "navy-900" : "red-700"
              } dark:text-gray-200`}
            >
              <strong className="text-navy-900">Fin garantie : </strong>
              {equipementDetails.garantie_end_date
                ? equipementDetails.garantie_end_date
                : "Non rempli"}{" "}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${
                equipementDetails.geolocalisation ? "navy-900" : "red-700"
              } dark:text-gray-200`}
            >
              <strong className="text-navy-900">Geolocalisation </strong>
              {equipementDetails.geolocalisation
                ? equipementDetails.geolocalisation
                : "Non rempli"}{" "}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${
                equipementDetails.branch_type ? "navy-900" : "red-700"
              } dark:text-gray-200`}
            >
              <strong className="text-navy-900">Type de branchement </strong>
              {equipementDetails.branch_type
                ? equipementDetails.branch_type
                : "Non rempli"}{" "}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${
                equipementDetails.installation_date ? "navy-900" : "red-700"
              } dark:text-gray-200`}
            >
              <strong className="text-navy-900">Date d'installation </strong>
              {equipementDetails.installation_date
                ? equipementDetails.installation_date
                : "Non rempli"}{" "}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${
                equipementDetails.date_formation ? "navy-900" : "red-700"
              } dark:text-gray-200`}
            >
              <strong className="text-navy-900">Date formation </strong>
              {equipementDetails.date_formation
                ? equipementDetails.date_formation
                : "Non rempli"}{" "}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${
                equipementDetails.date_visite_préventive
                  ? "navy-900"
                  : "red-700"
              } dark:text-gray-200`}
            >
              <strong className="text-navy-900">Date visite préventive </strong>
              {equipementDetails.date_visite_préventive
                ? equipementDetails.date_visite_préventive
                : "Non rempli"}{" "}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${
                equipementDetails.adresse ? "navy-900" : "red-700"
              } dark:text-gray-200`}
            >
              <strong className="text-navy-900">Adresse </strong>
              {equipementDetails.adresse
                ? equipementDetails.adresse
                : "Non rempli"}{" "}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${
                equipementDetails.parametre_reseau ? "navy-900" : "red-700"
              } dark:text-gray-200`}
            >
              <strong className="text-navy-900">Paramétre réseau </strong>
              {equipementDetails.parametre_reseau
                ? equipementDetails.parametre_reseau
                : "Non rempli"}{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EquipementDetails;
