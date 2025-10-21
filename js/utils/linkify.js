/* Convert URLs in text to clickable links */

function linkifyText(text) {
  if (!text) return text;

  let linkedText = text;
  const processedRanges = [];

  // First, handle emails
  const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  linkedText = linkedText.replace(emailPattern, (email) => {
    return `<a href="mailto:${email}" class="modal-link">${email}</a>`;
  });

  // Then handle URLs (more specific patterns first)
  // Pattern for URLs with or without protocol
  const urlPattern = /(?:^|[\s,;:—。])((https?:\/\/)?((?:www\.)?[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s,;:。]*)?)/gi;

  linkedText = linkedText.replace(urlPattern, (match, url, protocol, domain) => {
    // Skip if already part of an anchor tag
    if (match.includes('<a ') || match.includes('href=')) {
      return match;
    }

    // Preserve leading whitespace/punctuation
    const leadingChar = match.charAt(0);
    const isLeading = /[\s,;:—。]/.test(leadingChar);
    const prefix = isLeading ? leadingChar : '';
    const cleanUrl = isLeading ? url : match;

    // Add https:// if not present
    const href = protocol ? cleanUrl : `https://${cleanUrl}`;

    return `${prefix}<a href="${href}" target="_blank" rel="noopener noreferrer" class="modal-link">${cleanUrl}</a>`;
  });

  return linkedText;
}

window.linkifyText = linkifyText;
