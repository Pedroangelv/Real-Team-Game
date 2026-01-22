const apiURL = `https://api.github.com/repos/Pedroangelv/RT_GAME/releases/latest`;

async function loadRelease() {
    try {
        const response = await fetch(apiURL);
        const release = await response.json();

        document.getElementById("version").textContent = release.tag_name;

        const linux = release.assets.find(a => a.name.toLowerCase().includes(".x86_64"));
        const win = release.assets.find(a => a.name.toLowerCase().includes(".exe"));
        const apk = release.assets.find(a => a.name.toLowerCase().includes(".apk"));

        document.getElementById("linuxBtn").href = linux?.browser_download_url ?? "#";
        document.getElementById("windowsBtn").href = win?.browser_download_url ?? "#";
        document.getElementById("androidBtn").href = apk?.browser_download_url ?? "#";
        const raw = release.body;

        let html = "";

        // Full Changelog
        const changelogMatch = raw.match(/\*\*Full Changelog\*\*:\s*(.+)/);
        if (changelogMatch) {
            html += `
                <p class="changelog">
                    🔗 <a href="${changelogMatch[1]}" target="_blank">Full Changelog</a>
                </p>
            `;
        }

        // Cambios
        const changesMatch = raw.match(/\*\*CAMBIOS\*\*([\s\S]*)/);
        if (changesMatch) {
            const changes = changesMatch[1]
                .trim()
                .split("\n")
                .filter(l => l.trim() !== "")
                .map(l => `<li>${l}</li>`)
                .join("");

            html += `
                <h3>🛠️ Cambios</h3>
                <ul>${changes}</ul>
            `;
        }

        document.querySelector(".releaseNote").innerHTML = `
            <h2>📦 Release Notes</h2>
            ${html}
        `;

    } catch {
        document.getElementById("version").textContent = "Error cargando versión";
    }
}

loadRelease();
