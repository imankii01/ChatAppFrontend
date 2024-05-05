export function extractDate(timeStamp) {
    // Create a new Date object from the ISO string
    const date = new Date(timeStamp);
    
    // Extract the components of the date
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-indexed, so add 1
    const day = date.getDate();
    
    // Format the date components into a human-readable format
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    return formattedDate;
  }

  export function isInterviewUpcoming(interviewDate, interviewTime){
    // Get current date and time
    const currentTime = new Date().toLocaleTimeString( 'en-US',{ hour12: true, hour: 'numeric', minute: 'numeric' })
    console.log("upcomming",interviewTime<currentTime)
    extractDate(new Date().setHours(0, 0, 0, 0)) 
    
    // Compare interview date with current date
    if ( extractDate(interviewDate)  > extractDate(new Date().setHours(0, 0, 0, 0)) ) {
      return true; // Interview date is in the future
    } else if (interviewTime>currentTime) {
      // Get current time in 24-hour clock format
      return true;
    }
    
    return false; // Interview is not upcoming
  };
