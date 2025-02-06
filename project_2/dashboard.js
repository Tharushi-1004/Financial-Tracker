document.addEventListener('DOMContentLoaded', function () {
    // Initialize pie chart
    const pieChartCanvas = document.getElementById('pieChart');
    const pieChartContext = pieChartCanvas.getContext('2d');
    const pieChart = new Chart(pieChartContext, {
        type: 'pie',
        data: {
            labels: ['Income', 'Expenses'],
            datasets: [{
                data: [0, 0],
                backgroundColor: ['#28A745', '#DC3545'],
            }],
        },
    });

    // Function to update the pie chart
    function updatePieChart() {
        let totalIncome = 0, totalExpenses = 0;
        const rows = document.querySelectorAll('#recordsTableBody tr');
      
        rows.forEach(row => {
            const amount = parseFloat(row.cells[1].textContent);
            if (row.cells[0].textContent === 'income') {
                totalIncome += amount;
            } else {
                totalExpenses += amount;
            }
        });
      
        pieChart.data.datasets[0].data = [totalIncome, totalExpenses];
        pieChart.update();
    }

    // Function to record a transaction
    window.record = function () {
        const type = document.getElementById('type').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const date = document.getElementById('date').value;
        const remarks = document.getElementById('remarks').value;

        const tableBody = document.getElementById('recordsTableBody');
        const newRow = tableBody.insertRow();

        newRow.insertCell(0).textContent = type;
        newRow.insertCell(1).textContent = amount.toFixed(2);
        newRow.insertCell(2).textContent = date;
        newRow.insertCell(3).textContent = remarks;
        newRow.insertCell(4).textContent = ''; // Placeholder for balance
        newRow.insertCell(5).innerHTML = '<button class="remove-btn" onclick="removeRow(this)">Remove</button>';

        updateBalanceColumn();
        updatePieChart();

        // Clear the form fields
        document.getElementById('recordForm').reset();
    };

    // Function to remove a row
    window.removeRow = function (button) {
        const row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
        updateBalanceColumn();
        updatePieChart();
    };

    // Function to update balance in each row
    function updateBalanceColumn() {
        const balanceCells = document.querySelectorAll('#recordsTableBody td:nth-child(5)');
        let balance = 0;

        balanceCells.forEach(cell => {
            const amount = parseFloat(cell.parentNode.cells[1].textContent);
            balance += cell.parentNode.cells[0].textContent === 'income' ? amount : -amount;
            cell.textContent = balance.toFixed(2);
        });
    }

    // Function to toggle records visibility
    window.toggleRecords = function () {
        const table = document.getElementById('recordsTable');
        table.style.display = table.style.display === 'none' || table.style.display === '' ? 'table' : 'none';
    };

    // Function to update monthly summary
    window.updateMonthlySummary = function () {
        const selectedMonth = document.getElementById('summaryMonth').value;
        let totalIncome = 0, totalExpenses = 0;

        document.querySelectorAll('#recordsTableBody tr').forEach(row => {
            const date = row.cells[2].textContent;
            const month = date.slice(0, 7);
            const amount = parseFloat(row.cells[1].textContent);

            if (month === selectedMonth) {
                if (row.cells[0].textContent === 'income') {
                    totalIncome += amount;
                } else {
                    totalExpenses += amount;
                }
            }
        });

        document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
        document.getElementById('totalExpenses').textContent = totalExpenses.toFixed(2);
        document.getElementById('netBalance').textContent = (totalIncome - totalExpenses).toFixed(2);
    };
});

