// Professional Resume PDF Generator - Using Resume PNG + Certificate Images
function downloadResume() {
  showDownloadLoading();
  
  try {
    if (!window.jspdf || !window.html2pdf) {
      showDownloadError('Loading libraries...');
      setTimeout(downloadResume, 500);
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let pageCount = 0;

    // ========== PAGE 1: RESUME IMAGE ==========
    const resumeImg = new Image();
    resumeImg.crossOrigin = 'anonymous';
    resumeImg.src = 'resume.png';
    
    resumeImg.onload = function() {
      try {
        // Convert resume image to canvas
        const canvas = document.createElement('canvas');
        canvas.width = resumeImg.width;
        canvas.height = resumeImg.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(resumeImg, 0, 0);
        
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const imgWidth = pageWidth;
        const imgHeight = (resumeImg.height / resumeImg.width) * pageWidth;
        
        // Add resume as first page (ONLY PAGE - No certificates in PDF)
        doc.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        pageCount++;
        
        // Save PDF without certificate pages
        doc.save('Suraj_Zalke_Resume.pdf');
        showDownloadSuccess('Resume Downloaded!');
        
      } catch(e) {
        console.error('Image processing error:', e);
        generateFallbackPDF(doc, pageWidth, pageHeight);
      }
    };
    
    resumeImg.onerror = function() {
      console.error('Resume image not found, using fallback');
      generateFallbackPDF(doc, pageWidth, pageHeight);
    };
    
  } catch (err) {
    console.error('PDF Error:', err);
    showDownloadError('Failed to generate PDF');
  }
}

// Fallback PDF generation (resume only, no certificates)
function generateFallbackPDF(doc, pageWidth, pageHeight) {
  const margin = 12;
  const contentWidth = pageWidth - (margin * 2);
  let yPos = 15;
  
  doc.setFillColor(245, 245, 245);
  doc.rect(0, 0, pageWidth, 20, 'F');
  
  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(20, 20, 40);
  doc.text('SURAJ DIPAK ZALKE', margin, 10);
  
  doc.setFontSize(11);
  doc.setTextColor(84, 230, 255);
  doc.text('AI & Full Stack Developer', margin, 15);
  
  yPos = 28;
  
  // Add section
  doc.setFillColor(84, 230, 255);
  doc.rect(margin - 1, yPos - 3, contentWidth + 2, 5, 'F');
  
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('PROFESSIONAL SUMMARY', margin + 1, yPos);
  
  yPos += 6;
  
  doc.setFontSize(9.5);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(60, 60, 60);
  
  const content = 'Dedicated developer and AI enthusiast with strong experience in building full-featured web & mobile applications, PWAs, and automation systems. Skilled in full-stack development, data analytics, and cybersecurity fundamentals.';
  const lines = doc.splitTextToSize(content, contentWidth - 2);
  doc.text(lines, margin + 1, yPos);
  
  doc.save('Suraj_Zalke_Resume.pdf');
  showDownloadSuccess('Resume Downloaded!');
}

// ========== UI Helper Functions ==========
function showDownloadLoading() {
  const btn = document.getElementById('downloadPdfBtn');
  if (!btn) return;
  
  btn.innerHTML = '<span>⏳</span> Generating PDF...';
  btn.disabled = true;
  btn.style.opacity = '0.7';
  btn.style.animation = 'pulse 1s infinite';
  btn.dataset.originalText = btn.innerHTML;
}

function showDownloadSuccess(msg = 'Downloaded!') {
  const btn = document.getElementById('downloadPdfBtn');
  if (!btn) return;
  
  btn.innerHTML = `<span>✓</span> ${msg}`;
  btn.style.borderColor = 'var(--cyan)';
  btn.style.color = 'var(--cyan)';
  btn.style.backgroundColor = 'rgba(84, 230, 255, 0.1)';
  btn.disabled = false;
  btn.style.opacity = '1';
  btn.style.animation = 'downloadBounce 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)';
  
  setTimeout(() => resetBtn(btn), 3500);
}

function showDownloadError(msg = 'Failed') {
  const btn = document.getElementById('downloadPdfBtn');
  if (!btn) return;
  
  btn.innerHTML = `<span>⚠</span> ${msg}`;
  btn.style.borderColor = '#ff6b6b';
  btn.style.color = '#ff6b6b';
  btn.disabled = false;
  btn.style.animation = 'shake 0.5s';
  
  setTimeout(() => resetBtn(btn), 4000);
}

function resetBtn(btn) {
  btn.innerHTML = '<span>📥</span> Download PDF';
  btn.style.borderColor = '';
  btn.style.color = '';
  btn.style.backgroundColor = '';
  btn.disabled = false;
  btn.style.opacity = '1';
  btn.style.animation = '';
}

// Add animations
const style = document.createElement('style');
style.textContent = `
  @keyframes downloadBounce {
    0% { transform: scale(1); }
    50% { transform: scale(1.08); }
    100% { transform: scale(1); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  #downloadPdfBtn {
    transition: all 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
  }
  
  #downloadPdfBtn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(84, 230, 255, 0.2);
  }
`;
document.head.appendChild(style);

window.downloadResume = downloadResume;
