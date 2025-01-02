
export function initializeDataTable() {

     // Check if table element exists
     const tableElement = document.querySelector('#myTable');
     if (!tableElement) return;
 
     // Check if DataTable is already initialized
     if ($.fn.DataTable.isDataTable('#myTable')) {
         $('#myTable').DataTable().destroy();
     }
     
 
     // Initialize new DataTable with action buttons
     let table = new DataTable('#myTable', {
          searchable: true,  // Disable search bar  
          responsive: true,
          perPage: 10,        
          perPageSelect: false, // Disable entries dropdown    
          paging: false,        // Disable pagination    
          info: false,     // Hide footer  

         
         // Add columns configuration
         columns: [
             { data: 'name' },
             { data: 'email' },
             { data: 'status' },
             { 
                 data: null,
                 render: function(data, type, row) {
                     return `
                         <button onclick="updateStatus('${row.id}')" class="status-btn">
                             ${row.status === 'Active' ? 'Deactivate' : 'Activate'}
                         </button>
                         <button onclick="deleteUser('${row.id}')" class="delete-btn">
                             Delete
                         </button>
                     `;
                 }
             }
         ]
     });
    
     addTableContent()
 }
 
 // Add table content from localStorage
 function addTableContent() {

     try {
         // Get users from localStorage
         const users = JSON.parse(localStorage.getItem('User')) || [];
         console.log(users);
 
         // Get the table's tbody element
         const tableBody = document.querySelector('#tableContent');
         if (!tableBody) return;
 
         // Clear existing rows
         tableBody.innerHTML = '';
 
         // Populate the table with user data
         users.forEach(user => {
             const row = document.createElement('tr');
             row.innerHTML = `
                 <td>${user.firstname}</td>
                 <td>${user.email}</td>
                 <td>${user.status}</td>
                 <td>
                     <button onclick="updateStatus('${user.id}')" class="status-btn">
                         ${user.status === 'Active' ? 'Deactivate' : 'Activate'}
                     </button>
                     <button onclick="deleteUser('${user.id}')" class="delete-btn">Delete</button>
                 </td>
             `;
             tableBody.appendChild(row);
         });
     } catch (error) {
         console.error('Error loading table content:', error);
     }
 }
 
 // Add these functions to handle button clicks
 window.updateStatus = async (userId) => {
      let findIndex = 0;
      let statusUpdate = [];

     try { 
         // Get users from localStorage
         const users = JSON.parse(localStorage.getItem('User')) || [];
 
         // Find user and toggle status
         //*Finds the user by index
         const userIndex = users.findIndex(user => user.id == userId);


         
         users.forEach((user) => {
              if(findIndex == userIndex){
                   
                  if(user.status === "Active"){
                    user.status = "Inactive"

                  }else{
                    user.status = "Active";
                  }
              }
              findIndex++;
              statusUpdate.push(user);
         });

        


         localStorage.setItem("User",JSON.stringify(statusUpdate));
        
 
             // Reinitialize table to reflect changes
             addTableContent();
             initializeDataTable();
 
             // Show success message
             Swal.fire({
                 icon: 'success',
                 title: 'Status Updated',
                 text: 'User status has been updated successfully!',
                 showConfirmButton: false,
                 timer: 1500
             });
         
        
     } catch (error) {
         console.error('Error updating status:', error);
         Swal.fire({
             icon: 'error',
             title: 'Error',
             text: 'Failed to update user status'
         });
     }
 };
 
 window.deleteUser = async (userId) => {
     try {
         // Show confirmation dialog
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
             // Get users from localStorage
             const users = JSON.parse(localStorage.getItem('User')) || []; //filters if users are empty
             let updateList = [];

             const userList = users.forEach((user) => {
               
                if(user.id != userId){
                    updateList.push(user);
                }
             })
          
             // Save back to localStorage
             localStorage.setItem('User', JSON.stringify(updateList));
 
             // Reinitialize table to reflect changes
             addTableContent();
             initializeDataTable();
 
             Swal.fire(
                 'Deleted!',
                 'User has been deleted.',
                 'success'
             );
         }
     } catch (error) {
         console.error('Error deleting user:', error);
         Swal.fire({
             icon: 'error',
             title: 'Error',
             text: 'Failed to delete user'
         });
     }
 };
 
 // Make initializeDataTable available globally
 window.initializeDataTable = initializeDataTable;
 
 // Initialize on DOMContentLoaded if we're on the users page
 document.addEventListener('DOMContentLoaded', () => {
     console.log("called");
     if (window.location.pathname === '/users') {          
         
         addTableContent();
         initializeDataTable();
     }
 });
 