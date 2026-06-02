import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Deal } from '../types/deal.types';
import { formatCurrency, formatDate } from './formatters';

export const exportDealToPDF = (deal: Deal): void => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('MEDDIC Deal Health Check', 14, 20);
  
  // Company name
  doc.setFontSize(14);
  doc.text(deal.company_name, 14, 30);
  
  // Basic Information Section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Basic Information', 14, 45);
  
  autoTable(doc, {
    startY: 50,
    head: [['Field', 'Value']],
    body: [
      ['Company Name', deal.company_name || ''],
      ['Opportunity Description', deal.opportunity_description || ''],
      ['Why IBM - Differentiators', deal.why_ibm || ''],
      ['Project Name', deal.project_name || ''],
      ['Business Owner', deal.business_owner || ''],
      ['Close Date', formatDate(deal.close_date) || ''],
      ['Value (USD)', formatCurrency(deal.value_usd) || ''],
    ],
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235] },
    styles: { fontSize: 10 },
  });
  
  // MEDDIC Section
  const finalY = (doc as any).lastAutoTable.finalY || 50;
  doc.setFont('helvetica', 'bold');
  doc.text('MEDDIC Qualification', 14, finalY + 15);
  
  autoTable(doc, {
    startY: finalY + 20,
    head: [['Component', 'Status', 'Details']],
    body: [
      ['Metric', deal.metric_complete ? 'Complete' : 'Incomplete', deal.metric || ''],
      ['Economic Buyer', deal.economic_buyer_complete ? 'Complete' : 'Incomplete', deal.economic_buyer || ''],
      ['Decision Criteria', deal.decision_criteria_complete ? 'Complete' : 'Incomplete', deal.decision_criteria || ''],
      ['Decision Process', deal.decision_process_complete ? 'Complete' : 'Incomplete', deal.decision_process || ''],
      ['Identified Pain', deal.identified_pain_complete ? 'Complete' : 'Incomplete', deal.identified_pain || ''],
      ['Champion', deal.champion_complete ? 'Complete' : 'Incomplete', deal.champion || ''],
      ['Competition', deal.competition_complete ? 'Complete' : 'Incomplete', deal.competition || ''],
    ],
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235] },
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 30 },
      2: { cellWidth: 'auto' },
    },
  });
  
  // Action Items Section
  const finalY2 = (doc as any).lastAutoTable.finalY || 50;
  doc.setFont('helvetica', 'bold');
  doc.text('Action Items', 14, finalY2 + 15);
  
  autoTable(doc, {
    startY: finalY2 + 20,
    head: [['Field', 'Value']],
    body: [
      ['Next Actions', deal.next_actions || ''],
      ['Action Date', formatDate(deal.action_date) || ''],
      ['Action Owner', deal.action_owner || ''],
    ],
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235] },
    styles: { fontSize: 10 },
  });
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Generated on ${new Date().toLocaleDateString()} - Page ${i} of ${pageCount}`,
      14,
      doc.internal.pageSize.height - 10
    );
  }
  
  // Save the PDF
  const fileName = `${deal.company_name.replace(/[^a-z0-9]/gi, '_')}_MEDDIC_Report.pdf`;
  doc.save(fileName);
};

// Made with Bob
