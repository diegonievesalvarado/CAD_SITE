document.getElementById("year").textContent = new Date().getFullYear();

const grid = document.getElementById("projectsGrid");
const projects = window.PROJECTS || [];

// Modal elements
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const modalCaption = document.getElementById("modalCaption");

function openModal(src, caption = "") {
  if (!modal || !modalImg) return;

  modalImg.src = src;
  if (modalCaption) modalCaption.textContent = caption;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  if (!modal || !modalImg) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalImg.src = "";
  if (modalCaption) modalCaption.textContent = "";
}

// Close modal on backdrop or X
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-close]")) closeModal();
});

// Close modal with Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

function render() {
  if (!grid) return;
  grid.innerHTML = "";

  projects.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card";

    // Cover button (opens cover image)
    const coverBtn = document.createElement("button");
    coverBtn.className = "card-cover";
    coverBtn.type = "button";

    const img = document.createElement("img");
    img.src = p.cover;
    img.alt = p.title || "Project cover";
    coverBtn.appendChild(img);

    coverBtn.addEventListener("click", () => {
      openModal(p.cover, p.title || "");
    });

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = p.title || "";

    const sub = document.createElement("div");
    sub.className = "card-sub";
    sub.textContent = p.subtitle || "";

    const desc = document.createElement("div");
    desc.className = "card-desc";
    desc.textContent = p.description || "";

    const tags = document.createElement("div");
    tags.className = "tags";
    (p.tools || []).forEach((t) => {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = t;
      tags.appendChild(tag);
    });

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const previewBtn = document.createElement("button");
    previewBtn.className = "link";
    previewBtn.type = "button";
    previewBtn.textContent = "Preview →";
    previewBtn.addEventListener("click", () => {
      openModal(p.cover, p.title || "");
    });

    const pdfLink = document.createElement("a");
    pdfLink.className = "link";
    pdfLink.href = p.pdf || "#";
    pdfLink.target = "_blank";
    pdfLink.rel = "noopener";
    pdfLink.textContent = "PDF";

    actions.appendChild(previewBtn);
    actions.appendChild(pdfLink);

    body.appendChild(title);
    body.appendChild(sub);
    body.appendChild(desc);
    body.appendChild(tags);
    body.appendChild(actions);

    card.appendChild(coverBtn);
    card.appendChild(body);

    grid.appendChild(card);
  });
}

render();

