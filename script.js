const svg = document.getElementById("canvas");
const colorPicker = document.getElementById("colorPicker");

let drawing = false;
let currentPath = null;
let paths = [];

// Get mouse position relative to SVG
function getMousePosition(event) {
    const rect = svg.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

// Mouse Down → Start Drawing
svg.addEventListener("mousedown", (e) => {
    drawing = true;
    const { x, y } = getMousePosition(e);

    currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    currentPath.setAttribute("d", `M ${x} ${y}`);
    currentPath.setAttribute("stroke", colorPicker.value);
    currentPath.setAttribute("stroke-width", 2);
    currentPath.setAttribute("fill", "none");

    svg.appendChild(currentPath);
    paths.push(currentPath);
});

// Mouse Move → Draw Path
svg.addEventListener("mousemove", (e) => {
    if (!drawing) return;

    const { x, y } = getMousePosition(e);
    let d = currentPath.getAttribute("d");
    currentPath.setAttribute("d", `${d} L ${x} ${y}`);
});

// Mouse Up → Stop Drawing
svg.addEventListener("mouseup", () => {
    drawing = false;
});

// Undo Last Drawing
function undo() {
    if (paths.length > 0) {
        const lastPath = paths.pop();
        svg.removeChild(lastPath);
    }
}
