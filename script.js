// API Base URL
const API_URL = "http://localhost:8080/api/complaints";

// =======================
// Submit Complaint
// =======================
function submitComplaint() {
    const complaint = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        issueType: document.getElementById("issueType").value,
        description: document.getElementById("description").value
    };

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(complaint)
    })
    .then(response => response.json())
    .then(data => {
        alert("✅ Complaint Submitted Successfully!");
        clearForm();
        loadComplaints();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("❌ Failed to submit complaint");
    });
}

// =======================
// Load All Complaints
// =======================
function loadComplaints() {
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        const table = document.getElementById("complaintTable");
        table.innerHTML = "";

        data.forEach(c => {
            const row = `
                <tr>
                    <td>${c.id}</td>
                    <td>${c.name}</td>
                    <td>${c.issueType}</td>
                    <td>${c.description}</td>
                    <td>${c.status}</td>
                    <td>
                        <button onclick="updateStatus(${c.id}, 'Resolved')">Resolve</button>
                    </td>
                </tr>
            `;
            table.innerHTML += row;
        });
    })
    .catch(error => console.error("Error loading complaints:", error));
}

// =======================
// Update Complaint Status
// =======================
function updateStatus(id, status) {
    fetch(`${API_URL}/${id}?status=${status}`, {
        method: "PUT"
    })
    .then(response => response.json())
    .then(data => {
        alert("✅ Status Updated!");
        loadComplaints();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("❌ Failed to update status");
    });
}

// =======================
// Clear Form
// =======================
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("issueType").value = "";
    document.getElementById("description").value = "";
}

// =======================
// Auto Load Complaints on Page Load
// =======================
window.onload = function () {
    loadComplaints();
};