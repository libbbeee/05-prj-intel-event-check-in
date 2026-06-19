// Get all DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Track attendance
let count = 0;
const maxCount = 50;
const teamCounts = {
  water: 0,
  zero: 0,
  power: 0,
};
const teamLabels = {
  water: "Team Water Wise",
  zero: "Team Net Zero",
  power: "Team Renewables",
};

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, teamName);

  // Increment count
  count++;
  console.log("Total Check-Ins: ", count);

  // Update total attendance count
  const attendeeCount = document.getElementById("attendeeCount");
  attendeeCount.textContent = count;

  // Update progress bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = percentage;
  console.log(`Progress: ${percentage}`);

  //Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounts[team] += 1;
  teamCounter.textContent = teamCounts[team];

  // Show welcome message
  const greeting = document.getElementById("greeting");
  greeting.textContent = `🎉 Welcome, ${name} from ${teamName}`;
  greeting.style.display = "block";
  greeting.classList.add("success-message");

  // Add attendee to list
  const attendeeList = document.getElementById("attendeeList");
  const attendeeItem = document.createElement("li");
  attendeeItem.className = "attendee-item";
  attendeeItem.innerHTML = `<span class="attendee-name">${name}</span><span class="attendee-team">${teamName}</span>`;
  attendeeList.appendChild(attendeeItem);

  // Celebrate when goal reached
  if (count === maxCount) {
    const winningTeam = Object.keys(teamCounts).reduce(function (
      winner,
      teamKey,
    ) {
      return teamCounts[teamKey] > teamCounts[winner] ? teamKey : winner;
    }, "water");
    const celebration = document.createElement("p");
    celebration.className = "celebration-message";
    celebration.textContent = `🎉 Goal reached! ${teamLabels[winningTeam]} has the most attendees!`;
    greeting.insertAdjacentElement("afterend", celebration);
  }

  form.reset();
});
