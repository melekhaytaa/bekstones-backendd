document.getElementById("adminLoginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = this.username.value.trim();
  const password = this.password.value;

  try {
    const response = await fetch("http://localhost:3001/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Giriş başarılı!");
      window.location.href = "admin-panel.html"; // Giriş sonrası yönlendirme
    } else {
      alert(data.error || "Giriş başarısız.");
    }
  } catch (error) {
    console.error("Giriş hatası:", error);
    alert("Sunucuya ulaşılamıyor.");
  }
});
