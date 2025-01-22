export async function getEmployeeProfiles() {
    const resp = await fetch('http://localhost:1011/getEmployeeProfiles');
    return resp.json();
}

export async function getEmployeeProfileById(id) {
    const resp = await fetch('http://localhost:1011/getEmployeeProfileDetails/' + id);
    return resp.json();
}

export async function getEmailRegistrationLink(name, email) {
    const resp = await fetch('http://localhost:1011/emailRegistration/' + name + '/' + email);
    return resp.json();
}

export async function getEmailRegistrations() {
    const resp = await fetch('http://localhost:1011/emailRegistartions');
    return resp.json();
}

export async function getOnboardingApplications(status) {
    const resp = await fetch('http://localhost:1011/onboardingApplications/' + status);
    return resp.json();
}

export async function changeOnboardingApplications(id, data) {
    const resp = await fetch("http://localhost:1011/changeOnboardingApplication/" + id, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return resp.json();
}

export async function getOnboardingApplication(id) {
    const resp = await fetch('http://localhost:1011/getOnboardingApplication/' + id);
    return resp.json();
}

export async function getEmployeeVisaStatuses() {
    const resp = await fetch('http://localhost:1011/getEmployeeVisaStatuses');
    return resp.json();
}

export async function getInProgressEmployeeVisaStatuses() {
    const resp = await fetch('http://localhost:1011/getInProgressEmployeeVisaStatuses');
    return resp.json();
}

export async function getAllEmployeeVisaStatuses() {
    const resp = await fetch('http://localhost:1011/getAllEmployeeVisaStatuses');
    return resp.json();
}