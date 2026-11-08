(async () => {
  'use strict';
  const mount = document.getElementById('results-content');
  const percent = (part, total) => 100 * part / total;
  const display = value => value.toFixed(1) + '%';
  const majority = value => value > 50 ? 'yes' : value < 50 ? 'no' : 'tie';
  function comparison(label, values, first, second, kind = '') {
    const total = values[0] + values[1];
    const share = percent(values[0], total);
    return `<div class="comparison ${kind}">
      <div class="comparison-label"><span>${label}</span><small>${total.toLocaleString()} votes</small></div>
      <div class="split-track" role="img" aria-label="${label}: ${first} ${display(share)}, ${second} ${display(100 - share)}">
        <span style="width:${share}%"></span><span style="width:${100 - share}%"></span>
      </div>
      <div class="comparison-values"><span>${display(share)} ${first}</span><span>${display(100 - share)} ${second}</span></div>
    </div>`;
  }
  try {
    const response = await fetch('election-results-2026.json?v=20261108');
    if (!response.ok) throw new Error('Results unavailable');
    const data = await response.json();
    const races = data.races.map(race => {
      const official = race.california || race.county;
      const leader = official[0] > official[1] ? 0 : 1;
      return `<article class="race">
        <div class="race-heading"><p class="label">${race.level}</p><h3>${race.title}</h3><p class="race-leader">${race.names[leader]} leads the count</p></div>
        <div class="candidate-pair">${race.names.map((name, index) => `<div class="candidate candidate-${index}"><img src="assets/election-2026/candidates/${race.photos[index]}.jpg" alt="${name}" width="240" height="280"><h4>${name}</h4><p>${race.parties[index]}</p></div>`).join('')}</div>
        <div class="race-comparisons">
          ${comparison('Our class', race.student, race.names[0], race.names[1], 'class-vote')}
          ${comparison(race.electorate, race.county, race.names[0], race.names[1])}
          ${race.california ? comparison('California', race.california, race.names[0], race.names[1]) : ''}
          <a class="source-link" href="${race.source}">Official race results ↗</a>
        </div>
      </article>`;
    }).join('');
    let different = 0;
    const propositions = data.propositions.map(prop => {
      const studentShare = percent(prop.student.yes, prop.student.yes + prop.student.no);
      const stateShare = percent(prop.california.yes, prop.california.yes + prop.california.no);
      const studentChoice = majority(studentShare);
      const stateChoice = majority(stateShare);
      const match = studentChoice === 'tie' ? 'tie' : studentChoice === stateChoice ? 'agree' : 'differ';
      if (match === 'differ') different++;
      const outcome = stateChoice === 'yes' ? prop.ifYes : prop.ifNo;
      const gap = studentShare - stateShare;
      return `<article class="proposition" data-match="${match}">
        <div class="prop-top"><span class="prop-number"><small>PROP</small>${prop.number}</span><span class="result-label ${stateChoice}">${stateChoice.toUpperCase()} LEADS</span></div>
        <h3>${prop.title}</h3><p class="prop-outcome">${outcome}</p>
        <div class="prop-comparisons">
          ${comparison('Our class', [prop.student.yes, prop.student.no], 'yes', 'no', 'class-vote')}
          ${comparison('San Diego County', [prop.county.yes, prop.county.no], 'yes', 'no')}
          ${comparison('California', [prop.california.yes, prop.california.no], 'yes', 'no')}
        </div>
        <p class="prop-gap">${match === 'tie' ? 'Our class split evenly.' : `${Math.abs(gap).toFixed(1)} points ${gap > 0 ? 'more' : 'less'} support for yes in our class.`}</p>
        <details><summary>What was on the ballot?</summary><p>${prop.ifYes}</p><a href="${prop.source}">Official explanation ↗</a></details>
      </article>`;
    }).join('');
    mount.innerHTML = `<section id="races" class="races-section"><div class="section-intro"><p class="label">01 / THE RACES</p><h2>Who gets<br>the job?</h2><p>Our class picked candidates for three offices. Here’s how those choices compare with the people voting in each race.</p></div>${races}</section>
      <section class="tax-story" aria-labelledby="tax-title"><p class="label">PROPS 40 + 41 + 42 / READ THESE TOGETHER</p><h2 id="tax-title">No billionaire tax<br>from this vote.</h2><p>The proposed one-time tax is behind. A separate measure limiting new wealth taxes is ahead.</p><div class="tax-steps"><p><strong>40 <span>NO leads</span></strong>The billionaire tax would not take effect.</p><p><strong>41 <span>NO leads</span></strong>The extra tax audits and spending rules would not take effect.</p><p><strong>42 <span>YES leads</span></strong>California would add limits on new taxes for owning wealth, and on some taxes that reach into the past.</p></div><a href="https://voterguide.sos.ca.gov/propositions/40/analysis.htm">How these measures connect ↗</a></section>
      <section id="propositions" class="props-section"><div class="section-intro"><p class="label">02 / THE PROPOSITIONS</p><h2>What changes.<br>What stays.</h2><p>All 14 measures, in plain language. The bars show yes and no votes. Our class chose a different side from California on ${different} measures.</p></div>
      <div class="prop-controls" role="group" aria-label="Filter propositions"><button type="button" data-filter="all" aria-pressed="true">All 14</button><button type="button" data-filter="agree" aria-pressed="false">Same side</button><button type="button" data-filter="differ" aria-pressed="false">Different sides</button></div>
      <p id="prop-count" class="filter-count" aria-live="polite">Showing all 14 propositions</p>
      <div class="prop-grid">${propositions}</div></section>`;
    const buttons = mount.querySelectorAll('[data-filter]');
    buttons.forEach(button => button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      let visible = 0;
      mount.querySelectorAll('.proposition').forEach(prop => {
        prop.hidden = filter !== 'all' && prop.dataset.match !== filter;
        if (!prop.hidden) visible++;
      });
      document.getElementById('prop-count').textContent = `Showing ${visible} proposition${visible === 1 ? '' : 's'}`;
    }));
  } catch {
    mount.innerHTML = '<p class="loading">The comparisons could not load. Please refresh, or use the official results links below.</p>';
  }
})();
