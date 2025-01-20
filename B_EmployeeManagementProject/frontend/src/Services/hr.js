export async function getEmployeeProfiles() {
    const resp = await fetch('http://localhost:1011/getEmployeeProfiles');
    return resp.json();
}

export async function getEmployeeProfileById(id) {
    const resp = await fetch('http://localhost:1011/getEmployeeProfileDetails/' + id);
    return resp.json();
}