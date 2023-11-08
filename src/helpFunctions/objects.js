const ObjectToArray = (obj) => {
    const arr = [];
    for (const key in obj) {
        arr.push({ ...obj[key], id: key });
    }

    return arr
}
export default ObjectToArray