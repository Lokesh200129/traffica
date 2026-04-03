export const getUsdToInr = async (): Promise<number> => {
    try {
        const res = await fetch(process.env.CURRENCY_API_LINK!);
        const data = await res.json();
        console.log("INR Rate:", data.rates.INR);
        return data.rates.INR;
    } catch {
        return parseFloat(process.env.DEFAULT_USD_TO_INR_RATE!); 
    }
};