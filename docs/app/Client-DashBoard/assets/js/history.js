// transaction-table.js
export function initializeDataTable() {
    console.log("Initializing data table...");
    
    // Wait for element to be available
    const checkElement = setInterval(() => {
        const tableElement = document.querySelector('#table');
        console.log(`Table Element: ${tableElement}`);
        if (tableElement) {
            clearInterval(checkElement);
            setupTable();
        }
    }, 100);
}

function setupTable() {
    const tableElement = document.querySelector('#table');
    
    // Check if DataTable is already initialized
    if ($.fn.DataTable.isDataTable('#table')) {
        $('#table').DataTable().destroy();
    }

    // Initialize new DataTable
    let table = new DataTable('#table', {
        searchable: true,
        responsive: true,
        perPage: 10,
        perPageSelect: false,
        paging: false,
        info: false,

        columns: [
            { data: 'date' },
            { data: 'description' },
            { data: 'category' },
            { data: 'amount' },
            { data: 'type' },
            {
                data: null,
                render: function(data, type, row) {
                    return `
                        <button onclick="editTransaction('${row.id}')" class="edit-btn">
                            Edit
                        </button>
                        <button onclick="deleteTransaction('${row.id}')" class="delete-btn">
                            Delete
                        </button>
                    `;
                }
            }
        ]
    });

    addTableContent();
}

function addTableContent() {
    try {
        const transactions = JSON.parse(localStorage.getItem('Transactions')) || [];
        console.log('Loading transactions:', transactions);

        const tableBody = document.querySelector('.datas');
        if (!tableBody) return;

        tableBody.innerHTML = '';

        transactions.forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${formatDate(transaction.date)}</td>
                <td>${transaction.description}</td>
                <td>${transaction.category}</td>
                <td>${formatAmount(transaction.amount)}</td>
                <td>${transaction.type}</td>
                <td>
                    <button onclick="editTransaction('${transaction.id}')" class="edit-btn">
                        Edit
                    </button>
                    <button onclick="deleteTransaction('${transaction.id}')" class="delete-btn">
                        Delete
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading transactions:', error);
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

function formatAmount(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

window.editTransaction = async (transactionId) => {
    try {
        const transactions = JSON.parse(localStorage.getItem('Transactions')) || [];
        const transaction = transactions.find(t => t.id === transactionId);

        if (!transaction) return;

        const { value: formValues } = await Swal.fire({
            title: 'Edit Transaction',
            html: `
                <input id="description" class="swal2-input" placeholder="Description" value="${transaction.description}">
                <input id="amount" class="swal2-input" placeholder="Amount" value="${transaction.amount}">
                <select id="category" class="swal2-input">
                    <option value="Income" ${transaction.category === 'Income' ? 'selected' : ''}>Income</option>
                    <option value="Expense" ${transaction.category === 'Expense' ? 'selected' : ''}>Expense</option>
                </select>
            `,
            focusConfirm: false,
            preConfirm: () => {
                return {
                    description: document.getElementById('description').value,
                    amount: document.getElementById('amount').value,
                    category: document.getElementById('category').value
                };
            }
        });

        if (formValues) {
            const updatedTransactions = transactions.map(t => {
                if (t.id === transactionId) {
                    return { ...t, ...formValues };
                }
                return t;
            });

            localStorage.setItem('Transactions', JSON.stringify(updatedTransactions));
            setupTable(); // Use setupTable instead of separate calls

            Swal.fire('Updated!', 'Transaction has been updated.', 'success');
        }
    } catch (error) {
        console.error('Error editing transaction:', error);
        Swal.fire('Error', 'Failed to edit transaction', 'error');
    }
};

window.deleteTransaction = async (transactionId) => {
    try {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            const transactions = JSON.parse(localStorage.getItem('Transactions')) || [];
            const updatedTransactions = transactions.filter(t => t.id !== transactionId);
            
            localStorage.setItem('Transactions', JSON.stringify(updatedTransactions));
            setupTable(); // Use setupTable instead of separate calls

            Swal.fire('Deleted!', 'Transaction has been deleted.', 'success');
        }
    } catch (error) {
        console.error('Error deleting transaction:', error);
        Swal.fire('Error', 'Failed to delete transaction', 'error');
    }
};

// Make the initialization function available globally
window.initializeDataTable = initializeDataTable;