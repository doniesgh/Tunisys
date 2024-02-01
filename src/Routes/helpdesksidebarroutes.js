import { IoMdAlert } from "react-icons/io";
import { MdHome } from "react-icons/md";
import Home from "views/helpdesk/home";
import ReclamationsList from "views/helpdesk/reclamation";

const hdroutes = [
    {
        name: "Acceuil",
        layout: "/helpdesk",
        path: "default",
        icon: <MdHome className="h-6 w-6" />,
        component: <Home />,
        allowedRoles: ['HELPDESK'] // Liste des rôles autorisés pour accéder à cette route

      },
      {
        name: "Liste réclamations",
        layout: "/helpdesk",
        path: "reclamation",
        icon: <IoMdAlert className="h-6 w-6" />,
        component: <ReclamationsList />,
        allowedRoles: ['HELPDESK'] // Liste des rôles autorisés pour accéder à cette route
      },

];
export default hdroutes;
