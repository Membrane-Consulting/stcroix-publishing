export default {
  name: 'purchaseOrder',
  title: 'Purchase order',
  type: 'document',
  fields: [
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true
    },
    {
      name: 'processed',
      title: 'Processed?',
      type: 'boolean',    
    },
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'customerEmail',
      title: 'customerEmail',
      type: 'string',
      readOnly: true,
    },
    
    {
      name: 'purchaseOrderFile',
      title: 'Purchase Order File',
      type: 'file',
      readOnly: true
    },
  ],
}