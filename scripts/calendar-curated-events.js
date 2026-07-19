'use strict';

// Authoritative, course-relevant events that must survive calendar rebuilds.
// These take precedence over research-feed results and glossary fallbacks.
const curatedEvents = {
  '07-18': [
    {
      year: 1947,
      text: 'President Harry S. Truman signs the Presidential Succession Act of 1947, placing the Speaker of the House and the president pro tempore of the Senate next in line after the vice president.',
      ap_connection: 'Unit 2; presidential succession; continuity of government; Congress and the presidency',
      unit: 2,
      category: 'Presidency',
      source_label: 'U.S. Statutes at Large (61 Stat. 380)',
      source_url: 'https://www.govinfo.gov/content/pkg/STATUTE-61/pdf/STATUTE-61-Pg380.pdf',
      kind: 'event'
    }
  ]
};

module.exports = { curatedEvents };
