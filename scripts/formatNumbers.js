// Helper function to calculate time ago
function calculateTimeAgo(uploadTime) {
    // work out time ago from unix timestamp 
    const now = new Date();
    const uploadDate = new Date(uploadTime * 1000);
    console.log(now, uploadDate);
    const timeDiff = now - uploadDate;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    console.log(years, months, days, hours, minutes, seconds);

    let timeAgo = "";
    if (years > 0) {
        timeAgo = `${years} year${years > 1 ? "s" : ""} ago`;
    } else if (months > 0) {
        timeAgo = `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
        timeAgo = `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
        timeAgo = `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
        timeAgo = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
        timeAgo = `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }

    return timeAgo; // return the time ago string in the format "1 year ago" or "1 month ago" or "1 day ago" or "1 hour ago" or "1 minute ago" or "1 second ago" or "1 second ago" or "1 second ago" or "1
}

function formatNumber(num) {
    if (num >= 1000000) {
        return parseFloat((num / 1000000).toFixed(2)) + 'M';
    } else if (num >= 1000) {
        return parseFloat((num / 1000).toFixed(2)) + 'K';
    } else {
        return num.toString();
    }
}