export function formatCurency(priceCents){
    const priceDollar = (priceCents/100).toFixed(2)
    return priceDollar
}