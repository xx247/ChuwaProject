export async function getEmployeeProfiles() {
    const resp = await fetch('http://localhost:1011/getEmployeeProfiles');
    return resp.json();
}

export async function getEmployeeProfileById(id) {
    const resp = await fetch('http://localhost:1011/getEmployeeProfileDetails/' + id);
    return resp.json();
}

export async function getEmailRegistrationLink(name, email) {
    const resp = await fetch('http://localhost:1011/getEmailRegistrationLink/' + name + '/' + email);
    return resp.json();
}

export async function getEmailRegistrations() {
    const resp = await fetch('http://localhost:1011/emailRegistartions');
    return resp.json();
}