import { useState } from 'react'

// ─── Data ───────────────────────────────────────────────────────────────────────

const CONDITIONS = [
  {
    id: 'ibs',
    name: 'IBS',
    subtitle: 'Irritable Bowel Syndrome',
    color: '#6366f1',
    rome: 'Recurrent abdominal pain ≥1 day/week in the last 3 months, associated with ≥2 of: related to defecation, change in stool frequency, change in stool form.',
    subtypes: [
      {
        id: 'ibs-d',
        name: 'IBS-D (Diarrhea)',
        criteria: 'Bristol 6-7 ≥25% and Bristol 1-2 <25% of BMs',
        steps: [
          { title: 'Step 1 — Lifestyle & Diet', items: ['Soluble fibre (psyllium)', 'Low FODMAP diet trial (2-6 weeks with dietitian)', 'Regular meals, adequate hydration', 'Exercise counseling'] },
          { title: 'Step 2 — First-line Pharmacotherapy', items: ['Loperamide (titrate to effect, max 16mg/day)', 'Bile acid sequestrant trial (cholestyramine) if post-cholecystectomy or suspected BAM', 'Peppermint oil (IBgard) for pain/bloating'] },
          { title: 'Step 3 — Second-line', items: ['Eluxadoline 100mg BID (avoid if no gallbladder, heavy EtOH, pancreatitis hx)', 'Rifaximin 550mg TID × 14 days (can repeat ×2)', 'Tricyclic antidepressant (amitriptyline/nortriptyline 10-25mg HS, titrate)'] },
          { title: 'Step 4 — Refractory', items: ['Alosetron (women with severe IBS-D, restricted program)', 'Gut-directed psychotherapy (CBT, hypnotherapy)', 'Combination neuromodulator therapy', 'Multidisciplinary pain program'] },
        ],
      },
      {
        id: 'ibs-c',
        name: 'IBS-C (Constipation)',
        criteria: 'Bristol 1-2 ≥25% and Bristol 6-7 <25% of BMs',
        steps: [
          { title: 'Step 1 — Lifestyle & Diet', items: ['Soluble fibre (psyllium — avoid insoluble bran)', 'Low FODMAP diet trial', 'Increase physical activity', 'Adequate fluid intake'] },
          { title: 'Step 2 — First-line Pharmacotherapy', items: ['PEG 3350 (Lax-a-Day/RestoraLAX)', 'Linaclotide 290μg daily (take 30 min before breakfast)', 'Peppermint oil for pain component'] },
          { title: 'Step 3 — Second-line', items: ['Plecanatide 3mg daily', 'Lubiprostone 8μg BID (women)', 'Prucalopride 2mg daily (if overlap with functional constipation)', 'SSRI (if anxiety comorbidity) or TCA low dose'] },
          { title: 'Step 4 — Refractory', items: ['Tenapanor 50mg BID', 'Gut-directed psychotherapy', 'Combination neuromodulators', 'Biofeedback if dyssynergic defecation coexists'] },
        ],
      },
      {
        id: 'ibs-m',
        name: 'IBS-M (Mixed)',
        criteria: 'Bristol 1-2 ≥25% AND Bristol 6-7 ≥25% of BMs',
        steps: [
          { title: 'Step 1 — Lifestyle & Diet', items: ['Soluble fibre (psyllium)', 'Low FODMAP diet trial', 'Food-symptom diary to identify triggers', 'Exercise and stress management'] },
          { title: 'Step 2 — Targeted Therapy', items: ['Treat predominant symptom (switch agents as pattern shifts)', 'Antispasmodics (hyoscine, dicyclomine) for pain/cramping', 'Peppermint oil', 'Rifaximin 550mg TID × 14 days'] },
          { title: 'Step 3 — Neuromodulators', items: ['TCA (amitriptyline/nortriptyline) if pain-predominant', 'SSRI (citalopram, fluoxetine) if anxiety/global symptoms', 'Consider mirtazapine if weight loss + nausea component'] },
          { title: 'Step 4 — Refractory', items: ['Gut-directed psychotherapy (CBT, hypnotherapy)', 'Combination neuromodulator therapy', 'Multidisciplinary approach'] },
        ],
      },
    ],
  },
  {
    id: 'fd',
    name: 'FD',
    subtitle: 'Functional Dyspepsia',
    color: '#f59e0b',
    rome: 'One or more of: bothersome postprandial fullness, early satiation, epigastric pain, epigastric burning. No structural disease to explain symptoms. Criteria fulfilled for the last 3 months with onset ≥6 months before diagnosis.',
    subtypes: [
      {
        id: 'pds',
        name: 'PDS (Postprandial Distress)',
        criteria: 'Bothersome postprandial fullness or early satiation ≥3 days/week',
        steps: [
          { title: 'Step 1 — Initial Workup & Lifestyle', items: ['Rule out H. pylori → test & treat (if positive, reassess after eradication)', 'EGD if alarm features or age ≥60 (CAG) or ≥45 (ACG)', 'Small frequent meals, reduce fat intake', 'Stop NSAIDs, reduce alcohol'] },
          { title: 'Step 2 — First-line Pharmacotherapy', items: ['Prokinetic trial: domperidone 10mg TID ac (ECG at baseline — QTc)', 'PPI trial × 8 weeks (though less effective in PDS than EPS)', 'Consider buspirone 10mg TID (fundic relaxation)'] },
          { title: 'Step 3 — Neuromodulators', items: ['Mirtazapine 7.5-15mg HS (especially if weight loss, nausea)', 'TCA low dose (amitriptyline 10-25mg HS)', 'Gut-directed psychotherapy'] },
          { title: 'Step 4 — Refractory', items: ['Gastric emptying study to rule out gastroparesis', 'Acotiamide (not available in Canada — trial data from Japan)', 'Combination therapy', 'Multidisciplinary approach'] },
        ],
      },
      {
        id: 'eps',
        name: 'EPS (Epigastric Pain Syndrome)',
        criteria: 'Bothersome epigastric pain or burning ≥1 day/week',
        steps: [
          { title: 'Step 1 — Initial Workup & Lifestyle', items: ['H. pylori test & treat', 'EGD if alarm features or appropriate age threshold', 'Stop NSAIDs, reduce alcohol/caffeine', 'Dietary modifications'] },
          { title: 'Step 2 — First-line Pharmacotherapy', items: ['PPI trial × 8 weeks (standard dose, then step down)', 'If PPI partial response: add H2RA at bedtime', 'Antacids/sucralfate for breakthrough symptoms'] },
          { title: 'Step 3 — Neuromodulators', items: ['TCA (amitriptyline 10-50mg HS) — best evidence for EPS', 'Mirtazapine if nausea/weight loss component', 'SNRI if comorbid anxiety/depression'] },
          { title: 'Step 4 — Refractory', items: ['Gut-directed psychotherapy', 'Combination neuromodulator therapy', 'Consider functional lumen imaging probe (FLIP) or other specialized testing', 'Multidisciplinary pain program'] },
        ],
      },
    ],
  },
  {
    id: 'fc',
    name: 'FC',
    subtitle: 'Functional Constipation',
    color: '#10b981',
    rome: 'Must include ≥2 of: straining >25%, lumpy/hard stools >25%, incomplete evacuation >25%, anorectal obstruction >25%, manual maneuvers >25%, <3 SBMs/week. Loose stools rarely without laxatives. Insufficient criteria for IBS.',
    subtypes: [
      {
        id: 'fc-nto',
        name: 'Normal Transit / Slow Transit',
        criteria: 'Differentiated by colonic transit study (Sitzmarks or wireless motility capsule)',
        steps: [
          { title: 'Step 1 — Lifestyle & Fibre', items: ['Increase fibre to 25-30g/day (soluble preferred — psyllium)', 'Adequate fluid (1.5-2L/day)', 'Regular physical activity', 'Toilet training: consistent timing, proper posture (squatty stool)'] },
          { title: 'Step 2 — Osmotic Laxatives', items: ['PEG 3350 (17g daily, titrate)', 'Lactulose 15-30mL daily (more bloating than PEG)', 'Magnesium-based laxatives (caution in renal impairment)'] },
          { title: 'Step 3 — Secretagogues & Prokinetics', items: ['Linaclotide 145μg daily', 'Prucalopride 2mg daily (5HT4 agonist — most evidence in slow transit)', 'Lubiprostone 24μg BID', 'Plecanatide 3mg daily'] },
          { title: 'Step 4 — Refractory', items: ['Colonic transit study if not already done', 'Anorectal manometry + balloon expulsion to rule out dyssynergia', 'Biofeedback therapy if dyssynergia confirmed', 'Surgery (subtotal colectomy) only in proven slow transit after all else fails'] },
        ],
      },
      {
        id: 'fc-dd',
        name: 'Dyssynergic Defecation',
        criteria: 'Paradoxical contraction or inadequate relaxation of pelvic floor during defecation',
        steps: [
          { title: 'Step 1 — Diagnosis', items: ['Anorectal manometry (ARM) — gold standard', 'Balloon expulsion test (>60 seconds = abnormal)', 'Defecography if structural outlet obstruction suspected', 'Digital rectal exam (assess puborectalis relaxation)'] },
          { title: 'Step 2 — Biofeedback Therapy', items: ['First-line treatment — 70% response rate', 'EMG or manometry-guided retraining', '6+ sessions with trained physiotherapist', 'Combine with behavioural strategies and toilet posture training'] },
          { title: 'Step 3 — Adjunctive', items: ['Osmotic laxatives to soften stool (PEG)', 'Suppositories (bisacodyl, glycerin) for rectal evacuation', 'Pelvic floor physiotherapy', 'Avoid stimulant laxative dependence'] },
          { title: 'Step 4 — Refractory', items: ['Repeat biofeedback (many need >1 course)', 'Botox injection to puborectalis (limited evidence)', 'Surgical evaluation only for structural causes (rectocele, intussusception)', 'Multidisciplinary pelvic floor center'] },
        ],
      },
    ],
  },
  {
    id: 'fab',
    name: 'FAB',
    subtitle: 'Functional Abdominal Bloating/Distension',
    color: '#ec4899',
    rome: 'Recurrent bloating and/or distension ≥1 day/week. Predominates over other symptoms. Criteria fulfilled for the last 3 months with onset ≥6 months before diagnosis. Insufficient criteria for IBS, FC, or FD.',
    subtypes: [
      {
        id: 'fab-main',
        name: 'Bloating / Distension',
        criteria: 'Bloating = subjective sensation; Distension = objective increase in abdominal girth',
        steps: [
          { title: 'Step 1 — Evaluation & Diet', items: ['Exclude organic causes: celiac serology, lactose/fructose breath tests', 'Assess for SIBO (glucose or lactulose breath test)', 'Low FODMAP diet trial with dietitian guidance', 'Food-symptom diary'] },
          { title: 'Step 2 — First-line', items: ['Simethicone (limited evidence but low risk)', 'Rifaximin 550mg TID × 14 days (if SIBO suspected)', 'Probiotics (strain-specific: B. infantis 35624 has best data)', 'Psyllium fibre (avoid fermentable fibres like inulin)'] },
          { title: 'Step 3 — Targeted Therapy', items: ['Prokinetics if slow transit component (prucalopride)', 'Low-dose neuromodulator if visceral hypersensitivity (TCA, SSRI)', 'Diaphragmatic breathing exercises (abdominophrenic dyssynergia)', 'Gut-directed hypnotherapy'] },
          { title: 'Step 4 — Refractory', items: ['Abdominal CT if distension — rule out structural cause', 'Consider pelvic floor evaluation', 'Combination approach: diet + neuromodulator + psychotherapy', 'Biofeedback for abdominophrenic dyssynergia'] },
        ],
      },
    ],
  },
  {
    id: 'caps',
    name: 'CAPS',
    subtitle: 'Centrally Mediated Abdominal Pain Syndrome',
    color: '#ef4444',
    rome: 'Continuous or nearly continuous abdominal pain. No or only occasional relationship to gut function. Pain is not feigned. Insufficient criteria for other DGBI. Criteria fulfilled for 3 months with onset ≥6 months.',
    subtypes: [
      {
        id: 'caps-main',
        name: 'CAPS',
        criteria: 'Central sensitization — pain driven by CNS processing, not peripheral gut dysfunction',
        steps: [
          { title: 'Step 1 — Establish Diagnosis & Therapeutic Relationship', items: ['Acknowledge pain is real — avoid "it\'s all in your head"', 'Limit further invasive investigations (avoid diagnostic odyssey)', 'Set realistic goals: pain management, not elimination', 'Screen for psychiatric comorbidity (anxiety, depression, trauma/PTSD)'] },
          { title: 'Step 2 — Central Neuromodulators', items: ['TCA (amitriptyline 25-75mg HS) — first-line', 'SNRI (duloxetine 30-60mg, venlafaxine) — especially if comorbid anxiety', 'Mirtazapine 15-30mg if insomnia/weight loss', 'Pregabalin or gabapentin for central sensitization component'] },
          { title: 'Step 3 — Psychological Therapies', items: ['Cognitive behavioural therapy (CBT)', 'Gut-directed hypnotherapy', 'Mindfulness-based stress reduction (MBSR)', 'Trauma-informed therapy if applicable'] },
          { title: 'Step 4 — Refractory / Pitfalls', items: ['Combination neuromodulators (TCA + pregabalin, SNRI + mirtazapine)', 'AVOID opioids — cause narcotic bowel syndrome / opioid-induced hyperalgesia', 'AVOID repeated surgeries or invasive procedures', 'Multidisciplinary pain rehabilitation program'] },
        ],
      },
    ],
  },
  {
    id: 'nerd',
    name: 'FH',
    subtitle: 'Functional Heartburn',
    color: '#8b5cf6',
    rome: 'Retrosternal burning discomfort or pain ≥2 days/week for ≥3 months. No symptom relief with optimal PPI. Absence of GERD (normal acid exposure, no reflux-symptom correlation). No major esophageal motility disorder.',
    subtypes: [
      {
        id: 'fh-main',
        name: 'Functional Heartburn',
        criteria: 'Normal EGD + normal pH/impedance study on PPI → no GERD or reflux hypersensitivity',
        steps: [
          { title: 'Step 1 — Confirm Diagnosis', items: ['EGD on PPI to rule out erosive esophagitis, eosinophilic esophagitis', 'pH-impedance off PPI × 7 days: acid exposure time, symptom index, SAP', 'If AET normal + negative SI/SAP → functional heartburn', 'High-resolution manometry to exclude major motility disorders'] },
          { title: 'Step 2 — Wean PPI & Neuromodulators', items: ['Gradual PPI taper (avoid rebound hyperacidity)', 'TCA low dose (imipramine 25-50mg HS) — best studied for esophageal pain', 'SSRI (fluoxetine, sertraline) if anxiety comorbidity', 'Peppermint oil (smooth muscle relaxant)'] },
          { title: 'Step 3 — Behavioral & Psychological', items: ['Cognitive behavioural therapy', 'Esophageal-directed hypnotherapy', 'Diaphragmatic breathing exercises', 'Reassurance and education about the diagnosis'] },
          { title: 'Step 4 — Refractory', items: ['Combination neuromodulator therapy', 'Pain modulation program', 'AVOID fundoplication — not effective for functional heartburn', 'AVOID escalating PPI dose — already proven ineffective'] },
        ],
      },
    ],
  },
]

