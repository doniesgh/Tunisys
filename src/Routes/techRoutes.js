import { MdHistory, MdHome, MdList, MdPerson } from "react-icons/md";
import { IoMdAlert } from "react-icons/io";

import Home from "views/technicien/home";
import ManageReclamation from "views/technicien/reclamation";
import History from "views/technicien/historique";
import Profil from "views/technicien/profil";
import ModifierProfile from "views/technicien/profil/components";
import Intervention from "views/technicien/reclamation/components/intervention";
import ListeIntervention from "views/technicien/intervention";
import FicheIntervention from "views/technicien/ficheintervention";

const techroutes = [
  {
    name: "Home",
    layout: "/tech",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <Home />,
    allowedRoles: ['TECHNICIEN'] // Liste des rôles autorisés pour accéder à cette route

  },
  {
        name: "Home",
        layout: "/tech",
        path: "home",
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
      {
        name: "historique",
        layout: "/tech",
        path: "historique",
        icon: <MdHistory className="h-6 w-6" />,
        component: <History />,
        allowedRoles: ['TECHNICIEN'] 

      },
      {
        name: "historique",
        layout: "/tech",
        path: "fiche",
        icon: <MdHistory className="h-6 w-6" />,
        component: <FicheIntervention />,
        allowedRoles: ['TECHNICIEN'] 

      },
      {
        name: "intervention",
        layout: "/tech",
        path: "intervention",
        icon: <MdList className="h-6 w-6" />,
        component: <ListeIntervention />,
        allowedRoles: ['TECHNICIEN'] 

      },
      {
        name: "profil",
        layout: "/tech",
        path: "profil",
        icon: <MdPerson className="h-6 w-6" />,
        component: <Profil />,
        allowedRoles: ['TECHNICIEN'] // Liste des rôles autorisés pour accéder à cette route

      },
      {
        name: "modifier",
        layout: "/tech",
        path: "modifier",
        icon: <MdPerson className="h-6 w-6" />,
        component: <ModifierProfile />,
        allowedRoles: ['TECHNICIEN'] // Liste des rôles autorisés pour accéder à cette route

      },
     
 

];
export default techroutes;
