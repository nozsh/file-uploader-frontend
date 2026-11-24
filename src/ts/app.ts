import "./login";

const swsw = "/sw.Hd2y8i7kr.js";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(swsw, { scope: "/" })
      .then((registration) => {
        // console.log("Service Worker registered:", registration);
        console.log("Ready to upload files!");
      })
      .catch((error) => {
        // console.error("Service Worker registration error:", error);
        console.log("Not ready to upload files!");
      });

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });
  });
}

const dropzone = document.getElementById("dropzone") as HTMLElement;
const fileInput = document.getElementById("fileInput") as HTMLInputElement;

function uploadWarn() {
  document.getElementById("modal_warn").checked = true;
}

fileInput.addEventListener("change", () => {
  if (fileInput.files && fileInput.files.length > 0) {
    uploadWarn();
  }
});

if (dropzone && fileInput) {
  // Handling event of dragging files over an area
  dropzone.addEventListener("dragover", (event: DragEvent) => {
    event.preventDefault();
    dropzone.classList.add("bg-base-100");
  });

  dropzone.addEventListener("dragleave", (event: DragEvent) => {
    event.preventDefault();
    dropzone.classList.remove("bg-base-100");
  });

  // Handling event of drop files into an area
  dropzone.addEventListener("drop", (event: DragEvent) => {
    event.preventDefault();
    dropzone.classList.remove("bg-base-100");
    if (event.dataTransfer) {
      const files = event.dataTransfer.files;
      fileInput.files = files;
      if (files.length > 0) {
        uploadWarn();
      }
    }
  });
}

if (document.getElementById("login_modal_btn")) {
  const modal_warn = document.getElementById("modal_warn") as HTMLInputElement;
  const modal_login = document.getElementById("modal_login") as HTMLInputElement;

  document.getElementById("login_modal_btn")?.addEventListener("click", () => {
    modal_warn.checked = false;
    modal_login.checked = true;
  });
}

if (document.getElementById("registration_btn")) {
  document.getElementById("registration_btn")?.addEventListener("click", () => {
    document.getElementById("register_message").style.display = "block";

    setTimeout(() => {
      document.getElementById("register_message").style.display = "none";
    }, 5000);
  });
}
