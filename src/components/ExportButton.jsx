import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function ExportButton() {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);

    try {
      const element = document.getElementById('resume-preview-content');
      if (!element) {
        throw new Error('Resume preview not found');
      }

      // Store original styles
      const originalOverflow = element.style.overflow;
      const originalHeight = element.style.height;
      const originalMaxHeight = element.style.maxHeight;
      
      // Temporarily expand to full content
      element.style.overflow = 'visible';
      element.style.height = 'auto';
      element.style.maxHeight = 'none';

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 794, // A4 width at 96 DPI
      });

      // Restore original styles
      element.style.overflow = originalOverflow;
      element.style.height = originalHeight;
      element.style.maxHeight = originalMaxHeight;

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();   // 210 mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297 mm

      // Always scale by width so full A4 width is used — never clip right side
      const widthRatio = pdfWidth / canvas.width;
      const scaledWidth = pdfWidth;
      const scaledHeight = canvas.height * widthRatio;

      // Slice canvas into A4-height pages
      const totalPages = Math.ceil(scaledHeight / pdfHeight);
      const imgData = canvas.toDataURL('image/png');

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, -(page * pdfHeight), scaledWidth, scaledHeight);
      }

      pdf.save('CareerCraft_Resume.pdf');
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className="btn-primary text-sm py-2 px-4"
      id="export-pdf-button"
    >
      {exporting ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Download size={16} />
          Export PDF
        </>
      )}
    </button>
  );
}
