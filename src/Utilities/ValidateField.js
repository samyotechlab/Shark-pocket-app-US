export function validateField  (name, value,account_no) {
    const phoneRegex = /^[0-9]{10}$/;
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    const accountRegex = /^\d{9,18}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    switch (name) {
        case "name":
            if (!value.trim()) return "Name is Required.";
            break;
        case "account_no":
            if (!value.trim()) return "Account number is required.";
            if (!accountRegex.test(value)) return "Incorrect Account Number.";
            break;
        case "confirm_account_no":
            if (!value.trim()) return "Confirm account number is required.";
             if (!accountRegex.test(value)) return "Incorrect Account Number.";
        case "ifsc_code":
            if (!value.trim()) return "IFSC code is required.";
            if (!ifscRegex.test(value)) return "Invalid IFSC Code.";
            break;
        case "phone":
            if (!value.trim()) return "Mobile number is required.";
            if (!phoneRegex.test(value)) return "Mobile number must be 10 digits.";
            break;
        case "pan_number":
            if (!value.trim()) return "Pan number is required.";
            if (!panRegex.test(value)) return "Invalid PAN Number.";
        default:
            return "";
    }
    return "";
};