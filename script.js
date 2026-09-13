// ============ THEME TOGGLE ============
(function () {
  const root = document.body;
  const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('ms-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  root.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('ms-theme', next);
  });
})();

// ============ MOBILE NAV ============
(function () {
  const burger = document.getElementById('navBurger');
  const links = document.querySelector('.nav__links');
  if (!burger) return;
  burger.addEventListener('click', () => {
    const open = links.style.display === 'flex';
    links.style.display = open ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '64px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.padding = '20px 24px';
    links.style.background = 'var(--bg-raised)';
    links.style.borderBottom = '1px solid var(--border)';
  });
})();

// ============ FOOTER YEAR ============
document.getElementById('footerYear').textContent = new Date().getFullYear();

// ============ TERMINAL ============
(function () {
  const body = document.getElementById('terminalBody');
  const input = document.getElementById('terminalInput');
  const row = input.closest('.t-row');

  const commands = {
    help: () =>
      [
        'Available commands:',
        '  whoami        short bio',
        '  education     degree + college',
        '  skills        technical skills',
        '  experience    internships',
        '  projects      project list',
        '  achievements  awards + certifications',
        '  contact       how to reach me',
        '  clear         clear the screen',
      ].join('\n'),

    whoami: () =>
      "Mahi Sinha — CS student at Bihar Engineering University.\nFull-stack (MERN) developer with a growing focus on applied ML.\nAlso my college's Training & Placement Coordinator.",

    education: () =>
      'B.Tech, Computer Science & Engineering\nBihar Engineering University — Purnea College of Engineering\nCGPA: 9.0  |  6th semester  |  GATE Qualified',

    skills: () =>
      'Languages    C, C++, Python, JavaScript, TypeScript, Java\nFrameworks   React.js, Node.js, Express.js\nDatabases    MongoDB\nAI / ML      Machine Learning, NLP, Gemini API\nTools        Git, GitHub, VS Code, IoT',

    experience: () =>
      'NPTEL Intern, IIT Ropar — MERN stack (2.5 months)\nIntern, Internshala — Full stack web dev (2 months)\nIntern, Edunet Foundation — AI foundations (1 month)',

    projects: () =>
      "1. Vi-Notes — academic integrity detection tool\n2. Cyberbullying Detection System — NLP classifier\n3. College Web Prototype — full-stack UI/UX\n\nScroll to the Projects section for the full writeups.",

    achievements: () =>
      'Golden Ticket, IIT Ropar (1 of 3 in cohort)\nGATE Qualified · Class Representative\nTop 2% nationally, Joy of Computing (NPTEL)\nTop 5% nationally, OOP Fundamentals (NPTEL)\nEthical Hacking (EC-Council) · IoT Certification',

    contact: () =>
      'Email    sinhamahi14092005@gmail.com\nPhone    +91 62053 16071\nLinkedIn linkedin.com/in/mahisinha\nGitHub   github.com/Mahisinha',

    'sudo hire-mahi': () =>
      "[sudo] password for recruiter: ********\nPermission granted.\nInitializing onboarding sequence... done.\nWelcome to the team.",

    clear: () => null,
  };

  function printLine(text, cls) {
    const p = document.createElement('p');
    p.className = 't-line' + (cls ? ' ' + cls : '');
    p.textContent = text;
    body.insertBefore(p, row);
  }

  function runCommand(raw) {
    const cmd = raw.trim();
    printLine('mahi@portfolio:~$ ' + cmd, 't-heading');
    if (!cmd) return;

    if (cmd === 'clear') {
      body.querySelectorAll('.t-line').forEach((el) => el.remove());
      return;
    }

    const handler = commands[cmd.toLowerCase()];
    if (handler) {
      printLine(handler());
    } else {
      printLine(`command not found: ${cmd}. type 'help' for the list.`);
    }
    body.scrollTop = body.scrollHeight;
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      runCommand(input.value);
      input.value = '';
    }
  });

  document.getElementById('terminal').addEventListener('click', () => input.focus());
})();
