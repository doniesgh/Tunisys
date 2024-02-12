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
      <h1 className="text-navy-700 mx-0 mb-2.5 text-center text-[1.7em] font-semibold dark:text-white">
        Equipement S/N : {equipementDetails.equipement_sn}
      </h1>
      <div className="min-w-screen dark:bg-navy-900 relative mx-auto my-5 rounded-2xl bg-white p-5 py-10 shadow-[2px_2px_5px_rgba(0,0,0,0.05)]">
        <div class=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${equipementDetails.terminal_no ? "navy-900" : "red-700"
                } dark:text-gray-200`}>
              <strong className="text-navy-900 dark:text-white">Numéro terminal :</strong>
              {equipementDetails.terminal_no
                ? equipementDetails.terminal_no
                : "Non rempli"}
            </p>
          </div>
          <div class="flex  sm:col-span-3">
            <strong className="text-navy-900 dark:text-white"> Status :</strong>
            <p
              className={`ml-2 mb-1 text-${equipementDetails.status ? "navy-900" : "red-700"
                } dark:text-gray-200`}>
              {equipementDetails.status
                ? equipementDetails.status
                : "Non rempli"}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Equipement Type : </strong>
            <p
              className={`mb-1 text-${equipementDetails.equipement_type ? "navy-900" : "red-700"
                } dark:text-gray-200`}>
              {equipementDetails.equipement_type
                ? equipementDetails.equipement_type
                : "Non rempli"}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Client : </strong>
            {equipementDetails.client && equipementDetails.client.length > 0 && (
              <p>{equipementDetails.client[0].client || 'Non rempli'}</p>)}
          </div>
          <div class="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Service Station : </strong>
            <p
              className={`mb-1 text-${equipementDetails.service_station ? "navy-900" : "red-700"
                } dark:text-gray-200`}>
              {equipementDetails.service_station
                ? equipementDetails.service_station
                : "Non rempli"}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Contrat : </strong>
            <p>
              {equipementDetails.contrat && equipementDetails.contrat.length > 0 && (
                <p>{equipementDetails.contrat[0].contrat_sn || 'Non rempli'}</p>)}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Service : </strong>
            <p >
              {equipementDetails.service && equipementDetails.service.length > 0 && (
                <p>{equipementDetails.service[0].service_no || 'Non rempli'}</p>)}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Nombre casette : </strong>
            <p
              className={`mb-1 text-${equipementDetails.nb_casette ? "navy-900" : "red-700"
                } dark:text-gray-200`}>
              {equipementDetails.nb_casette
                ? equipementDetails.nb_casette
                : "Non rempli"}
            </p>
          </div>

          <div class="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Nombre caméra :</strong>
            <p
              className={`mb-1 text-${equipementDetails.nb_camera ? "navy-900" : "red-700"
                } dark:text-gray-200`}>
              {equipementDetails.nb_camera
                ? equipementDetails.nb_camera
                : "Non rempli"}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${equipementDetails.modele_ecran ? "navy-900" : "red-700"
                } dark:text-gray-200`}>
              <strong className="text-navy-900 dark:text-white">Modéle écran : </strong>
              {equipementDetails.modele_ecran
                ? equipementDetails.modele_ecran
                : "Non rempli"}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${equipementDetails.modele_pc ? "navy-900" : "red-700"
                } dark:text-gray-200`}>
              <strong className="text-navy-900 dark:text-white">Modéle pc : </strong>
              {equipementDetails.modele_pc
                ? equipementDetails.modele_pc
                : "Non rempli"}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${equipementDetails.version_application ? "navy-900" : "red-700"
                } dark:text-gray-200`}>
              <strong className="text-navy-900 dark:text-white">Version Application : </strong>
              {equipementDetails.version_application
                ? equipementDetails.version_application
                : "Non rempli"}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${equipementDetails.garantie_start_date ? "navy-900" : "red-700"
                } dark:text-gray-200`}>
              <strong className="text-navy-900 dark:text-white">Début garantie : </strong>
              {equipementDetails.garantie_start_date
                ? new Date(equipementDetails.garantie_start_date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                : "Non rempli"}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${equipementDetails.garantie_end_date ? "navy-900" : "red-700"
                } dark:text-gray-200`}>
              <strong className="text-navy-900 dark:text-white">Fin garantie : </strong>
              {equipementDetails.garantie_end_date
                ? new Date(equipementDetails.garantie_end_date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                : "Non rempli"}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${equipementDetails.geolocalisation ? "navy-900" : "red-700"
                } dark:text-gray-200`}>
              <strong className="text-navy-900 dark:text-white">Geolocalisation :</strong>
              {equipementDetails.geolocalisation
                ? equipementDetails.geolocalisation
                : "Non rempli"}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${equipementDetails.branch_type ? "navy-900" : "red-700"
                } dark:text-gray-200`}>
              <strong className="text-navy-900 dark:text-white">Type de branchement : </strong>
              {equipementDetails.branch_type
                ? equipementDetails.branch_type
                : "Non rempli"}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${equipementDetails.installation_date ? "navy-900" : "red-700"
                } dark:text-gray-200`} >
              <strong className="text-navy-900 dark:text-white">Date d'installation :</strong>
              {equipementDetails.installation_date
                ? new Date(equipementDetails.installation_date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                : "Non rempli"}

            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${equipementDetails.date_formation ? "navy-900" : "red-700"
                } dark:text-gray-200`} >
              <strong className="text-navy-900 dark:text-white">Date formation :</strong>
              {equipementDetails.date_formation
                ? new Date(equipementDetails.date_formation).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                : "Non rempli"}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${equipementDetails.date_visite_préventive
                ? "navy-900"
                : "red-700"
                } dark:text-gray-200`} >
              <strong className="text-navy-900 dark:text-white">Date visite préventive :</strong>
              {equipementDetails.date_visite_préventive
                ? equipementDetails.date_visite_préventive
                : "Non rempli"}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${equipementDetails.adresse ? "navy-900" : "red-700"
                } dark:text-gray-200`}
            >
              <strong className="text-navy-900 dark:text-white">Adresse :</strong>
              {equipementDetails.adresse
                ? equipementDetails.adresse
                : "Non rempli"}
            </p>
          </div>
          <div class="flex sm:col-span-3">
            <p
              className={`mb-1 text-${equipementDetails.parametre_reseau ? "navy-900" : "red-700"
                } dark:text-gray-200`}>
              <strong className="text-navy-900 dark:text-white">Paramétre réseau :</strong>
              {equipementDetails.parametre_reseau
                ? equipementDetails.parametre_reseau
                : "Non rempli"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EquipementDetails;
