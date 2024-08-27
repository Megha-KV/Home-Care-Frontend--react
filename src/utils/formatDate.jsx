export const formateDate = (mongoDate)=> {
    const date = new Date(mongoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const period = hours >= 12 ? "PM" : "AM";
  
    // Convert hours to 12-hour format
    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }
    
    // Combine date and time in the desired format
    return `${day}/${month}/${year} ${hours}:${minutes}:${period}`;

  };