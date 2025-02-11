let noClicks = 1;
const maxNoClicks = 4;
const minNoScale = 0.65;
let noScale = 1;
let yesScale = 1; // Esto ahora rastrea directamente el factor de escala.
const gifElement = document.getElementById("togepi-gif");
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const buttonContainer = document.querySelector(".btn-container");
const yesButtonStyle = window.getComputedStyle(yesButton);
const maxYesWidth = parseFloat(yesButtonStyle.maxWidth);

// matriz de gifs - en orden
const gifs = ["assets/images/togepi-happy.gif", "assets/images/togepi-sad-1.gif", "assets/images/togepi-sad-2.gif", "assets/images/togepi-crying.gif"];
// matriz de mensajes
const buttonMessages = ["Are you sure??", "Pookie please", "Pookie PLEASE", "You can't do this to me!xd"];

// No se hizo clic en ningún botón
noButton.addEventListener("click", () => {
    if (noClicks < maxNoClicks) {
        // cambiar imagen
        gifElement.src = gifs[noClicks];
    }

    // No cambiar el texto del botón
    noButton.textContent = buttonMessages[noClicks % maxNoClicks];

    // Ajustar el ancho del botón para que se ajuste al texto
    noButton.style.width = 'auto';
    noButton.style.width = `${noButton.scrollWidth}px`;

    // Disminuir el tamaño del botón no
    if (noScale > minNoScale) {
        noScale -= 0.1;
        noButton.style.transform = `scale(${noScale})`;
    }

    // Calcular el ancho escalado del botón yes
    const baseWidth = parseFloat(yesButtonStyle.width);
    const scaledWidth = baseWidth * yesScale; // Refleja la visual real size of the button

    console.log(`Scaled Width: ${scaledWidth}, Max Width: ${maxYesWidth}`);

    // Comprueba si el ancho escalado es menor que el ancho máximo
    if (scaledWidth < maxYesWidth) {
        yesScale += 0.5; // Incrementar la escala en un paso más pequeño
        yesButton.style.transform = `scale(${yesScale})`;

        // Obtener el factor de escala de espacio actual desde CSS
        const rootStyles = getComputedStyle(document.documentElement);
        const gapScaleFactor = parseFloat(rootStyles.getPropertyValue("--gap-scale-factor")) || 250;

        // Ajuste el espacio dinámicamente
        const currentGap = parseFloat(buttonContainer.style.gap) || 20;
        const newGap = Math.sqrt(currentGap * gapScaleFactor); // Scale based on the factor
        buttonContainer.style.gap = `${newGap}px`;
    }

    // Incrementar el número de clics
    noClicks++;
});
