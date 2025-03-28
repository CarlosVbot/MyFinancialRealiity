let currentView = 'mensual';
let mainChart, frequencyChart;
let financialData

function regresar(){
    window.electron.ventanaMain();
}
async function cargarDatos() {
    let Datos = await window.electron.obtenerDatos();

    financialData = Datos;

        document.getElementById('user-name').textContent = financialData.nombre;

        document.querySelectorAll('.view-options .btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelector('.view-options .btn-active').classList.remove('btn-active');
                this.classList.add('btn-active');
                currentView = this.dataset.view;
                updateCharts();
            });
        });

        document.getElementById('chart-type').addEventListener('change', function() {
            updateCharts();
        });

        initializeCharts();
        updateCharts();

}


function convertAmount(amount, frequency) {
    const amountNum = parseFloat(amount);

    if (currentView === 'diario') {
        switch(frequency) {
            case 'diario': return amountNum;
            case 'semanal': return amountNum / 7;
            case 'mensual': return amountNum / 30;
            case 'anual': return amountNum / 365;
            case 'unico': return 0;
            default: return amountNum;
        }
    } else if (currentView === 'semanal') {
        switch(frequency) {
            case 'diario': return amountNum * 7;
            case 'semanal': return amountNum;
            case 'mensual': return amountNum / 4;
            case 'anual': return amountNum / 52;
            case 'unico': return 0;
            default: return amountNum;
        }
    } else if (currentView === 'mensual') {
        switch(frequency) {
            case 'diario': return amountNum * 30;
            case 'semanal': return amountNum * 4;
            case 'mensual': return amountNum;
            case 'anual': return amountNum / 12;
            case 'unico': return amountNum;
            default: return amountNum;
        }
    } else if (currentView === 'anual') {
        switch(frequency) {
            case 'diario': return amountNum * 365;
            case 'semanal': return amountNum * 52;
            case 'mensual': return amountNum * 12;
            case 'anual': return amountNum;
            case 'unico': return amountNum;
            default: return amountNum;
        }
    }

    return amountNum;
}

function initializeCharts() {
    const ctx1 = document.getElementById('mainChart').getContext('2d');
    const ctx2 = document.getElementById('frequencyChart').getContext('2d');

    mainChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Ingresos', 'Gastos'],
            datasets: []
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#f5f6fa',
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                datalabels: {
                    color: '#f5f6fa',
                    font: {
                        weight: 'bold'
                    },
                    formatter: (value) => {
                        return `$${value.toLocaleString()}`;
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#f5f6fa'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#f5f6fa'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });

    frequencyChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Diario', 'Semanal', 'Mensual', 'Anual', 'Único'],
            datasets: []
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#f5f6fa',
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                datalabels: {
                    color: '#f5f6fa',
                    font: {
                        weight: 'bold'
                    },
                    formatter: (value) => {
                        return `$${value.toLocaleString()}`;
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#f5f6fa'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#f5f6fa'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}

function updateCharts() {
    const chartType = document.getElementById('chart-type').value;

    let totalIncome = 0;
    let totalExpense = 0;

    const frequencyIncome = { diario: 0, semanal: 0, mensual: 0, anual: 0, unico: 0 };
    const frequencyExpense = { diario: 0, semanal: 0, mensual: 0, anual: 0, unico: 0 };

    const transactionsBody = document.getElementById('transactions-body');
    transactionsBody.innerHTML = '';

    for (const key in financialData) {
        if (key === 'nombre') continue;

        const transaction = financialData[key];
        const amount = parseFloat(transaction.cantidad);
        const adjustedAmount = convertAmount(amount, transaction.frecuencia);

        if (transaction.tipo === 'ingreso') {
            totalIncome += adjustedAmount;
            frequencyIncome[transaction.frecuencia] += adjustedAmount;
        } else {
            totalExpense += adjustedAmount;
            frequencyExpense[transaction.frecuencia] += adjustedAmount;
        }

        const row = document.createElement('tr');
        row.classList.add(`${transaction.tipo}-row`);
        row.innerHTML = `
            <td>${transaction.descripcion}</td>
            <td>${transaction.tipo === 'ingreso' ? 'Ingreso' : 'Gasto'}</td>
            <td><span class="frequency-badge">${transaction.frecuencia}</span></td>
            <td>$${amount.toLocaleString()}</td>
            <td>$${adjustedAmount.toLocaleString()}</td>
        `;
        transactionsBody.appendChild(row);
    }

    document.getElementById('total-income').textContent = `$${totalIncome.toLocaleString()}`;
    document.getElementById('total-expense').textContent = `$${totalExpense.toLocaleString()}`;
    document.getElementById('net-balance').textContent = `$${(totalIncome - totalExpense).toLocaleString()}`;

    if (mainChart) mainChart.destroy();
    if (frequencyChart) frequencyChart.destroy();

    const ctx1 = document.getElementById('mainChart').getContext('2d');
    const ctx2 = document.getElementById('frequencyChart').getContext('2d');

    mainChart = new Chart(ctx1, {
        type: chartType,
        data: {
            labels: ['Ingresos', 'Gastos'],
            datasets: [{
                label: 'Finanzas',
                data: [totalIncome, totalExpense],
                backgroundColor: [ 'rgba(85, 239, 196, 0.7)', 'rgba(255, 118, 117, 0.7)' ],
                borderColor: [ 'rgba(85, 239, 196, 1)', 'rgba(255, 118, 117, 1)' ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                datalabels: {
                    color: '#f5f6fa',
                    font: { weight: 'bold' },
                    formatter: (value) => `$${value.toLocaleString()}`
                }
            }
        },
        plugins: [ChartDataLabels]
    });

    frequencyChart = new Chart(ctx2, {
        type: chartType,
        data: {
            labels: ['Diario', 'Semanal', 'Mensual', 'Anual', 'Único'],
            datasets: [{
                label: 'Ingresos',
                data: Object.values(frequencyIncome),
                backgroundColor: 'rgba(85, 239, 196, 0.7)',
                borderColor: 'rgba(85, 239, 196, 1)',
                borderWidth: 1
            }, {
                label: 'Gastos',
                data: Object.values(frequencyExpense),
                backgroundColor: 'rgba(255, 118, 117, 0.7)',
                borderColor: 'rgba(255, 118, 117, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                datalabels: {
                    color: '#f5f6fa',
                    font: { weight: 'bold' },
                    formatter: (value) => `$${value.toLocaleString()}`
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}

window.onload = cargarDatos;