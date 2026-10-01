document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll(".page");
    let currentPageIndex = 0;

    function showPage(index) {
        pages.forEach((page, idx) => {
            if (idx === index) {
                page.classList.add("active-page");
            } else {
                page.classList.remove("active-page");
            }
        });

        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    }

    document.querySelectorAll(".next-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (currentPageIndex < pages.length - 1) {
                currentPageIndex++;
                showPage(currentPageIndex);
            }
        });
    });

    document.querySelectorAll(".prev-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (currentPageIndex > 0) {
                currentPageIndex--;
                showPage(currentPageIndex);
            }
        });
    });

    document.querySelectorAll(".tts-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const activePage = e.currentTarget.closest(".page");
            const paragraph = activePage.querySelector("p");

            if (!paragraph) return;

            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                return;
            }

            const utterance = new SpeechSynthesisUtterance(paragraph.innerText);
            utterance.rate = 0.95;
            window.speechSynthesis.speak(utterance);
        });
    });
});