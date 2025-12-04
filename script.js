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

    } catch {
        document.getElementById("version").textContent = "Error cargando versión";
    }
}

loadRelease();