// ─── Components ─────────────────────────────────────────────────────────────────

function StepCard({ step, index, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: isActive ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
        border: isActive ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: '16px 20px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: isActive ? 12 : 0 }}>
        {step.title}
      </div>
      {isActive && (
        <ul style={{ margin: 0, paddingLeft: 20, color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 1.7 }}>
          {step.items.map((item, i) => (
            <li key={i} style={{ marginBottom: 4 }}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

function SubtypeView({ subtype, color }) {
  const [activeStep, setActiveStep] = useState(0)
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{subtype.name}</div>
        <div style={{
          fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 4,
          background: 'rgba(255,255,255,0.06)', padding: '8px 12px', borderRadius: 8,
          borderLeft: `3px solid ${color}`,
        }}>
          {subtype.criteria}
        </div>
      </div>
      {/* Step progress bar */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
        {subtype.steps.map((_, i) => (
          <div
            key={i}
            onClick={() => setActiveStep(i)}
            style={{
              flex: 1, height: 4, borderRadius: 2, cursor: 'pointer',
              background: i <= activeStep ? color : 'rgba(255,255,255,0.15)',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {subtype.steps.map((step, i) => (
          <StepCard
            key={i}
            step={step}
            index={i}
            isActive={i === activeStep}
            onClick={() => setActiveStep(i)}
          />
        ))}
      </div>
      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <button
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          style={{
            padding: '8px 20px', borderRadius: 8, border: 'none', cursor: activeStep === 0 ? 'default' : 'pointer',
            background: activeStep === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
            color: activeStep === 0 ? 'rgba(255,255,255,0.3)' : '#fff',
            fontWeight: 600, fontSize: 14,
          }}
        >
          Previous
        </button>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, alignSelf: 'center' }}>
          Step {activeStep + 1} of {subtype.steps.length}
        </span>
        <button
          onClick={() => setActiveStep(Math.min(subtype.steps.length - 1, activeStep + 1))}
          disabled={activeStep === subtype.steps.length - 1}
          style={{
            padding: '8px 20px', borderRadius: 8, border: 'none',
            cursor: activeStep === subtype.steps.length - 1 ? 'default' : 'pointer',
            background: activeStep === subtype.steps.length - 1 ? 'rgba(255,255,255,0.05)' : color,
            color: '#fff', fontWeight: 600, fontSize: 14,
          }}
        >
          Next Step
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [selectedCondition, setSelectedCondition] = useState(null)
  const [selectedSubtype, setSelectedSubtype] = useState(null)

  const condition = CONDITIONS.find(c => c.id === selectedCondition)
  const subtype = condition?.subtypes.find(s => s.id === selectedSubtype)

  return (
    <div style={{ minHeight: '100vh', background: '#0B1120', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Header */}
      <header style={{
        padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
            DGBI Treatment Algorithms
          </h1>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: '2px 0 0' }}>
            Resident Teaching — Interactive Whiteboard
          </p>
        </div>
        {selectedCondition && (
          <button
            onClick={() => { setSelectedCondition(null); setSelectedSubtype(null) }}
            style={{
              padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)',
              background: 'transparent', color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
              fontSize: 13, fontWeight: 500,
            }}
          >
            All Conditions
          </button>
        )}
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px' }}>
        {/* Condition selector */}
        {!selectedCondition && (
          <>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 20, textAlign: 'center' }}>
              Select a condition to view its treatment algorithm
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
              {CONDITIONS.map(c => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCondition(c.id)}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 14,
                    padding: '20px 24px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    borderLeft: `4px solid ${c.color}`,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ fontSize: 28, fontWeight: 800, color: c.color }}>{c.name}</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{c.subtitle}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 8 }}>
                    {c.subtypes.length} subtype{c.subtypes.length > 1 ? 's' : ''} &middot; {c.subtypes.reduce((sum, s) => sum + s.steps.length, 0)} steps
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Condition detail */}
        {condition && !selectedSubtype && (
          <>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: condition.color }}>{condition.name}</div>
              <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{condition.subtitle}</div>
              <div style={{
                marginTop: 12, padding: '14px 18px', background: 'rgba(255,255,255,0.04)',
                borderRadius: 10, fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6,
                borderLeft: `3px solid ${condition.color}`,
              }}>
                <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Rome IV Criteria:</strong> {condition.rome}
              </div>
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>Select subtype:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {condition.subtypes.map(s => (
                <div
                  key={s.id}
                  onClick={() => setSelectedSubtype(s.id)}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12,
                    padding: '16px 20px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                >
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>{s.name}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{s.criteria}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>{s.steps.length} treatment steps</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Subtype treatment algorithm */}
        {condition && subtype && (
          <>
            <button
              onClick={() => setSelectedSubtype(null)}
              style={{
                marginBottom: 16, padding: '4px 0', background: 'none', border: 'none',
                color: condition.color, cursor: 'pointer', fontSize: 13, fontWeight: 500,
              }}
            >
              &larr; Back to {condition.name} subtypes
            </button>
            <SubtypeView subtype={subtype} color={condition.color} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        padding: '16px 24px', textAlign: 'center', fontSize: 11,
        color: 'rgba(255,255,255,0.25)', borderTop: '1px solid rgba(255,255,255,0.05)',
        marginTop: 40,
      }}>
        For educational purposes only. Based on ACG/CAG/AGA/Rome IV guidelines.
        Not a substitute for clinical judgment.
      </footer>
    </div>
  )
}
