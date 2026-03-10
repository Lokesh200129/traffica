/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            colors: {
                "lightBackground": "hsl(var(--light-background))",
            },
            spacing: {
                "sidebar-custom": "var(--sidebar-width)",
            }
        }
    }
}