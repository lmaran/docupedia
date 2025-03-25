export const email = (value) => {
    // https://www.geeksforgeeks.org/javascript-program-to-validate-an-email-address/
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value);
};
