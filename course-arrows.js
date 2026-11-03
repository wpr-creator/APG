/* One decorative icon system: internal, external, and back navigation. */
(() => {
  const glyphs = /^[↗→←]$/;
  const paths = { right: 'M4 12h16m-6-6 6 6-6 6', external: 'M6 18 18 6M6 6h12v12', back: 'M20 12H4m6-6-6 6 6 6' };
  function icon(span) {
    const glyph = span.dataset.arrow || span.textContent.trim();
    if (!glyphs.test(glyph)) return;
    const link = span.closest('a[href]');
    let direction = glyph === '←' ? 'back' : 'right';
    if (link && direction !== 'back') {
      try { if (new URL(link.href, location.href).origin !== location.origin) direction = 'external'; } catch (_) {}
    } else if (!link && glyph === '↗') direction = 'external';
    if (span.dataset.arrowDirection === direction) return;
    span.dataset.arrow = glyph;
    span.dataset.arrowDirection = direction;
    span.classList.add('apg-arrow');
    span.setAttribute('aria-hidden', 'true');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');svg.setAttribute('focusable', 'false');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', paths[direction]);svg.appendChild(path);
    span.replaceChildren(svg);
  }
  function normalize(root) {
    if (!(root instanceof Element)) return;
    const candidates = root.matches('span') ? [root] : [];
    candidates.push(...root.querySelectorAll('span[aria-hidden="true"],.word-arrow,.lesson-arrow,.arrow,.desk-arrow,.apg-arrow,.library-resource-bottom>span:last-child,.unit-card-bottom>span:last-child,.unit-resources>a>span:last-child'));
    candidates.forEach(icon);
    // Legacy footer and menu links sometimes carry a plain-text arrow.
    const links = root.matches('a') ? [root] : [...root.querySelectorAll('a')];
    links.forEach(link => [link, ...link.querySelectorAll('*')].flatMap(parent => [...parent.childNodes]).filter(node => node.nodeType === Node.TEXT_NODE).forEach(node => {
      const text = node.textContent;
      const match = text.match(/^\s*([←→↗])\s*/) || text.match(/\s*([←→↗])\s*$/);
      if (!match) return;
      const span = document.createElement('span');span.textContent = match[1];
      node.textContent = text.slice(0, match.index) + text.slice(match.index + match[0].length);
      const parent = node.parentNode;
      if (match.index === 0) parent.insertBefore(span, node); else parent.insertBefore(span, node.nextSibling);
      icon(span);
    }));
  }
  normalize(document.body);
  new MutationObserver(records => records.forEach(record => {
    if (record.type === 'attributes') normalize(record.target);
    else record.addedNodes.forEach(normalize);
  })).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['href','target'] });
})();
