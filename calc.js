// Factor and exponent data for different inputs
const fractionationData = [
    { id: 24, factor: 4.6519, exponent: 0.8431, label: 'V12Gy' }, // For Volume
    { id: 20, factor: 3.4249, exponent: 0.8672, label: 'V12Gy' },
    { id: 18, factor: 2.8572, exponent: 0.8825, label: 'V12Gy' },
    { id: 27, factor: 2.4552, exponent: 0.8960, label: 'V19.6Gy' },
    { id: 16, factor: 2.3112, exponent: 0.9016, label: 'V12Gy' },
    { id: 15, factor: 2.0394, exponent: 0.9137, label: 'V12Gy' },
    { id: 30, factor: 1.9720, exponent: 0.9170, label: 'V24.4Gy' }
];

// Data for Surface Area
const surfaceAreaData = [
    { id: 24, factor: 0.6968, exponent: 1.1226, label: 'V12Gy' }, // Surface Area Fit Results for DosePercent_50
    { id: 20, factor: 0.4926, exponent: 1.1507, label: 'V12Gy' },
    { id: 18, factor: 0.4041, exponent: 1.1659, label: 'V12Gy' },
    { id: 27, factor: 0.3435, exponent: 1.1782, label: 'V19.6Gy' },
    { id: 16, factor: 0.3222, exponent: 1.1831, label: 'V12Gy' },
    { id: 15, factor: 0.2828, exponent: 1.1929, label: 'V12Gy' },
    { id: 30, factor: 0.2732, exponent: 1.1954, label: 'V24.4Gy' }
];

// Data for Largest Axial Dimension
const ladData = [
    { id: 24, factor: 2.5532, exponent: 1.9058, label: 'V12Gy' }, // LAD Fit Results for DosePercent_50
    { id: 20, factor: 1.8997, exponent: 1.9413, label: 'V12Gy' },
    { id: 18, factor: 1.6056, exponent: 1.9588, label: 'V12Gy' },
    { id: 27, factor: 1.4000, exponent: 1.9721, label: 'V19.6Gy' },
    { id: 16, factor: 1.3270, exponent: 1.9770, label: 'V12Gy' },
    { id: 15, factor: 1.1906, exponent: 1.9861, label: 'V12Gy' },
    { id: 30, factor: 1.1571, exponent: 1.9883, label: 'V24.4Gy' }
];

// Data for Equivalent Diameter
const eqDiameterData = [
    { id: 24, factor: 2.6961, exponent: 2.5292, label: 'V12Gy' }, // Equivalent Diameter Fit Results for DosePercent_50
    { id: 20, factor: 1.9541, exponent: 2.6017, label: 'V12Gy' },
    { id: 18, factor: 1.6142, exponent: 2.6474, label: 'V12Gy' },
    { id: 27, factor: 1.3750, exponent: 2.6880, label: 'V19.6Gy' },
    { id: 16, factor: 1.2897, exponent: 2.7049, label: 'V12Gy' },
    { id: 15, factor: 1.1292, exponent: 2.7410, label: 'V12Gy' },
    { id: 30, factor: 1.0895, exponent: 2.7511, label: 'V24.4Gy' }
];

// Function to calculate IDV
function calculateIDV(value, factor, exponent) {
    return factor * Math.pow(value, exponent);
}

// Function to clear other input fields
function clearInputs(except) {
    const inputs = ['volume', 'surfaceArea', 'lad', 'eq-diameter'];
    inputs.forEach(input => {
        if (input !== except) {
            document.getElementById(input).value = '';
        }
    });
}

// Function to update calculations for Target Volume
function updateCalculations() {
    const TV = parseFloat(document.getElementById('volume').value);
    clearInputs('volume'); // Clear all except volume

    if (isNaN(TV) || TV <= 0) {
        clearTable();
        return;
    }

    fractionationData.forEach(({ id, factor, exponent, label }) => {
        const IDV = calculateIDV(TV, factor, exponent).toFixed(2);
        updateTable(id, IDV, label);
    });
}

// Function to update calculations for Surface Area
function updateSurfaceAreaCalculations() {
    const SA = parseFloat(document.getElementById('surfaceArea').value);
    clearInputs('surfaceArea'); // Clear all except surface area

    if (isNaN(SA) || SA <= 0) {
        clearTable();
        return;
    }

    surfaceAreaData.forEach(({ id, factor, exponent, label }) => {
        const IDV = calculateIDV(SA, factor, exponent).toFixed(2);
        updateTable(id, IDV, label);
    });
}

// Function to update calculations for Largest Axial Dimension
function updateLADCalculations() {
    const LAD = parseFloat(document.getElementById('lad').value);
    clearInputs('lad'); // Clear all except LAD

    if (isNaN(LAD) || LAD <= 0) {
        clearTable();
        return;
    }

    ladData.forEach(({ id, factor, exponent, label }) => {
        const IDV = calculateIDV(LAD, factor, exponent).toFixed(2);
        updateTable(id, IDV, label);
    });
}

// Function to update calculations for Equivalent Diameter
function updateEqDiameterCalculations() {
    const EQD = parseFloat(document.getElementById('eq-diameter').value);
    clearInputs('eq-diameter'); // Clear all except equivalent diameter

    if (isNaN(EQD) || EQD <= 0) {
        clearTable();
        return;
    }

    eqDiameterData.forEach(({ id, factor, exponent, label }) => {
        const IDV = calculateIDV(EQD, factor, exponent).toFixed(2);
        updateTable(id, IDV, label);
    });
}

// Function to update the table with calculated values
function updateTable(id, IDV, label) {
    let colorClass = '';

    if (IDV > 20) {
        colorClass = 'dark-red';
    } else if (IDV > 10) {
        colorClass = 'orange-red';
    } else if (IDV > 5) {
        colorClass = 'yellow-orange';
    } else {
        colorClass = 'green';
    }

    document.getElementById(`prediction-${id}`).innerHTML = `<span class="circle ${colorClass}"></span>`;
    document.getElementById(`detail-${id}`).textContent = `Predicted ${label} is ${IDV} cc`;
}

// Function to clear the table if the inputs are invalid
function clearTable() {
    fractionationData.forEach(({ id }) => {
        document.getElementById(`detail-${id}`).textContent = 'Predicted IDV is 0 cc';
        document.getElementById(`prediction-${id}`).innerHTML = '';
    });
}

