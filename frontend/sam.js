async function updateServiceStatus() {
    const url = "https://huggingface.co/api/spaces/Maxxxxior/MaxChatbotBackend/runtime";
    const statusEl = document.querySelector(".status");
    const iconEl = document.querySelector(".serviceStatus.maxChatbotBackend");
    const countdownEl = document.querySelector(".countdown");

    try {
        const res = await fetch(url);
        const data = await res.json();

        const stage = data.stage;
        const gcTimeout = data.gcTimeout;

        const colors = {
            "RUNNING": "var(--service-running)",
            "SLEEPING": "var(--service-sleeping)",
            "RUNTIME_ERROR": "var(--service-runtime-error)",
            "PAUSED": "var(--service-paused)",
            "BUILD_ERROR": "var(--service-build-error)",
            "CONFIG_ERROR": "var(--service-config-error)",
            "BUILDING": "var(--service-building)",
            "APP_STARTING": "var(--service-app-starting)",
            "RUNNING_APP_STARTING": "var(--service-running-app-starting)"
        };

        statusEl.textContent = stage;
        iconEl.style.color = colors[stage] || "#000";

        if (stage === "RUNNING" && gcTimeout) {
            let remaining = gcTimeout;

            function tick() {
                const hours = Math.floor(remaining / 3600);
                const minutes = Math.floor((remaining % 3600) / 60);
                const seconds = remaining % 60;
                countdownEl.textContent = `${hours}h ${minutes}m ${seconds}s`;

                if (remaining > 0) {
                    remaining--;
                    setTimeout(tick, 1000);
                } else {
                    countdownEl.textContent = "Sleeping soon...";
                }
            }

            tick();
        } else {
            countdownEl.textContent = "";
        }
    } catch (err) {
        statusEl.textContent = "ERROR";
        iconEl.style.color = "var(--runtime-error)";
        countdownEl.textContent = "";
    }
}

updateServiceStatus();
setInterval(updateServiceStatus, 60000);