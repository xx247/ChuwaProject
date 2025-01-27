import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function Navigation() {
    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{ position: 'fixed', top: '15px' }}>
        <Link underline="hover" color="inherit" href="/hr">
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/hr/employeeProfiles"
        >
          Employee Profile
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/hr/visaStatus"
        >
          Visa Status Management
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/hr/hiringManagement"
        >
          Hiring Management
        </Link>
      </Breadcrumbs>
    );
}

export default Navigation;