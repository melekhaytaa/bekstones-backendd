// ✅ Sayfalar arası geçiş
function showSection(sectionId) {
  document.querySelectorAll("main section").forEach(sec => sec.style.display = "none");
  document.getElementById(sectionId).style.display = "block";
}

// Menü olayları
document.getElementById("dashboardTab").addEventListener("click", () => showSection("dashboard"));

document.getElementById("subscribersTab").addEventListener("click", async () => {
  showSection("subscribers");
  await fetchSubscribers();
});

document.getElementById("messagesTab").addEventListener("click", async () => {
  showSection("messages");
  await fetchMessages();
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  window.location.href = "admin-login.html";
});

// ✅ Aboneleri çek ve göster
async function fetchSubscribers() {
  try {
    const res = await fetch("/api/subscribe");
    const data = await res.json();

    const list = document.getElementById("subscribersList");
    list.innerHTML = "";

    if (!data || data.length === 0) {
      list.innerHTML = "<p>Hiç abone bulunamadı.</p>";
      return;
    }

    data.forEach((sub, index) => {
      list.innerHTML += `
        <div class="card">
          <div class="card-title">${index + 1}. ${sub.name || "İsimsiz"} - ${sub.email}</div>
          <div class="card-meta">${new Date(sub.created_at).toLocaleString()}</div>
        </div>
      `;
    });
  } catch (error) {
    console.error("Abone verileri alınamadı:", error);
  }
}

// ✅ Mesajları çek ve göster
async function fetchMessages() {
  try {
    const res = await fetch("/api/messages");
    const data = await res.json();

    const list = document.getElementById("messagesList");
    list.innerHTML = "";

    if (!data || data.length === 0) {
      list.innerHTML = "<p>Hiç mesaj bulunamadı.</p>";
      return;
    }

    data.forEach((msg, index) => {
      list.innerHTML += `
        <div class="card" onclick="toggleMessage(${msg.id})" id="card-${msg.id}">
          <div class="card-title">${index + 1}. ${msg.name} - ${msg.email}</div>
          <div class="card-meta">${new Date(msg.created_at).toLocaleString()}</div>
          <div class="card-meta">📞 ${msg.phone || "Numara yok"}</div>
          <div id="msg-content-${msg.id}" style="display:none; margin-top:10px;">
            <p>${msg.message}</p>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error("Mesaj verileri alınamadı:", error);
  }
}

// ✅ Tıklanınca mesaj içeriğini aç/kapat
function toggleMessage(id) {
  const el = document.getElementById(`msg-content-${id}`);
  el.style.display = el.style.display === "none" ? "block" : "none";

  const card = document.getElementById(`card-${id}`);
  card.classList.toggle("open");
}

// ✅ CSV İndirme Butonu (Aboneler sekmesi içindeki buton)
document.addEventListener("DOMContentLoaded", () => {
  const csvBtn = document.getElementById("downloadCSV");
  if (csvBtn) {
    csvBtn.addEventListener("click", () => {
      const link = document.createElement("a");
      link.href = "http://localhost:3001/api/subscribe/export"; // ✅ DOĞRU URL
      link.download = "aboneler.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
});
