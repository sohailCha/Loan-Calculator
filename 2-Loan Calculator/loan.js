
    // UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    const results = document.getElementById("results");
    const loading = document.getElementById("loading");
    const loanForm = document.getElementById("loan-form");
  
  
  // Calculate Results
  function calculateResults(){

    // calculating results
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;
  
    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);
  
    if(isFinite(monthly)) {
      monthlyPayment.value = monthly.toFixed(2);
      totalPayment.value = (monthly * calculatedPayments).toFixed(2);
      totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
  
      // Show results
      results.style.display = 'block';
  
      // Hide loader
      loading.style.display = 'none';

      // clear input after 7 secs so user can calculate new results
      setTimeout(clearInput, 7000);
  
    } else {
      showError('Please check your numbers');
    }
  }
  
  // Show Error
  function showError(error){

    // Hiding results when error occurs
    results.style.display = 'none';
    
    // Hiding loader when error occurs
    loading.style.display = 'none';
  
    // Create a div to insert error msg in it
    const errorDiv = document.createElement('div');
  
    // Getting elements so that error div can be inserted.
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
  
    // Add class to error div 
    errorDiv.className = 'alert alert-danger';
  
    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
  
    // Insert error above heading
    card.insertBefore(errorDiv, heading);
  
    // Clear error after 2 seconds
    setTimeout(clearError, 2000);
  }
  
  // Clear error
  function clearError(){
    document.querySelector('.alert').remove();
  }

  // clearing out input
  function clearInput(){
    results.style.display = 'none';
    amount.value = "";
    interest.value = "";
    years.value = "";
  }

  // Listen for submit
loanForm.addEventListener('submit', function(e){
  // Hide results
  results.style.display = 'none';
  
  // Show loader
  loading.style.display = 'block';

  // calling calculate results after 2 secs so loader can be visible for 2 secs.
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});