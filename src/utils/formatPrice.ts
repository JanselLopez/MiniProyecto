const formatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    currencyDisplay: "symbol",
  });

const formatPrice = (number:number):string => formatter.format(number);

export default formatPrice;