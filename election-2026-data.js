window.ELECTION_2026_DATA = {
  updated: "SEPTEMBER 19, 2026",
  electionDate: "NOVEMBER 3, 2026",
  registrationDeadline: "OCTOBER 19, 2026",
  ballotMailingDeadline: "OCTOBER 5, 2026",
  location: {
    exampleZip: "92114",
    district: "CALIFORNIA DISTRICT 52",
    note: "Enter your ZIP code. Then use the official lookup for your exact ballot. A ZIP code can include more than one voting district.",
    lookupSource: "https://www.sdvote.com/content/rov/en/sample-ballot-info-lookup.html"
  },
  races: [
    {
      office: "CALIFORNIA GOVERNOR",
      question: "WHO SHOULD BE CALIFORNIA’S GOVERNOR?",
      note: "The governor runs California’s state government, proposes the state budget, and signs or vetoes state laws. The term lasts four years.",
      candidates: [
        { name: "XAVIER BECERRA", party: "DEMOCRATIC", fact: "Former California attorney general, U.S. cabinet secretary, and member of Congress." },
        { name: "STEVE HILTON", party: "REPUBLICAN", fact: "Former policy adviser and television host. He has not held elected office." }
      ],
      source: "https://voterguide.sos.ca.gov/candidates/governor-candidate-statements.htm"
    },
    {
      office: "U.S. HOUSE · DISTRICT 52",
      question: "WHO SHOULD REPRESENT THIS AREA IN CONGRESS?",
      note: "A U.S. representative votes on national laws, taxes, and spending. The term lasts two years.",
      local: true,
      candidates: [
        { name: "JUAN VARGAS", party: "DEMOCRATIC", fact: "Current District 52 representative and former state and local elected official." },
        { name: "JEFF BELLE", party: "REPUBLICAN", fact: "Business owner challenging the current representative." }
      ],
      source: "https://elections.cdn.sos.ca.gov/statewide-elections/2026-general/cert-list-candidates.pdf"
    }
  ],
  propositions: [
    {
      number: 1,
      title: "BORROW MONEY FOR HOUSING",
      short: "Should California borrow $11.25 billion to help pay for affordable housing?",
      explanation: "A bond lets the state borrow money and repay it over time. This money would support affordable housing, veterans’ home loans, and help with down payments.",
      yes: "The state borrows and spends the $11.25 billion.",
      no: "The state does not borrow this money.",
      money: "Repaying it would cost the state about $500 million to $600 million each year for about 25 years.",
      featured: true,
      source: "https://voterguide.sos.ca.gov/propositions/1/index.htm"
    },
    {
      number: 2,
      title: "A LARGER RAINY DAY FUND",
      short: "Changes how much money California saves for future emergencies.",
      explanation: "A rainy day fund is money the state saves for emergencies or years when tax revenue falls. The measure also changes rules for paying state debt.",
      yes: "The state changes the rules, builds larger budget reserves, and must make extra debt payments for a longer time.",
      no: "The current rules for state savings and extra debt payments stay in place.",
      money: "State budget reserves would likely be higher, leaving more saved money for future downturns.",
      featured: false,
      source: "https://voterguide.sos.ca.gov/propositions/2/index.htm"
    },
    {
      number: 3,
      title: "TAX ON HIGH INCOMES",
      short: "Should a tax on very high incomes continue permanently?",
      explanation: "California currently charges an extra tax on income above about $371,000. The money helps fund public schools. The tax is supposed to end in 2031.",
      yes: "The extra tax never ends.",
      no: "The extra tax ends in 2031.",
      money: "Keeping it would bring the state about $5 billion to $15 billion each year after 2031.",
      featured: true,
      source: "https://voterguide.sos.ca.gov/propositions/3/index.htm"
    },
    {
      number: 4,
      title: "PUBLIC MONEY FOR CAMPAIGNS",
      short: "Should governments be allowed to help pay for political campaigns?",
      explanation: "Right now, California mostly bans this. The measure would let state and local governments create programs that give public money to candidates who follow the rules.",
      yes: "Governments may create these programs.",
      no: "The current ban stays.",
      money: "Running the programs would cost money. The amount depends on which governments create one.",
      featured: true,
      source: "https://voterguide.sos.ca.gov/propositions/4/index.htm"
    },
    {
      number: 5,
      title: "RECALL ELECTIONS",
      short: "Should California change how a removed state official is replaced?",
      explanation: "A recall election lets voters remove an official before the term ends. Today, voters also choose a possible replacement on the same ballot.",
      yes: "Replacement names come off the recall ballot. The replacement would usually be chosen later by an election or appointment.",
      no: "The recall ballot keeps both questions: remove the official and choose a replacement.",
      money: "A separate replacement election could cost millions of dollars.",
      featured: true,
      source: "https://voterguide.sos.ca.gov/propositions/5/index.htm"
    },
    {
      number: 37,
      title: "MIDDLE-INCOME HOME LOANS",
      short: "Creates a state loan program for some middle-income homebuyers.",
      explanation: "Eligible buyers could receive a fixed-rate state loan for up to 17% of a qualifying new home’s price. Buyers must meet residency, income, occupancy, and down-payment rules.",
      yes: "The state may sell up to $25 billion in bonds and create the homebuying loan program.",
      no: "The state is not required to create this new homebuying program.",
      money: "Homeowners’ loan payments, rather than the state budget, would repay the bonds. The state estimates no direct state or local cost.",
      featured: false,
      source: "https://voterguide.sos.ca.gov/propositions/37/index.htm"
    },
    {
      number: 38,
      title: "MEDICAL RESEARCH BONDS",
      short: "Borrows $8.4 billion for research into immune-system treatments.",
      explanation: "Half of the money would go to one UC-affiliated nonprofit research institute. The other half would fund grants to public or nonprofit universities and institutions.",
      yes: "California may sell $8.4 billion in bonds for immunology and immunotherapy research.",
      no: "California may not sell these bonds for the proposed research program.",
      money: "The state would pay about $500 million to $600 million each year for about 20 years, although research revenue could repay part of the cost.",
      featured: false,
      source: "https://voterguide.sos.ca.gov/propositions/38/index.htm"
    },
    {
      number: 39,
      title: "ID REQUIRED TO VOTE",
      short: "Should voters have to provide ID information every time they vote?",
      explanation: "People voting in person would show government ID. People voting by mail would write the last four digits of an approved ID number on the envelope. Free voter ID cards would be available.",
      yes: "The new ID rules begin.",
      no: "Current rules stay. Election officials continue checking the voter’s signature.",
      money: "The change could cost governments tens of millions to hundreds of millions of dollars each year.",
      featured: true,
      source: "https://voterguide.sos.ca.gov/propositions/39/index.htm"
    },
    {
      number: 40,
      title: "ONE-TIME TAX ON BILLIONAIRES",
      short: "Should California collect a one-time tax on wealth above $1 billion?",
      explanation: "The tax would equal 5% of some wealth above $1 billion. Most of the money would pay for health care.",
      yes: "California collects the tax once.",
      no: "California does not collect the tax.",
      money: "It could raise tens of billions of dollars. Some billionaires might leave California, which could reduce future tax money.",
      featured: true,
      source: "https://voterguide.sos.ca.gov/propositions/40/index.htm"
    },
    {
      number: 41,
      title: "AUDITS OF SPECIAL-TAX PROGRAMS",
      short: "Adds more reviews and audits for programs paid for by special taxes.",
      explanation: "A special tax raises money for a stated purpose. The measure requires reviews before some tax initiatives reach voters and repeated audits after new special taxes fund programs. It also restricts excluding new tax money from the state spending limit.",
      yes: "The new audit requirements and spending-limit rule take effect.",
      no: "Current audit responsibilities and state spending-limit rules stay in place.",
      money: "The total cost or savings is unknown because it depends on future taxes, audits, and programs.",
      featured: false,
      source: "https://voterguide.sos.ca.gov/propositions/41/index.htm"
    },
    {
      number: 42,
      title: "LIMITS ON NEW PROPERTY TAXES",
      short: "Limits California’s ability to create some new taxes on things people own.",
      explanation: "Personal property means things people own other than real estate, including investments, retirement accounts, business interests, and intellectual property.",
      yes: "The state cannot create new taxes on owning personal property and cannot create certain taxes that apply retroactively to past activity.",
      no: "The state keeps the option to create these taxes in the future.",
      money: "Future state tax revenue might be lower than it otherwise would be.",
      featured: false,
      source: "https://voterguide.sos.ca.gov/propositions/42/index.htm"
    },
    {
      number: 43,
      title: "LOCAL SPECIAL TAXES",
      short: "Should some local taxes need two-thirds approval instead of a simple majority?",
      explanation: "A special tax pays for one named purpose, such as roads or fire protection. Some can now pass with just over half the vote.",
      yes: "These taxes need support from at least two-thirds of voters.",
      no: "Current rules stay, so some can pass with just over half.",
      money: "Fewer local taxes might pass, so local governments could collect less money.",
      featured: true,
      source: "https://voterguide.sos.ca.gov/propositions/43/index.htm"
    },
    {
      number: 44,
      title: "COMMUNITY CLINIC SPENDING",
      short: "Requires some nonprofit clinics to spend at least 90% of their money on services.",
      explanation: "These clinics provide primary care in medically underserved communities. Program services include patient care and other work that supports the clinic’s charitable mission.",
      yes: "Covered clinics must meet the 90% requirement or may face penalties, with limited exceptions.",
      no: "The new clinic spending requirement does not take effect.",
      money: "State enforcement could cost up to the low tens of millions of dollars each year, mostly covered by fees and penalties.",
      featured: false,
      source: "https://voterguide.sos.ca.gov/propositions/44/index.htm"
    },
    {
      number: 45,
      title: "FASTER ENVIRONMENTAL REVIEW",
      short: "Speeds up environmental reviews for some large projects.",
      explanation: "The measure covers many housing, transportation, water, health, and clean-energy projects. It sets deadlines and limits some parts of environmental and court review.",
      yes: "Qualifying projects use the new, faster review and court procedures.",
      no: "Projects continue using current environmental review and court procedures.",
      money: "Early government costs could reach or exceed $100 million each year. Longer-term costs or savings are uncertain.",
      featured: false,
      source: "https://voterguide.sos.ca.gov/propositions/45/index.htm"
    }
  ],
  sources: {
    officialMeasures: "https://www.sos.ca.gov/elections/ballot-measures/qualified-ballot-measures",
    voterGuide: "https://voterguide.sos.ca.gov/",
    candidates: "https://www.sos.ca.gov/elections/upcoming-elections/general-election-november-3-2026",
    dates: "https://www.sos.ca.gov/elections/upcoming-elections/general-election-november-3-2026/key-dates-deadlines"
  }
};
