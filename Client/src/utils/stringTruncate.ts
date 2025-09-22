
 export const truncateContent = (text: string, limit: number = 300) => {
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };
