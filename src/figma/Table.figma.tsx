import React from 'react';
import { figma } from '@figma/code-connect';
import { Table } from './Table';
import type { TableColumn } from './Table';

/**
 * Figma Code Connect for Table Component
 * 
 * Instructions:
 * 1. Open Figma and navigate to your Table component
 * 2. Copy the component URL (it should look like: https://www.figma.com/design/FILE_KEY/FILE_NAME?node-id=NODE_ID)
 * 3. Replace the NODE_URL below with your Figma component URL
 * 4. Run: npx figma connect publish
 */

const NODE_URL = 'REPLACE-WITH-TABLE-NODE-ID'; // e.g., 'https://www.figma.com/design/abc123/MyFile?node-id=1-2'

figma.connect(Table, NODE_URL, {
  props: {
    variant: figma.enum('Variant', {
      Default: 'default',
      Striped: 'striped',
      Bordered: 'bordered',
      Compact: 'compact',
    }),
    size: figma.enum('Size', {
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
    }),
    hoverable: figma.boolean('Hoverable'),
    sortable: figma.boolean('Sortable'),
    selectable: figma.boolean('Selectable'),
    stickyHeader: figma.boolean('Sticky Header'),
    columnCount: figma.enum('Columns', {
      Three: 3,
      Four: 4,
      Five: 5,
      Six: 6,
      Seven: 7,
    }),
    dataType: figma.enum('Data Type', {
      Policies: 'policies',
      Claims: 'claims',
      Risks: 'risks',
      Generic: 'generic',
    }),
  },
  example: ({ variant, size, hoverable, sortable, selectable, stickyHeader, columnCount, dataType }) => {
    // Generate sample data based on dataType
    const getSampleData = () => {
      if (dataType === 'policies') {
        return [
          {
            policyNumber: 'POL-2024-001',
            client: 'Acme Corporation',
            type: 'Commercial Property',
            premium: 125000,
            status: 'Active',
            renewalDate: '2025-06-15',
            broker: 'John Smith',
          },
          {
            policyNumber: 'POL-2024-002',
            client: 'Global Tech Industries',
            type: 'Cyber Liability',
            premium: 85000,
            status: 'Active',
            renewalDate: '2025-03-22',
            broker: 'Sarah Johnson',
          },
          {
            policyNumber: 'POL-2024-003',
            client: 'Midwest Manufacturing',
            type: 'Workers Compensation',
            premium: 210000,
            status: 'Pending',
            renewalDate: '2025-08-10',
            broker: 'Michael Chen',
          },
        ];
      } else if (dataType === 'claims') {
        return [
          {
            claimId: 'CLM-2024-1234',
            policyNumber: 'POL-2024-001',
            claimant: 'Acme Corporation',
            amount: 45000,
            status: 'Under Review',
            dateSubmitted: '2024-12-01',
            assignedTo: 'Claims Team A',
          },
          {
            claimId: 'CLM-2024-1235',
            policyNumber: 'POL-2024-002',
            claimant: 'Global Tech Industries',
            amount: 12500,
            status: 'Approved',
            dateSubmitted: '2024-11-28',
            assignedTo: 'Claims Team B',
          },
        ];
      } else if (dataType === 'risks') {
        return [
          {
            id: 'RISK-001',
            company: 'Acme Corporation',
            industry: 'Manufacturing',
            riskScore: 72,
            category: 'Medium',
            lastReview: '2024-11-15',
            reviewer: 'Alice Thompson',
          },
          {
            id: 'RISK-002',
            company: 'Global Tech Industries',
            industry: 'Technology',
            riskScore: 45,
            category: 'Low',
            lastReview: '2024-12-01',
            reviewer: 'Bob Williams',
          },
        ];
      } else {
        return [
          { id: 1, name: 'Item 1', value: 100, status: 'Active' },
          { id: 2, name: 'Item 2', value: 200, status: 'Pending' },
          { id: 3, name: 'Item 3', value: 150, status: 'Active' },
        ];
      }
    };

    // Generate columns based on dataType and columnCount
    const getColumns = (): TableColumn[] => {
      if (dataType === 'policies') {
        const allColumns = [
          { key: 'policyNumber', header: 'Policy Number', sortable: true },
          { key: 'client', header: 'Client', sortable: true },
          { key: 'type', header: 'Policy Type', sortable: true },
          { key: 'premium', header: 'Premium', sortable: true, align: 'right' as const },
          { key: 'status', header: 'Status', sortable: true },
          { key: 'renewalDate', header: 'Renewal Date', sortable: true },
          { key: 'broker', header: 'Broker', sortable: true },
        ];
        return allColumns.slice(0, columnCount);
      } else if (dataType === 'claims') {
        const allColumns = [
          { key: 'claimId', header: 'Claim ID', sortable: true },
          { key: 'policyNumber', header: 'Policy', sortable: true },
          { key: 'claimant', header: 'Claimant', sortable: true },
          { key: 'amount', header: 'Amount', sortable: true, align: 'right' as const },
          { key: 'status', header: 'Status', sortable: true },
          { key: 'dateSubmitted', header: 'Submitted', sortable: true },
          { key: 'assignedTo', header: 'Assigned To' },
        ];
        return allColumns.slice(0, columnCount);
      } else if (dataType === 'risks') {
        const allColumns = [
          { key: 'id', header: 'Risk ID', sortable: true },
          { key: 'company', header: 'Company', sortable: true },
          { key: 'industry', header: 'Industry', sortable: true },
          { key: 'riskScore', header: 'Risk Score', sortable: true, align: 'center' as const },
          { key: 'category', header: 'Category', sortable: true },
          { key: 'lastReview', header: 'Last Review', sortable: true },
          { key: 'reviewer', header: 'Reviewer', sortable: true },
        ];
        return allColumns.slice(0, columnCount);
      } else {
        const allColumns = [
          { key: 'id', header: 'ID', sortable: true },
          { key: 'name', header: 'Name', sortable: true },
          { key: 'value', header: 'Value', sortable: true },
          { key: 'status', header: 'Status', sortable: true },
        ];
        return allColumns.slice(0, Math.min(columnCount, 4));
      }
    };

    return (
      <Table
        columns={getColumns()}
        data={getSampleData()}
        variant={variant}
        size={size}
        hoverable={hoverable}
        sortable={sortable}
        selectable={selectable}
        stickyHeader={stickyHeader}
      />
    );
  },
});
