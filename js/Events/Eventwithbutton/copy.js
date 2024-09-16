function copyText() {
      // Get the value from the source input
    //   var sourceValue = document.getElementById('sourceInput').value;
      
      // Set the value to the destination input
      document.getElementById('destinationInput').value = document.getElementById('sourceInput').value;
      document.getElementById('sourceInput').value= ' ';
    //   sourceInput.value = '';
    }