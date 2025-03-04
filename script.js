function convertToIEEE754() {
    // Get the decimal number from input
    let decimal = parseFloat(document.getElementById('decimal').value);
    
    // Check if input is valid
    if (isNaN(decimal)) {
        alert("Please enter a valid decimal number.");
        return;
    }
    
    // Sign bit (S)
    let sign = decimal < 0 ? 1 : 0;
    decimal = Math.abs(decimal);
    
    // Exponent (E) and Fraction (F) calculation
    let exponent, fraction;
    if (decimal === 0) {
        exponent = 0;
        fraction = 0;
    } else {
        // Normalize the number (bring it to the form 1.xxxxx)
        let mantissa = Math.log2(decimal);
        exponent = Math.floor(mantissa);
        fraction = decimal / Math.pow(2, exponent) - 1;
        
        // Adjust exponent for bias of 127 in IEEE 754 single precision
        exponent += 127;
    }
    
    // Convert exponent and fraction to binary format
    let exponentBinary = (exponent).toString(2).padStart(8, '0');
    let fractionBinary = '';
    
    for (let i = 0; i < 23; i++) {
        fraction *= 2;
        let bit = Math.floor(fraction);
        fraction -= bit;
        fractionBinary += bit.toString();
    }
    
    // Combine all parts to form the IEEE 754 representation
    let ieee754 = sign + ' ' + exponentBinary + ' ' + fractionBinary;
    
    // Display the result
    document.getElementById('binaryResult').textContent = ieee754;
}
