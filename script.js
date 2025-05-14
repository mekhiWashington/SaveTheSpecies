const terminal = document.getElementById("terminal");
const ghost = document.getElementById("ghost");

const bootLines = [
  "Initializing BIO...",
  "Memory check: 65536K OK",
  "Loading bootloader...",
  "Bootloader loaded.",
  "Starting operating system...",
  "System boot complete.",
  "Password Hint: Father Of Evolution",
  "",
];

let lineIndex = 0;
let charIndex = 0;
let isLoginScreen = false;
let userInput = "";

function updateTerminal(newContent) {
  ghost.innerHTML = terminal.innerHTML;
  ghost.style.opacity = 1;
  setTimeout(() => {
    ghost.style.opacity = 0;
  }, 10);

  terminal.innerHTML = newContent;
}

let loginStep = "username";
let usernameInput = "";
let passwordInput = "";

function typeCharacter() {
  if (lineIndex < bootLines.length) {
    const line = bootLines[lineIndex];
    let currentText = terminal.textContent;

    if (charIndex < line.length) {
      currentText += line.charAt(charIndex);
      charIndex++;
      updateTerminal(currentText);
      setTimeout(typeCharacter, 40);
    } else {
      currentText += "\n";
      lineIndex++;
      charIndex = 0;
      updateTerminal(currentText);
      setTimeout(typeCharacter, 500);
    }
  } else {
    showLoginScreen();
  }
}

function showLoginScreen() {
  isLoginScreen = true;
  userInput = "";
  loginStep = "username";
  terminal.innerHTML += "Username: ";
}

document.addEventListener("keydown", (e) => {
  if (!isLoginScreen) return;

  if (e.key === "Backspace") {
    if (loginStep === "username") {
      usernameInput = usernameInput.slice(0, -1);
    } else {
      passwordInput = passwordInput.slice(0, -1);
    }
  } else if (e.key.length === 1 && e.key.match(/^[a-zA-Z0-9_]$/)) {
    if (loginStep === "username") {
      usernameInput += e.key;
    } else {
      passwordInput += e.key;
    }
  } else if (e.key === "Enter") {
    if (loginStep === "username") {
      loginStep = "password";
      terminal.innerHTML += "\nPassword: ";
    } else {
      processLogin(usernameInput, passwordInput);
      return;
    }
  }

  const baseContent = terminal.textContent.split("Username:")[0];
  if (loginStep === "username") {
    updateTerminal(baseContent + "Username: " + usernameInput);
  } else {
    updateTerminal(
      baseContent +
        "Username: " +
        usernameInput +
        "\nPassword: " +
        "*".repeat(passwordInput.length)
    );
  }
});

function processLogin(username, password) {
  isLoginScreen = false;
  if (password === "CharlesDarwin") {
    terminal.innerHTML +=
      "\nAccess Granted.\nWelcome, " + username + ".\nLaunching Desktop...\n";
    setTimeout(showDesktop, 2000);
  } else {
    terminal.innerHTML += "\nAccess Denied.\n";
    setTimeout(() => {
      terminal.innerHTML += "\nUsername: ";
      loginStep = "username";
      usernameInput = "";
      passwordInput = "";
      isLoginScreen = true;
    }, 2000);
  }
}

function showDesktop() {
  document.getElementById("terminal").style.display = "none";
  document.getElementById("ghost").style.display = "none";
  document.getElementById("desktop").style.display = "block";
}

// --- CRT Mouse Reactive Effect ---
let glowTimeout;
document.addEventListener("mousemove", (e) => {
  const { innerWidth, innerHeight } = window;
  const x = e.clientX / innerWidth - 0.5;
  const y = e.clientY / innerHeight - 0.5;
  const maxTilt = 3;
  const rotateX = y * maxTilt * -1;
  const rotateY = x * maxTilt;

  terminal.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  terminal.classList.add("glow");
  clearTimeout(glowTimeout);
  glowTimeout = setTimeout(() => {
    terminal.classList.remove("glow");
  }, 100);
});

window.onload = typeCharacter;

