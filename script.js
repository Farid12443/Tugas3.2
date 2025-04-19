// ===== Constata Terbus =====
// Form Layanan
const daftarButtons = document.querySelectorAll(".daftarBtn");
const inputLayananTerpilih = document.getElementById("layananTerpilih");
const inputLayananDisplay = document.getElementById("layananDisplay");
const formDaftar = document.getElementById("formDaftar");
const modalDaftar = document.getElementById("modalDaftar");
const modalPasporEl = document.getElementById("modalPaspor");

// Elemen paspor
const pasporNama = document.getElementById("pasporNama");
const pasporKontak = document.getElementById("pasporKontak");
const pasporLayanan = document.getElementById("pasporLayanan");
const pasporTiket = document.getElementById("pasporTiket");
const qrCodeImg = document.getElementById("qrCode");

// Artikel
const daftarArtikel = document.getElementById("daftar-artikel");
const artikelLengkapEls = document.querySelectorAll(".artikel-lengkap");

// Form Layanan
let layananSekarang = "";

daftarButtons.forEach(button => {
    button.addEventListener("click", () => {
        layananSekarang = button.getAttribute("data-layanan");
        inputLayananTerpilih.value = layananSekarang;
        inputLayananDisplay.value = layananSekarang;
    });
});

formDaftar.addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const kontak = document.getElementById("kontak").value;
    const layanan = inputLayananTerpilih.value;
    const kode = layanan.slice(0, 3).toUpperCase();
    const tiket = `${kode}-${Math.floor(Math.random() * 900000 + 100000)}`;

    tampilkanTiket(nama, kontak, layanan, tiket);

    // Tutup form modal
    bootstrap.Modal.getInstance(modalDaftar).hide();

    // Tampilkan paspor modal
    new bootstrap.Modal(modalPasporEl).show();

    formDaftar.reset();
});

function tampilkanTiket(nama, kontak, layanan, tiket) {
    pasporNama.textContent = nama;
    pasporKontak.textContent = kontak;
    pasporLayanan.textContent = layanan;
    pasporTiket.textContent = tiket;

    const url = `https://ridzz-medika.id/Antrian/${tiket}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        url
    )}&size=200x200`;
    qrCodeImg.src = qrUrl;
}

// Artikel
function tampilkanArtikel(id) {
    daftarArtikel.style.display = "none";
    artikelLengkapEls.forEach(el => (el.style.display = "none"));
    document.getElementById(id).style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function kembali() {
    artikelLengkapEls.forEach(el => (el.style.display = "none"));
    daftarArtikel.style.display = "block";
}

