document.addEventListener('DOMContentLoaded', () => {
    const lecturePlayer = document.getElementById('lecture-player');
    const lectureTitleLinks = document.querySelectorAll('.course-phase'); // Changed selector to target the parent div
    const assignmentButtons = document.querySelectorAll('.assignment-button');
    const dynamicContentArea = document.getElementById('dynamic-content-area');
    const mainContentPlaceholder = document.querySelector('.main-content-placeholder');

    const courseContent = {
        phase1: {
            title: "Phase 1: Python (Week 1-4)",
            lectureVideoId: "_aWbUudZ5Yo",
            topDescription: "",
            bottomDescription: "",
            assignmentPdf: "Assignment Python.pdf", // Updated PDF link
            projects: [
                "Solve a total of 120 questions on Python Basics.",
                "Solve questions on Data Structures.",
                "Solve questions on File Handling.",
                "Solve questions on OOPs Concepts."
            ],
            lectureTitle: "Python Full Course for Beginners to Advanced"
        },
        phase2: {
            title: "Phase 2: Maths (Week 5-8)",
            lectureVideoId: "eF7HoC-cLRM",
            topDescription: "",
            bottomDescription: "",
            assignmentPdf: "Assignment Maths.pdf", // Updated PDF link
            projects: [
                "Solve a total of 45 questions on Descriptive Statistics.",
                "Solve questions on Probability.",
                "Solve questions on Inferential Statistics."
            ],
            lectureTitle: "Complete Statistics Course for Beginners"
        },
        phase3: {
            title: "Phase 3: Data Preprocessing & Visualization (Week 9-11)",
            lectureVideoIds: [
                { id: "Utgwk0r9Zq4", title: "NumPy" },
                { id: "QUaSmqBeR9w", title: "Pandas" },
                { id: "-jTD74eEy2I", title: "Data Visualization" }
            ],
            topDescription: "",
            bottomDescription: "",
            assignmentPdf: "Assignment Data Visualisation.pdf", // Updated PDF link
            projects: [
                "Solve a total of 55 questions on Data Cleaning.",
                "Solve questions on Pandas.",
                "Solve questions on NumPy.",
                "Solve questions on Data Visualization."
            ],
            lectureTitle: "Data Preprocessing & Visualization"
        },
        phase4: {
            title: "Phase 4: SQL (Week 12-14)",
            lectureVideoId: "p1epCuYb5OQ",
            topDescription: "",
            bottomDescription: "",
            assignmentPdf: "Assignment SQL.pdf", // Updated PDF link
            projects: [
                "Assignments: 40 questions on SQL Basics and advanced topics.",
                "Projects: Analyze an E-commerce dataset.",
                "Projects: Build a Student Management Dashboard."
            ],
            lectureTitle: "Complete SQL in 1 shot for Data analytics"
        },
        phase5: {
            title: "Phase 5: Machine Learning (Week 15-21)",
            lectureVideoIds: [
                { id: "1L420xXpDTg", title: "Part 1 - Foundation" },
                { id: "Lb0JzFtTmBs", title: "Part 2 - Supervised Learning" },
                { id: "omGvjpmPDoY", title: "Part 3 - Classification Algorithms" },
                { id: "UFAHXZW2hU8", title: "Part 4 - Model Tuning, Ensemble & Unsupervised Learning" }
            ],
            topDescription: "",
            bottomDescription: "",
            assignmentPdf: null, // Assignment not available as per user
            projects: [
                "Projects: Predict Student Exam Scores / House Price Prediction.",
                "Projects: Predict Student Pass/Fail / Classify Iris Flowers / Predict Diabetes / Classify Titanic Passengers.",
                "Projects: Predict Mushroom Type / Classify Mobile Price Range.",
                "Projects: Classify Emails as Spam / Predict Handwritten Digits.",
                "Projects: Customer Segmentation / Group Similar Movies.",
                "Projects: Predict Loan Approval / Diagnose Diabetes.",
                "Projects: Mini ML Project: Predict Employee Attrition or House Prices."
            ],
            lectureTitle: "Machine Learning Lectures"
        },
        phase6: {
            title: "Phase 6: Deep Learning (Week 22-25)",
            lectureVideoId: null, // No specific lecture link provided
            topDescription: "",
            bottomDescription: "",
            assignmentPdf: "Assignment Deep Learning.pdf", // Updated PDF link
            projects: [
                "Assignments: 10 questions on Perceptron and Activation Functions.",
                "Projects: Predict house prices with ANN / Classify digits with ANN.",
                "Projects: Classify digits with CNN / Classify cats vs dogs.",
                "Projects: Predict next words with LSTM / Stock price prediction with LSTM."
            ],
            lectureTitle: "Deep Learning Concepts"
        },
        phase7: {
            title: "Phase 7: Specialization (Weeks 25-26)",
            lectureVideoId: "yiNS_Sh9KDA",
            topDescription: "",
            bottomDescription: "",
            assignmentPdf: null, // Assignment button removed as per user
            projects: [
                "Projects: Build and deploy a capstone project.",
                "Projects: Create a GitHub portfolio and prepare a resume."
            ],
            lectureTitle: "Learn Complete NLP with Project"
        }
    };

    // XP and Rank System Constants
    const PHASE_XP = {
        phase1: 100,
        phase2: 120,
        phase3: 150,
        phase4: 130,
        phase5: 200,
        phase6: 180,
        phase7: 250
    };

    const RANK_TIERS = [
        { name: "Novice", threshold: 0 },
        { name: "Apprentice", threshold: 100 },
        { name: "Journeyman", threshold: 300 },
        { name: "Expert", threshold: 600 },
        { name: "Master", threshold: 1000 },
        { name: "Grandmaster", threshold: 1500 }
    ];

    let userData = {
        currentXp: 0,
        currentRank: "Novice",
        completedPhases: []
    };

    // Functions for XP and Rank Management
    function loadUserData() {
        const storedData = localStorage.getItem('dataScienceUserData');
        if (storedData) {
            userData = JSON.parse(storedData);
        } else {
            saveUserData(); // Initialize if no data exists
        }
    }

    function saveUserData() {
        localStorage.setItem('dataScienceUserData', JSON.stringify(userData));
    }

    function updateRank() {
        for (let i = RANK_TIERS.length - 1; i >= 0; i--) {
            if (userData.currentXp >= RANK_TIERS[i].threshold) {
                userData.currentRank = RANK_TIERS[i].name;
                break;
            }
        }
    }

    function updateDisplay() {
        document.getElementById('current-xp-display').textContent = userData.currentXp;
        document.getElementById('current-rank-display').textContent = userData.currentRank;
    }

    // Initial load of user data and display update
    loadUserData();
    updateRank(); // Ensure rank is up-to-date on load
    updateDisplay(); // Update UI with initial data

    function loadLectureContent(phaseId) {
        const content = courseContent[phaseId];
        if (!content) return;

        mainContentPlaceholder.style.display = 'none';
        dynamicContentArea.style.display = 'block';

        let lectureHtml = `<h2 class="lecture-phase-title">${content.title}</h2>`;

        // Handle single video vs multiple videos
        if (content.lectureVideoId) {
            if (content.topDescription) {
                lectureHtml += `<p class="main-text-description-top">${content.topDescription}</p>`;
            }
            lectureHtml += `
                <div class="lecture-video-block">
                    <h4 class="video-title">${content.lectureTitle}</h4>
                    <div class="main-video-player-container">
                        <iframe width="100%" height="500" src="https://www.youtube.com/embed/${content.lectureVideoId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            `;
            if (content.bottomDescription) {
                lectureHtml += `<p class="main-text-description-bottom">${content.bottomDescription}</p>`;
            }
            lecturePlayer.style.display = 'none'; // Hide the main player as we're embedding directly

        } else if (content.lectureVideoIds && content.lectureVideoIds.length > 0) {
            if (content.topDescription) {
                lectureHtml += `<p class="main-text-description-top">${content.topDescription}</p>`;
            }
            content.lectureVideoIds.forEach((video, index) => {
                lectureHtml += `
                    <div class="lecture-video-block">
                        <h4 class="video-title">Lecture ${index + 1} - ${video.title}</h4>
                        <div class="main-video-player-container">
                            <iframe width="100%" height="500" src="https://www.youtube.com/embed/${video.id}?autoplay=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                `;
            });
            if (content.bottomDescription) {
                lectureHtml += `<p class="main-text-description-bottom">${content.bottomDescription}</p>`;
            }
            lecturePlayer.style.display = 'none'; // Hide the main player as we're embedding directly

        } else {
            // Display a message when no lecture videos are available, and provide a channel link
            // The deep learning message is a special case and will always have content, so we don't need to check for it to be empty.
            lectureHtml += `<p class="main-text-description-top">Lecture videos for this phase are currently being uploaded and will be available soon. In the meantime, you can access more videos directly from our official YouTube channel: <a href="https://www.youtube.com/@SheryiansAI/videos" target="_blank">Sheryians AI YouTube Channel</a></p>`;
            if (content.bottomDescription) {
                lectureHtml += `<p class="main-text-description-bottom">${content.bottomDescription}</p>`;
            }
            lecturePlayer.style.display = 'none';
        }

        dynamicContentArea.innerHTML = lectureHtml; // Set the entire content

        // No need to re-attach event listeners for small lecture links as they are no longer used
    }

    function loadAssignmentContent(phaseId) {
        const content = courseContent[phaseId];
        if (!content) return;

        mainContentPlaceholder.style.display = 'none';
        // No need to clear lecturePlayer.src or display here, as dynamicContentArea.innerHTML will be replaced

        let assignmentHtml = `<h2>${content.title} - Assignments & Projects</h2>`;

        // Add PDF download button if available
        if (content.assignmentPdf) {
            assignmentHtml += `
                <div class="assignment-pdf-section">
                    <h4>Assignment Document</h4>
                    <a href="${content.assignmentPdf}" target="_blank" download class="pdf-download-button">Download Assignment PDF</a>
                </div>
            `;
        } else {
            assignmentHtml += `<p>No assignment document available for this phase.</p>`;
        }

        // Add Projects as a to-do list
        if (content.projects && content.projects.length > 0) {
            assignmentHtml += `
                <div class="project-list-section">
                    <h4>Projects</h4>
                    <ul class="todo-list">
            `;
            content.projects.forEach((project, index) => {
                // Use a unique ID for each checkbox, incorporating phaseId
                const checkboxId = `${phaseId}-project-${index}`;
                // Check if the individual checkbox is checked in localStorage
                const isChecked = (localStorage.getItem(checkboxId) === 'true');
                assignmentHtml += `
                        <li>
                            <input type="checkbox" id="${checkboxId}" ${isChecked ? 'checked' : ''}>
                            <label for="${checkboxId}">${project}</label>
                        </li>
                `;
            });
            assignmentHtml += `
                    </ul>
                </div>
            `;
        } else {
            assignmentHtml += `<p>No projects listed for this phase.</p>`;
        }

        dynamicContentArea.innerHTML = assignmentHtml; // Set the entire content
        dynamicContentArea.style.display = 'block';

        // Attach event listeners to newly rendered checkboxes
        const checkboxes = dynamicContentArea.querySelectorAll('.todo-list input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const clickedCheckboxId = e.target.id;
                localStorage.setItem(clickedCheckboxId, e.target.checked); // Save checkbox state
                checkPhaseCompletion(phaseId);
                updateDisplay(); // Update display after potential XP gain
            });
        });
    }

    function checkPhaseCompletion(phaseId) {
        const content = courseContent[phaseId];
        if (!content || !content.projects || content.projects.length === 0) return;

        // Check if all checkboxes for the current phase are checked
        const allProjectsAreChecked = content.projects.every((project, index) => {
            const checkboxId = `${phaseId}-project-${index}`;
            return localStorage.getItem(checkboxId) === 'true';
        });

        const wasPreviouslyCompleted = userData.completedPhases.includes(phaseId);

        if (allProjectsAreChecked && !wasPreviouslyCompleted) {
            // Phase is now completed for the first time
            userData.currentXp += PHASE_XP[phaseId] || 0; // Add XP for the phase
            userData.completedPhases.push(phaseId); // Mark phase as completed
            updateRank(); // Update rank based on new XP
            saveUserData(); // Save updated user data
            showCompletionPopup(PHASE_XP[phaseId], userData.currentRank); // Show completion pop-up
            updateDisplay(); // Update UI to display new XP/Rank immediately

        } else if (!allProjectsAreChecked && wasPreviouslyCompleted) {
            // Phase was completed, but now at least one project is unchecked (de-completion)
            userData.currentXp -= PHASE_XP[phaseId] || 0; // Deduct XP
            userData.completedPhases = userData.completedPhases.filter(id => id !== phaseId); // Remove phase from completed list
            // Ensure XP doesn't go below zero
            if (userData.currentXp < 0) {
                userData.currentXp = 0;
            }
            updateRank(); // Re-evaluate rank based on new XP
            saveUserData(); // Save updated user data
            updateDisplay(); // Update UI immediately
            // No pop-up for de-completion, just silent update
        }
    }

    // Event listeners for phase titles (lectures)
    lectureTitleLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const phaseId = e.currentTarget.dataset.phaseId; // Use currentTarget to get phaseId from the div
            loadLectureContent(phaseId);
        });
    });

    // Event listeners for assignment buttons
    assignmentButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const phaseId = e.target.dataset.phaseId;
            loadAssignmentContent(phaseId);
        });
    });

    // Initial state: ensure dynamic content area is visible, player is clear
    dynamicContentArea.style.display = 'none'; // Hide dynamic content area initially
    lecturePlayer.src = 'about:blank';
    lecturePlayer.style.display = 'none';
    mainContentPlaceholder.style.display = 'block';

    // Pop-up elements
    const completionPopupOverlay = document.getElementById('completion-popup-overlay');
    const popupXpDisplay = document.getElementById('popup-xp-display');
    const popupRankDisplay = document.getElementById('popup-rank-display');
    const popupCloseButton = document.getElementById('popup-close-button');

    // Function to show the custom pop-up
    function showCompletionPopup(xpEarned, newRank) {
        popupXpDisplay.textContent = xpEarned;
        popupRankDisplay.textContent = newRank;
        completionPopupOverlay.classList.remove('hidden');
    }

    // Function to hide the custom pop-up
    function hideCompletionPopup() {
        completionPopupOverlay.classList.add('hidden');
    }

    // Event listener for the pop-up close button
    popupCloseButton.addEventListener('click', hideCompletionPopup);

});
