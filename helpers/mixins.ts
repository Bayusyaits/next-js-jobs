export const getResponse = (val: any) => {
  return val && val.data && val.data.data ? val.data.data : val.data
}
export const myLoader = ({src, width, height, quality}: any) => {
  let str = src
  let symbol = ''
  if (width) {
    symbol = '?'
    str += `?width=${width}`
  }
  if (height) {
    if (symbol === '?') {
      symbol = '&'
    } 
    str += `${symbol}height=${height}`
  }
  if (quality) {
    if (symbol === '?') {
      symbol = '&'
    } 
    str += `${symbol}quality=${quality}`
  }
  return `${str}#priority`
} 
export const capitalize = (str: string) => {
  if (!str || typeof str !== 'string') {
    return
  } 
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const resolveTimeout = (value: any, delay: number) => {
  return new Promise(
    (resolve) => setTimeout(() => resolve(value), delay)
  );
}

export const rejectTimeout = (reason: any, delay: number) => {
  return new Promise(
    (r, reject) => setTimeout(() => reject(reason), delay)
  );
}