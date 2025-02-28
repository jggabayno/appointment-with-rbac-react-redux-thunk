export default function makeHelpers() {

  const uniqueEntries = (array) => [...new Set(array)]

  function uniqueEntriesByObject(arr, comp) {
    // store the comparison  values in array
    const unique = arr
      .map((e) => e[comp])

      // store the indexes of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the false indexes & return unique objects
      .filter((e) => arr[e])
      .map((e) => arr[e]);

    return unique;
  }

  const lastEntry = (array) => array.slice(-1)

  const age = (dateOfBirth) => {
    const ageDiff = Date.now() - new Date(dateOfBirth).getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const randomColor = () => {
    const generate2Letter =
      ("0" + String(Math.floor(Math.random() * 256).toString(16))).substr(-2);
    const hex = generate2Letter + generate2Letter + generate2Letter;
    return "#" + hex;
  }

  const number = (currency) => {

    const currencyComma = currency.toLocaleString();
    const currencyCommaDecimal = [currencyComma + '.00'].toString();

    return {
      comma() {
        return currencyComma;
      },
      commaDecimal() {
        return currencyCommaDecimal;
      },
      pesoCommaDecimal() {
        return `₱ ${currencyCommaDecimal}`
      }
    }
  }

  return {
    uniqueEntries,
    uniqueEntriesByObject,
    lastEntry,
    age,
    randomColor,
    number
  };
}