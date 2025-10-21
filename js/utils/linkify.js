/* Convert URLs in text to clickable links */

function linkifyText(text) {
  // Pattern to match URLs and email addresses
  const urlPattern = /(\b(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?)/gi;
  const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  
  let linkedText = text;
  
  // Convert emails to mailto links
  linkedText = linkedText.replace(emailPattern, (email) => {
    return `<a href="mailto:${email}" class="modal-link">${email}</a>`;
  });
  
  // Convert URLs to clickable links
  linkedText = linkedText.replace(urlPattern, (url) => {
    // Don't linkify if already part of an anchor tag
    if (linkedText.indexOf(`href="${url}"`) !== -1 || linkedText.indexOf(`href="mailto:${url}"`) !== -1) {
      return url;
    }
    
    // Add https:// if not present
    const href = url.match(/^https?:\/\//) ? url : `https://${url}`;
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="modal-link">${url}</a>`;
  });
  
  return linkedText;
}

window.linkifyText = linkifyText;

