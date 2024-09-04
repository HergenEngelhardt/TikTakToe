// Das Array zur Speicherung des aktuellen Zustands
let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];
function init(){
    render()
}
// Variable, um den aktuellen Spieler zu verfolgen ('circle' oder 'cross')
let currentPlayer = 'circle';

// Funktion zur Erstellung des SVG-Kreises mit Animation
function createCircleSVG() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "70"); svg.setAttribute("height", "70");
    svg.setAttribute("viewBox", "0 0 70 70");

    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", "35"); circle.setAttribute("cy", "35");
    circle.setAttribute("r", "30"); circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", "#00B0EF");
    circle.setAttribute("stroke-width", "5");
    circle.setAttribute("stroke-dasharray", "188.4");
    circle.setAttribute("stroke-dashoffset", "188.4");

    const animate = document.createElementNS(svgNS, "animate");
    animate.setAttribute("attributeName", "stroke-dashoffset");
    animate.setAttribute("from", "188.4"); animate.setAttribute("to", "0");
    animate.setAttribute("dur", "2s"); animate.setAttribute("fill", "freeze");

    circle.appendChild(animate); svg.appendChild(circle);
    return svg;
}

// Funktion zur Erstellung des SVG-Kreuzes mit Animation
function createCrossSVG() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "70"); svg.setAttribute("height", "70");
    svg.setAttribute("viewBox", "0 0 70 70");

    const line1 = document.createElementNS(svgNS, "line");
    line1.setAttribute("x1", "15"); line1.setAttribute("y1", "15");
    line1.setAttribute("x2", "55"); line1.setAttribute("y2", "55");
    line1.setAttribute("stroke", "#FF0000");
    line1.setAttribute("stroke-width", "5"); line1.setAttribute("stroke-linecap", "round");

    const line2 = document.createElementNS(svgNS, "line");
    line2.setAttribute("x1", "55"); line2.setAttribute("y1", "15");
    line2.setAttribute("x2", "15"); line2.setAttribute("y2", "55");
    line2.setAttribute("stroke", "#FF0000");
    line2.setAttribute("stroke-width", "5"); line2.setAttribute("stroke-linecap", "round");

    const animateLine = (line, attr) => {
        const animate = document.createElementNS(svgNS, "animate");
        animate.setAttribute("attributeName", attr);
        animate.setAttribute("from", line.getAttribute(attr === "x2" ? "x1" : "y1"));
        animate.setAttribute("to", line.getAttribute(attr === "x2" ? "x2" : "y2"));
        animate.setAttribute("dur", "0.5s"); animate.setAttribute("fill", "freeze");
        line.appendChild(animate);
    };

    animateLine(line1, "x2"); animateLine(line1, "y2");
    animateLine(line2, "x2"); animateLine(line2, "y2");

    svg.appendChild(line1); svg.appendChild(line2);
    return svg;
}

// Funktion zur Anzeige des Tic-Tac-Toe-Spiels
function render() {
    const content = document.getElementById('content');
    content.innerHTML = "";
    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(3,100px);grid-template-rows:repeat(3,100px);gap:0px;';
    content.appendChild(grid);

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';

        // Füge SVG je nach Inhalt des Feldes hinzu
        if (fields[i] === 'cross') cell.appendChild(createCrossSVG());
        else if (fields[i] === 'circle') cell.appendChild(createCircleSVG());

        // Füge einen Klick-Event-Listener hinzu, um abwechselnd SVGs zu setzen
        cell.addEventListener('click', function() {
            if (!fields[i]) { // Nur setzen, wenn das Feld leer ist
                fields[i] = currentPlayer; // Setze das aktuelle Symbol
                currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; // Wechsel den Spieler
                render(); // Aktualisiere das Spielfeld
            }
        });

        grid.appendChild(cell);
    }
}