// === Easier File Handling Starts Here ===

const fileIcons = {
  text: "Images/Text File.ico",
  image: "Images/jpg.ico",
  gif: "Images/gif-png.ico",
};

const folderContents = {
  ThylacinusCynocephalus: [
    {
      name: "species_info.txt",
      type: "text",
      content:
        "Scientific Name: Thylacinus cynocephalus (Tasmanian Tiger)\n\nExtinction: Declared extinct in 1936\n\nReason for Extinction:\n- Intensive hunting encouraged by bounties\n- Habitat destruction from human settlement\n- Competition with introduced wild dogs\n- Disease possibly played a role\n\nEvolutionary History:\n- Last surviving member of Thylacinidae family\n- Evolved around 4 million years ago\n- Example of convergent evolution with canids\n\nAdaptations:\n- Marsupial pouch (both genders)\n- Powerful jaws could open to 120 degrees\n- Striped back for camouflage\n- Stiff tail like kangaroo for balance\n\nHabitat: Tasmania, forests and grasslands\n\nWhy Care?:\n- Unique example of marsupial carnivore\n- Important case study in human-caused extinction\n- Lost genetic diversity forever",
    },
    {
      name: "ThylacinusCynocephalus.jpg",
      type: "image",
    },
    {
      name: "comparison.txt",
      type: "text",
      content:
        "Comparison with Sun Bear (Helarctos malayanus):\n\nHomologous Structures:\n- Both have similar basic mammalian limb structure\n- Similar vertebral column organization\n\nAnalogous Structures:\n- Thylacine's carnivorous teeth vs. Sun Bear's omnivorous teeth\n- Thylacine's pouch vs. Sun Bear's lack of pouch\n\nVestigial Structures:\n- Thylacine had primitive reproductive system\n- Sun Bear has small tail remnants\n\nEvolutionary Lessons:\n- Thylacine failed to adapt to human pressures\n- Sun Bear survives through behavioral flexibility\n- Importance of habitat preservation",
    },
  ],
  HelarctosMalayanus: [
    {
      name: "species_info.txt",
      type: "text",
      content:
        "Scientific Name: Helarctos malayanus (Sun Bear)\n\nConservation Status: Vulnerable\n\nThreats:\n- Habitat loss from deforestation\n- Poaching for body parts\n- Pet trade\n\nEvolutionary History:\n- Smallest member of bear family Ursidae\n- Adapted to tropical rainforest life\n\nAdaptations:\n- Long tongue for extracting honey\n- Powerful claws for climbing\n- Loose skin protects from predator bites\n- Short black fur with sun-like chest mark\n\nHabitat: Southeast Asian tropical forests\n\nWhy Care?:\n- Keystone species for forest health\n- Important seed disperser\n- Indicator of forest ecosystem health\n\nConservation Efforts:\n- Protected areas establishment\n- Anti-poaching patrols\n- Rehabilitation programs",
    },
    {
      name: "photo.jpg",
      type: "image",
    },
    {
      name: "adaptations.txt",
      type: "text",
      content:
        "Key Adaptations Helping Survival:\n\n1. Arboreal Lifestyle:\n- Allows escape from ground predators\n- Access to food sources other bears can't reach\n\n2. Omnivorous Diet:\n- Can eat over 100 plant species\n- Insects provide reliable protein source\n\n3. Small Size:\n- Requires less food than larger bears\n- Better heat regulation in tropics\n\n4. Behavioral Flexibility:\n- Nocturnal to avoid humans\n- Can adapt to some habitat disturbance\n\nComparison to Thylacine:\n- Sun Bear's flexibility contrasts with Thylacine's specialization\n- Shows importance of generalist traits in changing environments",
    },
  ],
  OtherStuff: [
    {
      name: "readme.txt",
      type: "text",
      content:
        "Welcome to the OtherStuff folder.\n\nThis project compares:\n1. Thylacinus cynocephalus (extinct)\n2. Helarctos malayanus (endangered)\n\nKey Points Covered:\n- Evolutionary histories\n- Adaptations and structures\n- Conservation importance\n- Human impacts\n\nProject fulfills all requirements:\n- Includes extinct and endangered species\n- Covers evolutionary history\n- Compares adaptations\n- Discusses conservation\n",
    },
    {
      name: "references.txt",
      type: "text",
      content:
        "References:\n\n1. IUCN Red List - Helarctos malayanus\n2. Australian Museum - Thylacine Research\n3. National Geographic - Species Profiles\n4. WWF Conservation Reports\n5. Evolutionary Biology Journals\n",
    },
  ],
};

