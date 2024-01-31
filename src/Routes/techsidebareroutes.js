import { IoMdAlert } from "react-icons/io";
import { MdHistory, MdHome, MdList, MdPerson } from "react-icons/md";
import Home from "views/technicien/home";
import ManageReclamation from "views/technicien/reclamation";
import History from "views/technicien/historique";
import Profil from "views/technicien/profil";
import Intervention from "views/technicien/intervention";
import ListeIntervention from "views/technicien/intervention";
import FicheIntervention from "views/technicien/ficheintervention";
//import Intervention from "views/technicien/reclamation/components/intervention";

const techsideroutes = [
    {
        name: "default",
        layout: "/tech",
        path: "default",
        icon: <MdHome className="h-6 w-6" />,
        component: <Home />,
        allowedRoles: ['TECHNICIEN'] // Liste des rôles autorisés pour accéder à cette route

      },
      {
        name: "Réclamtions",
        layout: "/tech",
        path: "reclamation",
        icon: <IoMdAlert className="h-6 w-6" />,
        component: <ManageReclamation />,
        allowedRoles: ['TECHNICIEN'] // Liste des rôles autorisés pour accéder à cette route

      },
      /*{
        name: "Réclamtions",
        layout: "/tech",
        path: "fiche",
        icon: <IoMdAlert className="h-6 w-6" />,
        component: <FicheIntervention />,
        allowedRoles: ['TECHNICIEN'] // Liste des rôles autorisés pour accéder à cette route

      },*/
      {
        name: "historique",
        layout: "/tech",
        path: "historique",
        icon: <MdHistory className="h-6 w-6" />,
        component: <History />,
        allowedRoles: ['TECHNICIEN'] // Liste des rôles autorisés pour accéder à cette route

      },
      {
        name: "intervention",
        layout: "/tech",
        path: "intervention",
        icon: <MdList className="h-6 w-6" />,
        component: <ListeIntervention />,
        allowedRoles: ['TECHNICIEN'] // Liste des rôles autorisés pour accéder à cette route

      },
      {
        name: "profil",
        layout: "/tech",
        path: "profil",
        icon: <MdPerson className="h-6 w-6" />,
        component: <Profil />,
        allowedRoles: ['TECHNICIEN'] // Liste des rôles autorisés pour accéder à cette route
      }
    ,
];
export default techsideroutes;
