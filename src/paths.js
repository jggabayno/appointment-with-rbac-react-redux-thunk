import WorkingHours from './components/WorkingHours'
import Accesses from './components/Accesses'

const paths = [
    {
        exact: true,
        slug: "Role & Access",
        route: "/",
        component: Accesses,
    },
    {
        exact: true,
        slug: "Working Hours",
        route: "/working-hours",
        component: WorkingHours,
    }
];

export default paths