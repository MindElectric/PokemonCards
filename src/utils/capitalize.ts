function capitalizeString(input: string): string {
    return input
        .split('-') // Split the string by dash
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(' '); // Join the words with a space
}

export default capitalizeString;