export let timestampToDate = (timestamp) => {
    let date = new Date(timestamp)

    let outputDate = date.getHours() + ":" + date.getMinutes() + "," + date.getDate() 
        + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    
    return outputDate
}