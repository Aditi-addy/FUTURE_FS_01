
var typed = new Typed(".text", {
    strings: ["Student", "Coder", "Developer", "Classical Dancer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent page reload

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            fetch("http://localhost:5000/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, message })
            })
            .then(response => {
                if (response.ok) {
                    alert("✅ Message sent successfully!");
                    form.reset();
                } else {
                    alert("❌ Failed to send message.");
                }
            })
            .catch(error => {
                console.error("Fetch error:", error);
                alert("❌ Something went wrong.");
            });
        });
    }
});
