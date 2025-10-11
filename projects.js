const scriptURL = "https://script.google.com/macros/s/AKfycbzH-T8-dthF-EiTUUw5MFOWT9nfHnHNNvMY7OO5PC2Ny81ju3952Y4gM07DjqJrjzKFpw/exec"; // Google Apps Script Web App URL

let allProjects = [];

// Fetch all projects from Google Sheet
function loadProjects() {
  fetch(scriptURL)
    .then(res => res.json())
    .then(projects => {
      allProjects = projects;
      displayProjects(projects);
    })
    .catch(err => {
      console.error("Error fetching projects:", err);
      document.getElementById("result").innerHTML = "<p>Failed to load projects.</p>";
    });
}

// Display projects on page
function displayProjects(projects) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (!projects || projects.length === 0) {
    resultDiv.innerHTML = "<p>No projects found.</p>";
    return;
  }

  projects.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <h2>${p.projectName}</h2>
      <p><b>Summary:</b> ${p.summary}</p>
      <p><b>Created By:</b> ${p.createdBy}</p>
      <p><b>Details:</b> ${p.details || "NA"}</p>
      <p><b>Class:</b> ${p.class || "NA"}</p>
      <p><b>Time Created:</b> ${p.Timecreated || "NA"}</p>
      <p><b>Project Displayed:</b> ${p.projectdisplayed || "NA"}</p>
      <p><b>Cost of items:</b> ${p.costitems || "NA"}</p>
    `;
    resultDiv.appendChild(div);
  });
}

// Search functionality
function searchProject() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const filtered = allProjects.filter(p =>
    (p.projectName && p.projectName.toLowerCase().includes(query)) ||
    (p.createdBy && p.createdBy.toLowerCase().includes(query))
  );
  displayProjects(filtered);
}

// Add a new project
function addProject(e) {
  e.preventDefault();

  const newProj = {
    projectName: document.getElementById("pname").value,
    summary: document.getElementById("psummary").value,
    createdBy: document.getElementById("pcreatedBy").value,
    details: document.getElementById("pdetails").value,
    class: document.getElementById("pclass").value,
    Timecreated: document.getElementById("ptime").value,
    projectdisplayed: document.getElementById("pdisplayed").value,
    costitems: document.getElementById("pcost").value
  };

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(newProj)
  })
  .then(res => res.json())
  .then(() => {
    alert("✅ Project added successfully!");
    document.getElementById("projectForm").reset();
    loadProjects(); // reload all projects
  })
  .catch(err => alert("Error adding project: " + err));
}

// Initialize particle background (optional)
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
function resizeCanvas(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
window.addEventListener("resize", resizeCanvas); resizeCanvas();
class Particle{constructor(){this.x=Math.random()*canvas.width;this.y=Math.random()*canvas.height;this.size=Math.random()*3+1;this.speedX=(Math.random()-0.5)*1.5;this.speedY=(Math.random()-0.5)*1.5;} update(){this.x+=this.speedX;this.y+=this.speedY;if(this.x<0||this.x>canvas.width)this.speedX*=-1;if(this.y<0||this.y>canvas.height)this.speedY*=-1;} draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);ctx.fillStyle="rgba(255,255,255,0.7)";ctx.fill();}}
function initParticles(){particles=[];for(let i=0;i<100;i++){particles.push(new Particle());}}
function animate(){ctx.clearRect(0,0,canvas.width,canvas.height);particles.forEach(p=>{p.update();p.draw();});requestAnimationFrame(animate);}
initParticles(); animate();

window.onload = loadProjects;
