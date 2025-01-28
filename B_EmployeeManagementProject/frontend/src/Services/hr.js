const hostURL = "http://localhost:1011";

export async function getEmployeeProfiles() {
    const resp = await fetch(hostURL + '/getEmployeeProfiles');
    return resp.json();
}

export async function getEmployeeProfileById(id) {
    const resp = await fetch(hostURL + '/getEmployeeProfileDetails/' + id);
    return resp.json();
}

export async function getEmailRegistrationLink(name, email) {
    const resp = await fetch(hostURL + '/emailRegistration/' + name + '/' + email);
    return resp.json();
}

export async function getEmailRegistrations() {
    const resp = await fetch(hostURL + '/emailRegistartions');
    return resp.json();
}

export async function getOnboardingApplications(status) {
    const resp = await fetch(hostURL + '/onboardingApplications/' + status);
    return resp.json();
}

export async function changeOnboardingApplications(id, data) {
    const resp = await fetch(hostURL + "/changeOnboardingApplication/" + id, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return resp.json();
}

export async function getOnboardingApplication(id) {
    const resp = await fetch(hostURL + '/getOnboardingApplication/' + id);
    return resp.json();
}

export async function getEmployeeVisaStatuses() {
    const resp = await fetch(hostURL + '/getEmployeeVisaStatuses');
    return resp.json();
}

export async function getInProgressEmployeeVisaStatuses() {
    const resp = await fetch(hostURL + '/getInProgressEmployeeVisaStatuses');
    return resp.json();
}

export async function getAllEmployeeVisaStatuses() {
    const resp = await fetch(hostURL + '/getAllEmployeeVisaStatuses');
    return resp.json();
}

export async function changeEmployeeVisaDocuments(id, data) {
    const resp = await fetch(hostURL + "/changeEmployeeVisaDocuments/" + id, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return resp.json();
}

export async function sendNotification(email, message) {
    const resp = await fetch(hostURL + "/sendNotification/" + email, {
        method: 'POST',
        body: JSON.stringify({ message: message }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return resp.json();
}

export async function downloadFile(id) {
    const resp = await fetch(hostURL + '/downloadFile/' + id);
    return resp.blob();
}

export async function getEmailRegistration(token) {
    const resp = await fetch(hostURL + '/emailRegistartion/' + token);
    return resp.json();
}

export async function registerEmail(token) {
    const resp = await fetch(hostURL + "/registerEmail/" + token, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
    });
    return resp.json();
}