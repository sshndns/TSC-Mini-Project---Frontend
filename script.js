// MOBILE HAMBURGER MENU (DOM & Event)
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    // Close mobile menu when a nav link is clicked
    const links = navLinks.querySelectorAll("a");
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function () {
            navLinks.classList.remove("active");
        });
    }
}

// DARK MODE TOGGLE 
const themeToggle = document.getElementById("theme-toggle");

function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeToggle) {
            themeToggle.textContent = "𖤓";
        }
    }
}

applySavedTheme();

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeToggle.textContent = "𖤓";
            localStorage.setItem("theme", "dark");
        } else {
            themeToggle.textContent = "☾";
            localStorage.setItem("theme", "light");
        }
    });
}

// DISCOGRAPHY FILTER (Loop & Conditional)
const filterButtons = document.querySelectorAll(".filter-btn");
const albumRows = document.querySelectorAll("#album-tbody tr");

function filterDiscography(selectedFilter) {
    for (let i = 0; i < albumRows.length; i++) {
        const rowYear = albumRows[i].getAttribute("data-year");
        const rowType = albumRows[i].getAttribute("data-type");

        if (selectedFilter === "all" || rowYear === selectedFilter || rowType === selectedFilter) {
            albumRows[i].style.display = "";
        } else {
            albumRows[i].style.display = "none";
        }
    }
}

for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function () {
        // Remove active class from all buttons
        for (let j = 0; j < filterButtons.length; j++) {
            filterButtons[j].classList.remove("active");
        }
        // Highlight clicked button and filter rows
        this.classList.add("active");
        const filterValue = this.getAttribute("data-filter");
        filterDiscography(filterValue);
    });
}

// FAN MESSAGE FORM VALIDATION
const fanForm = document.getElementById("fan-form");
const biasSelect = document.getElementById("bias");
const messageInput = document.getElementById("user-message");
const formFeedback = document.getElementById("form-feedback");
const messageList = document.getElementById("message-list");

if (fanForm) {
    fanForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        const chosenBias = biasSelect.value;
        const messageText = messageInput.value.trim();

        // Validation conditional
        if (messageText === "") {
            formFeedback.textContent = "Please write a message before submitting!";
            formFeedback.style.color = "#ffdddc";
            formFeedback.style.textstroke = "1px #0f0f0f";
            return;
        }

        // Success feedback
        formFeedback.textContent = "Message sent for " + chosenBias + "!";
        formFeedback.style.color = "#caffca";
        formFeedback.style.textstroke = "1px #0f0f0f";

        // Create new message card element in DOM
        const card = document.createElement("div");
        card.className = "message-card";

        const header = document.createElement("div");
        header.className = "message-card-header";
        header.textContent = "To: " + chosenBias + " • ATINY";

        const body = document.createElement("p");
        body.textContent = messageText;

        card.appendChild(header);
        card.appendChild(body);
        messageList.prepend(card);

        // Clear text area
        messageInput.value = "";
    });
}