import Home from "../pages/Home";
import NewDiagnosis from "../pages/Diagnosis/NewDiagnosis";

const appRoutes = [
    {
        path: '/Home',
        element: <Home /> 
    },
    {
        path: '/diagnosis/new',
        element: <NewDiagnosis />
    }
]

export default appRoutes;