const desktop = document.getElementById("desktop");
const openWindows = {};
let currentZ = 100;

desktop.addEventListener("mousedown", (e) => {
  const target = e.target.closest(".folder");
  if (target) {
    openWindow(target.dataset.folder, e.clientX, e.clientY);
  }

  const win = e.target.closest(".window");
  if (win) {
    win.style.zIndex = getNextZIndex();
  }
});

function getNextZIndex() {
  return ++currentZ;
}

function openWindow(folderName, x, y) {
  if (openWindows[folderName]) {
    return;
  }

  const win = document.createElement("div");
  win.classList.add("window");
  win.style.left = x + "px";
  win.style.top = y + "px";

  const files = folderContents[folderName] || [];

  let filesHTML = "";
  files.forEach((file) => {
    const iconSrc = fileIcons[file.type] || fileIcons["text"];
    filesHTML += `<div class="file" data-file="${file.name}" data-type="${file.type}">
         <img src="${iconSrc}" alt="${file.type} icon">
         <div>${file.name}</div>
       </div>`;
  });

  win.innerHTML = `<div class="title-bar">
       <span>${folderName}</span>
       <button>X</button>
     </div>
     <div class="window-content">
      ${filesHTML}
     </div>`;

  desktop.appendChild(win);
  openWindows[folderName] = win;

  const closeBtn = win.querySelector("button");
  closeBtn.onclick = () => {
    win.remove();
    delete openWindows[folderName];
  };

  dragElement(win, win.querySelector(".title-bar"));
  win.style.zIndex = getNextZIndex();

  const fileIconsElems = win.querySelectorAll(".file");
  fileIconsElems.forEach((fileIcon) => {
    fileIcon.addEventListener("click", (e) => {
      const fileName = e.target.closest(".file").dataset.file;
      const fileType = e.target.closest(".file").dataset.type;
      openFile(fileName, fileType);
    });
  });
}

function dragElement(element, titleBar) {
  let offsetX = 0,
    offsetY = 0,
    mouseX = 0,
    mouseY = 0;

  titleBar.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    offsetX = mouseX - e.clientX;
    offsetY = mouseY - e.clientY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    element.style.top = element.offsetTop - offsetY + "px";
    element.style.left = element.offsetLeft - offsetX + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function openFile(fileName, fileType) {
  const fileWindow = document.createElement("div");
  fileWindow.classList.add("window");
  fileWindow.style.left = "100px";
  fileWindow.style.top = "100px";

  let fileObj;
  for (const folder in folderContents) {
    fileObj = folderContents[folder].find((f) => f.name === fileName);
    if (fileObj) break;
  }

  let contentHTML = "";
  if (fileType === "text") {
    const fileContent = fileObj?.content || "(Empty file)";
    contentHTML = `<pre>${fileContent}</pre>`;
  } else if (fileType === "image" || fileType === "gif") {
    contentHTML = `<img src="Images/${fileName}" alt="${fileType}" style="max-width:100%;">`;
  }

  fileWindow.innerHTML = `<div class="title-bar">
       <span>${fileName}</span>
       <button>X</button>
     </div>
     <div class="window-content">
      ${contentHTML}
     </div>`;

  desktop.appendChild(fileWindow);
  const closeBtn = fileWindow.querySelector("button");
  closeBtn.onclick = () => {
    fileWindow.remove();
  };

  dragElement(fileWindow, fileWindow.querySelector(".title-bar"));
}

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    showDesktop();
  }
});
