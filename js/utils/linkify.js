/* Convert URLs in text to clickable links */

function linkifyText(text) {
  if (!text) return text;
  
  let result = text;
  
  // First, convert emails to mailto links
  const emailPattern = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  result = result.replace(emailPattern, '<a href="mailto:$1" class="modal-link">$1</a>');
  
  // Then convert URLs to clickable links (matches https://, http://, or www.)
  const urlPattern = /(https?:\/\/[^\s<]+)/g;
  result = result.replace(urlPattern, '<a href="$1" target="_blank" rel="noopener noreferrer" class="modal-link">$1</a>');
  
  return result;
}

window.linkifyText = linkifyText;
