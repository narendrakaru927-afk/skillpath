var careers = [
    {
        name: "Frontend Developer",
        description: "Build the part of a website that people see and use.",
        skills: ["HTML", "CSS", "Git"],
        roadmap: ["Practice HTML page structure", "Learn CSS layouts", "Make a small website"],
        project: "Create a personal portfolio website."
    },
    {
        name: "Java Developer",
        description: "Build programs and applications using Java.",
        skills: ["Java", "SQL", "Git"],
        roadmap: ["Practice Java basics", "Learn classes and objects", "Connect a program to a database"],
        project: "Create a simple student record program."
    },
    {
        name: "Python Developer",
        description: "Write programs and solve problems using Python.",
        skills: ["Python", "SQL", "Git"],
        roadmap: ["Practice Python basics", "Learn functions and lists", "Build a small Python project"],
        project: "Create a simple quiz program."
    },
    {
        name: "Web Developer",
        description: "Create and maintain websites.",
        skills: ["HTML", "CSS", "Java", "Git"],
        roadmap: ["Build a page with HTML", "Style it with CSS", "Learn how websites use programming"],
        project: "Create a college information website."
    },
    {
        name: "Database Assistant",
        description: "Organize information and work with databases.",
        skills: ["SQL", "Python"],
        roadmap: ["Learn database tables", "Practice SQL queries", "Use a small sample dataset"],
        project: "Create a student marks database design."
    }
];

var checkboxes = document.querySelectorAll('input[name="skill"]');
var selectedCount = document.getElementById("selectedCount");
var findButton = document.getElementById("findButton");
var message = document.getElementById("message");
var results = document.getElementById("results");
var careerList = document.getElementById("careerList");

for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", updateCount);
}

function updateCount() {
    var count = 0;

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            count = count + 1;
        }
    }

    selectedCount.textContent = count + " skills selected";
}

function getSelectedSkills() {
    var selectedSkills = [];

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedSkills.push(checkboxes[i].value);
        }
    }

    return selectedSkills;
}

function findCareers() {
    var selectedSkills = getSelectedSkills();

    if (selectedSkills.length === 0) {
        message.textContent = "Please select at least one skill first.";
        results.hidden = true;
        return;
    }

    message.textContent = "";
    careerList.innerHTML = "";
    var matches = [];

    for (var i = 0; i < careers.length; i++) {
        var career = careers[i];
        var matchedSkills = [];
        var missingSkills = [];

        for (var j = 0; j < career.skills.length; j++) {
            if (selectedSkills.indexOf(career.skills[j]) !== -1) {
                matchedSkills.push(career.skills[j]);
            } else {
                missingSkills.push(career.skills[j]);
            }
        }

        var score = Math.round((matchedSkills.length / career.skills.length) * 100);

        matches.push({
            career: career,
            matched: matchedSkills,
            missing: missingSkills,
            score: score
        });
    }

    matches.sort(function(a, b) {
        return b.score - a.score;
    });

    for (var i = 0; i < matches.length && i < 5; i++) {
        showCareer(matches[i]);
    }

    results.hidden = false;
    results.scrollIntoView({ behavior: "smooth" });
}

function showCareer(match) {
    var card = document.createElement("div");
    card.className = "career-card";

    var title = document.createElement("h3");
    title.textContent = match.career.name;
    card.appendChild(title);

    var description = document.createElement("p");
    description.textContent = match.career.description;
    card.appendChild(description);

    var score = document.createElement("p");
    score.className = "score";
    score.textContent = "Skill match: " + match.score + "%";
    card.appendChild(score);

    var matchedTitle = document.createElement("p");
    matchedTitle.innerHTML = "<strong>Skills you have:</strong>";
    card.appendChild(matchedTitle);

    if (match.matched.length === 0) {
        matchedTitle.textContent = "Skills you have: None from this career's list yet.";
    } else {
        for (var i = 0; i < match.matched.length; i++) {
            var tag = document.createElement("span");
            tag.className = "tag";
            tag.textContent = match.matched[i];
            card.appendChild(tag);
        }
    }

    var missingTitle = document.createElement("p");
    missingTitle.innerHTML = "<strong>Skills to learn next:</strong>";
    card.appendChild(missingTitle);

    if (match.missing.length === 0) {
        var complete = document.createElement("p");
        complete.textContent = "You selected all the sample skills listed for this career.";
        card.appendChild(complete);
    } else {
        var missingList = document.createElement("ul");

        for (var i = 0; i < match.missing.length; i++) {
            var item = document.createElement("li");
            item.textContent = match.missing[i];
            missingList.appendChild(item);
        }

        card.appendChild(missingList);
    }

    var roadmapTitle = document.createElement("p");
    roadmapTitle.innerHTML = "<strong>Suggested learning steps:</strong>";
    card.appendChild(roadmapTitle);

    var roadmapList = document.createElement("ol");

    for (var i = 0; i < match.career.roadmap.length; i++) {
        var step = document.createElement("li");
        step.textContent = match.career.roadmap[i];
        roadmapList.appendChild(step);
    }

    card.appendChild(roadmapList);

    var project = document.createElement("p");
    project.innerHTML = "<strong>Beginner project idea:</strong> " + match.career.project;
    card.appendChild(project);

    careerList.appendChild(card);
}

findButton.addEventListener("click", findCareers);
