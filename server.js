const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const skillRecords = [
  {
    id: 1,
    name: 'Frontend Architecture',
    category: 'Product Engineering',
    level: 'Advanced',
    confidence: 94,
    proof: 'Led UI architecture for a multi-screen SaaS dashboard with reusable patterns.',
    evidence: ['Design system adoption', 'Component library', 'Cross-team coordination']
  },
  {
    id: 2,
    name: 'API Design',
    category: 'Platform',
    level: 'Advanced',
    confidence: 89,
    proof: 'Built stable REST APIs and performance improvements for internal tooling.',
    evidence: ['Rate limiting', 'Versioned contracts', 'Observability']
  },
  {
    id: 3,
    name: 'Stakeholder Communication',
    category: 'Leadership',
    level: 'Strong',
    confidence: 91,
    proof: 'Partnered with product and QA to align delivery plans and unblock launches.',
    evidence: ['Roadmap planning', 'Sprint reviews', 'Risk communication']
  }
];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/skills', (req, res) => {
  res.json({
    summary: {
      totalSkills: skillRecords.length,
      averageConfidence: Math.round(
        skillRecords.reduce((sum, item) => sum + item.confidence, 0) / skillRecords.length
      ),
      verifiedProjects: 12
    },
    skills: skillRecords
  });
});

app.post('/api/skills', (req, res) => {
  const { name, category, level, proof, confidence } = req.body;

  if (!name || !category || !level || !proof) {
    return res.status(400).json({ message: 'Missing required field(s).' });
  }

  const newRecord = {
    id: Date.now(),
    name,
    category,
    level,
    confidence: Number(confidence) || 80,
    proof,
    evidence: ['New evidence added', 'Validated by reviewer']
  };

  skillRecords.unshift(newRecord);

  res.status(201).json({ message: 'Skill added successfully.', skill: newRecord });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`SkillProof app listening at http://localhost:${port}`);
});
