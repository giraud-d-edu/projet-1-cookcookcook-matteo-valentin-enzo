export function timeToStringConverter (time: number): string {
  const hours = Math.floor(time / 60)+ "h";
    const minutes = time % 60;
    if (hours === "0h") {
        return `${minutes} min`;
    }
    if (minutes === 0) {
        return hours;
    }
    else {
        return `${hours}${minutes}`;
    }
  
}