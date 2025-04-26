// Array to store contacts
let contacts = [];

// DOM elements
const contactList = document.querySelector('.Contact_list');
const form = document.querySelector('.js-form');

// Render a single contact
function renderContact(contact) {
    // Save to localStorage
    localStorage.setItem('contacts', JSON.stringify(contacts));

    const existingContact = document.querySelector(`[data-key='${contact.id}']`);

    if (contact.deleted) {
        existingContact ? remove() : null;
        checkEmptyState();
        return;
    }

    const contactElement = document.createElement('article');
    contactElement.className = 'person';
    contactElement.dataset.key = contact.id;

    // Default avatar if no image URL provided
    const avatarUrl = contact.imageurl || 'https://www.gravatar.com/avatar/?d=mp';

    contactElement.innerHTML = `
        <img src="${avatarUrl}" alt="${contact.name}">
        <div class="contact-details">
            <h4><i class="fas fa-user-circle contact-icon"></i> ${contact.name}</h4>
            <p><i class="fas fa-envelope contact-icon"></i> ${contact.email}</p>
            <p><i class="fas fa-phone-alt contact-icon"></i> ${contact.contactnumber}</p>
        </div>
        <button class="delete-contact" aria-label="Delete contact">
            <i class="fas fa-trash-alt"></i>
        </button>
    `;

    if (existingContact) {
        existingContact.replaceWith(contactElement);
    } else {
        contactList.appendChild(contactElement);
    }

    checkEmptyState();
}

// Check if contact list is empty and show message
function checkEmptyState() {
    if (contactList.children.length === 0) {
        contactList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-address-book"></i>
                <h3>No contacts yet</h3>
                <p>Add your first contact using the form</p>
            </div>
        `;
    }
}

// Delete a contact
function deleteContact(id) {
    contacts = contacts.filter(contact => contact.id !== id);
    renderContact({ id, deleted: true });
}

// Add a new contact
function addContact(e) {
    e.preventDefault();

    const contact = {
        name: form.fullName.value.trim(),
        email: form.myEmail.value.trim(),
        contactnumber: form.myTel.value.trim(),
        imageurl: form.imgurl.value.trim(),
        id: Date.now()
    };

    contacts.push(contact);
    renderContact(contact);
    form.reset();
    form.fullName.focus();
}

// Event listeners
form.addEventListener('submit', addContact);

contactList.addEventListener('click', e => {
    if (e.target.closest('.delete-contact')) {
        const contactElement = e.target.closest('.person');
        const contactId = Number(contactElement.dataset.key);
        deleteContact(contactId);
    }
});

// Load contacts from localStorage when page loads
document.addEventListener('DOMContentLoaded', () => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
        contacts = JSON.parse(savedContacts);
        contacts.forEach(contact => renderContact(contact));
    } else {
        checkEmptyState();
    }
});