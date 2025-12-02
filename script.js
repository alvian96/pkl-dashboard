/* ==============================================
   ASDP PKL Dashboard v2.0
   script.js
   ============================================== */

// =========================
// Menu Toggle (Dashboard)
// =========================
function showForm(type) {
  document.getElementById("main-menu").classList.add("hidden");
  if (type === "baru") {
    document.getElementById("form-baru").classList.remove("hidden");
  } else if (type === "addendum") {
    document.getElementById("form-addendum").classList.remove("hidden");
  }
}

function backToMenu() {
  document.getElementById("form-baru").classList.add("hidden");
  document.getElementById("form-addendum").classList.add("hidden");
  document.getElementById("main-menu").classList.remove("hidden");
}

// =========================
// Dropdown Data
// =========================
const regionalData = {
  "Regional I": ["Banda Aceh", "Bangka", "Batam", "Padang", "Danau Toba", "Singkil"],
  "Regional II": ["Bajoe", "Bakauheni", "Balikpapan", "Batulicin", "Merak", "Pontianak"],
  "Regional III": ["Baubau", "Kayangan", "Ketapang", "Kupang", "Lembar", "Sape", "Selayar", "Surabaya"],
  "Regional IV": ["Ambon", "Biak", "Bitung", "Luwuk", "Merauke", "Sorong", "Ternate"]
};

const jabatanData = {
  "Deck": ["Nakhoda", "Mualim I", "Mualim II", "Mualim III", "Mualim IV", "Serang", "Juru Mudi", "Kelasi", "Juru Masak"],
  "Engine": ["KKM/Masinis I", "Masinis II", "Masinis III", "Masinis IV", "Mandor Mesin", "Juru Minyak"]
};

// =========================
// Dynamic Dropdown Binding
// =========================
function bindDropdowns(regionalId, cabangId, departemenId, jabatanId) {
  const regionalSelect = document.getElementById(regionalId);
  const cabangSelect = document.getElementById(cabangId);
  const departemenSelect = document.getElementById(departemenId);
  const jabatanSelect = document.getElementById(jabatanId);

  regionalSelect.addEventListener("change", () => {
    const regional = regionalSelect.value;
    cabangSelect.innerHTML = '<option value="">-- Pilih Cabang --</option>';
    if (regionalData[regional]) {
      regionalData[regional].forEach(cabang => {
        const opt = document.createElement("option");
        opt.value = cabang;
        opt.textContent = cabang;
        cabangSelect.appendChild(opt);
      });
    }
  });

  departemenSelect.addEventListener("change", () => {
    const dept = departemenSelect.value;
    jabatanSelect.innerHTML = '<option value="">-- Pilih Jabatan --</option>';
    if (jabatanData[dept]) {
      jabatanData[dept].forEach(jabatan => {
        const opt = document.createElement("option");
        opt.value = jabatan;
        opt.textContent = jabatan;
        jabatanSelect.appendChild(opt);
      });
    }
  });
}

// Bind dropdowns for both forms
bindDropdowns("regional-baru", "cabang-baru", "departemen-baru", "jabatan-baru");
bindDropdowns("regional-add", "cabang-add", "departemen-add", "jabatan-add");

// =========================
// Auto Uppercase Inputs
// =========================
document.querySelectorAll("input[type=text]").forEach(input => {
  input.addEventListener("input", () => {
    input.value = input.value.toUpperCase();
  });
});

// =========================
// Submit Handlers
// =========================
const scriptURL = "https://script.google.com/macros/s/AKfycbzf0Q_I_GBFnmzeDdXYOILwDaBqHSrZTT2KrHmzxNQ4V1Rcy5YVEpQTYNVxnc06L2kTag/exec";

// Form Hijau (Perjanjian Baru)
document.getElementById("formPerjanjianBaru").addEventListener("submit", async (e) => {
  e.preventDefault();
  await submitForm(e.target, "Karyawan_Baru");
});

// Form Kuning (Addendum)
document.getElementById("formAddendum").addEventListener("submit", async (e) => {
  e.preventDefault();
  await submitForm(e.target, "Addendum");
});

// =========================
// Submit Function
// =========================
async function submitForm(form, sheetName) {
  const formData = new FormData(form);
  formData.append("sheetName", sheetName);

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("✅ Data berhasil dikirim!");
      form.reset();
      backToMenu();
    } else {
      alert("❌ Gagal mengirim data. Silakan coba lagi.");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("⚠️ Terjadi kesalahan: " + err.message);
  }
}
