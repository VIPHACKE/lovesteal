document.addEventListener("DOMContentLoaded", function() {
    // Menu Functionality
    const menuBtn = document.getElementById("customMenuBtn");
    const sidebar = document.getElementById("customSidebar");
    const overlay = document.getElementById("customOverlay");
    const closeMenuBtn = document.getElementById("closeMenuBtn");

    if (menuBtn && sidebar && overlay && closeMenuBtn) {
        menuBtn.addEventListener("click", function() {
            sidebar.classList.add("show");
            overlay.classList.add("show");
        });

        closeMenuBtn.addEventListener("click", function() {
            sidebar.classList.remove("show");
            overlay.classList.remove("show");
        });

        overlay.addEventListener("click", function() {
            sidebar.classList.remove("show");
            overlay.classList.remove("show");
        });

        const menuItems = document.querySelectorAll(".menu-item");
        menuItems.forEach(item => {
            item.addEventListener("click", function() {
                const sectionId = item.getAttribute("data-section");
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: "smooth" });
                    sidebar.classList.remove("show");
                    overlay.classList.remove("show");
                }
            });
        });
    } else {
        console.error("Menu elements not found!");
    }

    // Login Functionality with Local Storage
    const loginBtn = document.getElementById("customLoginBtn");
    const loginBtnMobile = document.getElementById("customLoginBtnMobile");
    const loginPopup = document.getElementById("customLoginPopup");
    const profilePopup = document.getElementById("customProfilePopup");
    const loginForm = document.getElementById("customLoginForm");
    const seedInput = document.getElementById("customSeedInput");
    const profileImage = document.getElementById("customProfileImage");
    const profileName = document.getElementById("customProfileName");
    const logoutBtn = document.getElementById("customLogoutBtn");

    let isLoggedIn = localStorage.getItem("username") ? true : false;

    if (loginBtn && loginBtnMobile && loginPopup && profilePopup && loginForm && seedInput && profileImage && profileName && logoutBtn) {
        // Check if user is already logged in
        if (isLoggedIn) {
            const savedUsername = localStorage.getItem("username");
            const avatar = `https://mc-heads.net/avatar/${savedUsername}/128`; // Avatar for home
            const body = `https://mc-heads.net/player/${savedUsername}`; // Full body for profile
            loginBtn.innerHTML = `<img src="${avatar}" alt="avatar" style="width: 24px; height: 24px; border-radius: 50%;"><span>${savedUsername}</span>`;
            loginBtnMobile.innerHTML = `<img src="${avatar}" alt="avatar" style="width: 24px; height: 24px; border-radius: 50%;"><span>${savedUsername}</span>`;
            profileImage.src = body; // Added this line
            profileName.innerText = savedUsername;
        }

        loginBtn.addEventListener("click", toggleLogin);
        loginBtnMobile.addEventListener("click", toggleLogin);

        function toggleLogin() {
            if (!isLoggedIn) {
                loginPopup.style.display = "block";
            } else {
                profilePopup.style.display = profilePopup.style.display === "block" ? "none" : "block";
            }
        }

        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const seed = seedInput.value.trim();
            if (!seed) return alert("Please enter username!");

            const avatar = `https://mc-heads.net/avatar/${seed}/128`; // Avatar for home
            const body = `https://mc-heads.net/player/${seed}`;
            localStorage.setItem("username", seed); // Save to local storage
            loginBtn.innerHTML = `<img src="${avatar}" alt="avatar" style="width: 24px; height: 24px; border-radius: 50%;"><span>${seed}</span>`;
            loginBtnMobile.innerHTML = `<img src="${avatar}" alt="avatar" style="width: 24px; height: 24px; border-radius: 50%;"><span>${seed}</span>`;
            loginPopup.style.display = "none";
            profileImage.src = body;
            profileName.innerText = seed;
            isLoggedIn = true;
        });

        logoutBtn.addEventListener("click", function() {
            isLoggedIn = false;
            localStorage.removeItem("username"); // Clear local storage
            loginBtn.innerHTML = "Login";
            loginBtnMobile.innerHTML = "Login";
            profilePopup.style.display = "none";
        });
    } else {
        console.error("Login elements not found!");
    }
});