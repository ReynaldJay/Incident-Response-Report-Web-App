document.addEventListener("DOMContentLoaded", () => {
  const reportsCount = document.getElementById("reportsCount");
  const usernameInput = document.getElementById("username");
  const exportBtn = document.getElementById("exportPdfBtn");
  const pdfPreview = document.getElementById("pdfPreview");
  const metaId = document.getElementById("metaId");

  // Load saved reports count
  const savedReports = JSON.parse(localStorage.getItem("ir_reports_saved") || "[]");
  reportsCount.textContent = savedReports.length;

  // Restore username
  usernameInput.value = localStorage.getItem("username") || "";
  usernameInput.addEventListener("input", () => {
    localStorage.setItem("username", usernameInput.value);
    updatePdfPreview();
  });

  // Auto-generate report ID
  function generateReportId() {
    const now = new Date();
    const year = now.getFullYear();
    const num = String(Math.floor(Math.random() * 9999)).padStart(4, "0");
    metaId.value = `IR-${year}-${num}`;
  }
  generateReportId();

  // Listen for input changes
  document.querySelectorAll("#reportContent input, #reportContent textarea, #reportContent select")
    .forEach(el => el.addEventListener("input", updatePdfPreview));

  function collectFormData() {
    return {
      id: document.getElementById("metaId").value,
      title: document.getElementById("metaTitle").value,
      detected: document.getElementById("metaDetected").value,
      reported: document.getElementById("metaReported").value,
      severity: document.getElementById("metaSeverity").value,
      status: document.getElementById("metaStatus").value,
      summary: document.getElementById("summaryText").value,
      timeline: Array.from(document.querySelectorAll("#timelineList .log-item"))
                     .map(item => item.textContent.trim()),
      iocs: document.getElementById("iocs").value
    };
  }

  function generateCleanPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");
    const data = collectFormData();

    let y = 10;
    pdf.setFontSize(18);
    pdf.text("Incident Response Report", 105, y, { align: "center" });
    y += 10;

    pdf.setFontSize(11);
    pdf.text(`Report ID: ${data.id}`, 10, y); y += 6;
    pdf.text(`Title: ${data.title}`, 10, y); y += 6;
    pdf.text(`Detected at: ${data.detected}`, 10, y); y += 6;
    pdf.text(`Reported by: ${data.reported}`, 10, y); y += 6;
    pdf.text(`Severity: ${data.severity}`, 10, y); y += 6;
    pdf.text(`Status: ${data.status}`, 10, y); y += 10;

    pdf.setFontSize(14);
    pdf.text("Summary", 10, y); y += 6;
    pdf.setFontSize(11);
    const summaryLines = pdf.splitTextToSize(data.summary, 190);
    pdf.text(summaryLines, 10, y); y += summaryLines.length * 6 + 4;

    pdf.setFontSize(14);
    pdf.text("Timeline / Log Events", 10, y); y += 6;
    pdf.setFontSize(11);
    if (data.timeline.length > 0) {
      data.timeline.forEach(event => {
        const lines = pdf.splitTextToSize(`- ${event}`, 190);
        pdf.text(lines, 10, y);
        y += lines.length * 6;
      });
    } else {
      pdf.text("No events recorded.", 10, y); y += 6;
    }
    y += 4;

    pdf.setFontSize(14);
    pdf.text("Indicators of Compromise (IOCs)", 10, y); y += 6;
    pdf.setFontSize(11);
    const iocLines = pdf.splitTextToSize(data.iocs, 190);
    pdf.text(iocLines.length ? iocLines : ["None"], 10, y); y += iocLines.length * 6;

    return pdf;
  }

  async function updatePdfPreview() {
    const pdf = generateCleanPDF();
    const blob = pdf.output("blob");
    pdfPreview.src = URL.createObjectURL(blob);
  }

  // Initial preview
  updatePdfPreview();

  // Export PDF
  exportBtn.addEventListener("click", () => {
    const pdf = generateCleanPDF();
    pdf.save("incident_report.pdf");
  });
});
