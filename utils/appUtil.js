const generateOtp = () => {
    let randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);
    return randomSixDigitNumber;
}

module.exports.generateOtp = generateOtp