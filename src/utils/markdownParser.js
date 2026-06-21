/**
 * Parse findings.md thành mảng các object CVE/Bug.
 *
 * Định dạng file: Mỗi entry bắt đầu bằng ID (CVE-XXXX-XXXX hoặc BUG-XXXX).
 * Các trường theo format `Key: Value`. Entry cách nhau bởi `---`.
 *
 * @param {string} markdown - Nội dung file findings.md
 * @returns {Array<{id: string, title: string, impact: string, company: string, description: string, date: string}>}
 */
export function parseFindings(markdown) {
  if (!markdown || typeof markdown !== 'string') {
    return [];
  }

  // Tách các entry bằng dấu phân cách "---"
  const entries = markdown.split(/\n---\n/);

  const results = [];

  for (const entry of entries) {
    const trimmed = entry.trim();
    if (!trimmed) continue;

    const finding = parseEntry(trimmed);
    if (finding) {
      results.push(finding);
    }
  }

  return results;
}

/**
 * Parse một entry đơn lẻ từ markdown.
 */
function parseEntry(entryText) {
  const lines = entryText.split('\n');

  // Dòng đầu tiên là ID (CVE-XXXX-XXXX hoặc BUG-XXXX)
  const idLine = lines[0]?.trim();
  if (!idLine) return null;

  const id = idLine;

  const fields = {};
  let currentKey = null;
  let descriptionLines = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    if (!trimmedLine) continue;

    // Kiểm tra xem dòng có phải là key: value không
    const kvMatch = trimmedLine.match(/^([A-Za-z]+):\s*(.*)/);

    if (kvMatch) {
      // Lưu description cũ nếu đang thu thập
      if (currentKey === 'Description' && descriptionLines.length > 0) {
        fields['Description'] = descriptionLines.join('\n').trim();
        descriptionLines = [];
      }

      const key = kvMatch[1];
      const value = kvMatch[2].trim();

      if (key === 'Description') {
        currentKey = 'Description';
        if (value) {
          descriptionLines.push(value);
        }
      } else {
        currentKey = key;
        fields[key] = value;
      }
    } else if (currentKey === 'Description') {
      // Dòng tiếp theo của description (không có key prefix)
      descriptionLines.push(trimmedLine);
    }
  }

  // Lưu description cuối cùng
  if (currentKey === 'Description' && descriptionLines.length > 0) {
    fields['Description'] = descriptionLines.join('\n').trim();
  }

  // Chuẩn hóa field names
  return {
    id: id,
    title: fields['Title'] || 'Untitled',
    impact: fields['Impact'] || 'Low',
    company: fields['Company'] || 'Unknown',
    description: fields['Description'] || 'No description provided.',
    date: fields['Date'] || '',
  };
}

/**
 * Filter findings theo impact level.
 * @param {Array} findings - Mảng đã parse
 * @param {string} impact - "All" | "High" | "Medium" | "Low"
 */
export function filterByImpact(findings, impact) {
  if (!impact || impact === 'All') return findings;
  return findings.filter(
    (f) => f.impact.toLowerCase() === impact.toLowerCase()
  );
}

/**
 * Search findings theo keyword (tìm trong title, company, description).
 * @param {Array} findings - Mảng đã parse
 * @param {string} query - Từ khóa tìm kiếm
 */
export function searchFindings(findings, query) {
  if (!query || !query.trim()) return findings;
  const q = query.toLowerCase().trim();
  return findings.filter(
    (f) =>
      f.title.toLowerCase().includes(q) ||
      f.company.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q) ||
      f.id.toLowerCase().includes(q)
  );
}
