document.addEventListener("DOMContentLoaded", function () {

    const search = document.getElementById("search");
    const suggestions = document.getElementById("suggestions");

    // Your existing section IDs
    const sections = {
        home: "Home",
        about: "About",
        portfolio: "Portfolio",
        skills: "Skills",
        blog: "Blog",
        contact: "Contact"
    };


    // =========================
    // SEARCH WHILE TYPING
    // =========================

    search.addEventListener("input", function () {

        const value = search.value.toLowerCase().trim();

        // Clear old suggestions
        suggestions.innerHTML = "";

        // If search is empty
        if (value === "") {
            suggestions.style.display = "none";
            return;
        }

        // Find matching sections
        for (let name in sections) {

            if (name.includes(value)) {

                const item = document.createElement("div");

                // Make first letter uppercase
                item.textContent =
                    name.charAt(0).toUpperCase() + name.slice(1);

                // When clicking suggestion
                item.addEventListener("click", function () {

                    goToSection(sections[name]);

                });

                suggestions.appendChild(item);
            }
        }

        // Show suggestions if there are results
        if (suggestions.children.length > 0) {
            suggestions.style.display = "block";
        } else {
            suggestions.style.display = "none";
        }

    });


    // =========================
    // PRESS ENTER TO SEARCH
    // =========================

    search.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            const value = search.value.toLowerCase().trim();

            // Check if searched name exists
            if (sections[value]) {

                goToSection(sections[value]);

            } else {

                // Try to find partial match
                for (let name in sections) {

                    if (name.includes(value)) {

                        goToSection(sections[name]);
                        break;

                    }
                }
            }

        }

    });


    // =========================
    // GO TO SECTION
    // =========================

    function goToSection(sectionId) {

        const section = document.getElementById(sectionId);

        if (section) {

            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Clear search
            search.value = "";

            // Hide suggestions
            suggestions.style.display = "none";

        }

    }


    // =========================
    // CLOSE SUGGESTIONS
    // WHEN CLICKING OUTSIDE
    // =========================

    document.addEventListener("click", function (event) {

        if (
            !search.contains(event.target) &&
            !suggestions.contains(event.target)
        ) {

            suggestions.style.display = "none";

        }

    });

});