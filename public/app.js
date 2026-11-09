const skillGrid = document.getElementById('skill-grid');
const totalSkills = document.getElementById('total-skills');
const avgConfidence = document.getElementById('avg-confidence');
const verifiedProjects = document.getElementById('verified-projects');
const skillForm = document.getElementById('skill-form');

async function loadSkills() {
  const res = await fetch('/api/skills');
  const data = await res.json();

  const { summary, skills } = data;
  totalSkills.textContent = `${skills.length} skills`;
  avgConfidence.textContent = `${summary.averageConfidence}%`;
  verifiedProjects.textContent = summary.verifiedProjects;

  skillGrid.innerHTML = skills
    .map(
      (skill) => `
        <article class="skill-card">
          <div class="skill-header">
            <div>
              <h3>${skill.name}</h3>
              <small>${skill.category}</small>
            </div>
            <span class="badge">${skill.level}</span>
          </div>
          <p>${skill.proof}</p>
          <div class="meta">
            <span>Confidence</span>
            <strong>${skill.confidence}%</strong>
          </div>
          <div class="progress"><span style="width:${skill.confidence}%"></span></div>
          <ul>
            ${skill.evidence.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </article>
      `
    )
    .join('');
}

skillForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    name: document.getElementById('name').value,
    category: document.getElementById('category').value,
    level: document.getElementById('level').value,
    confidence: document.getElementById('confidence').value,
    proof: document.getElementById('proof').value
  };

  const res = await fetch('/api/skills', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const result = await res.json();

  if (!res.ok) {
    alert(result.message || 'Failed to save skill proof.');
    return;
  }

  skillForm.reset();
  document.getElementById('confidence').value = 85;
  loadSkills();
});

loadSkills();
