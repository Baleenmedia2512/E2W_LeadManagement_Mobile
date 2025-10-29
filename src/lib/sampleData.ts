import { Lead, User, DSRMetrics, FollowUp } from '@/types';

// Sample Users
export const sampleUsers: User[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh@easy2work.com',
    role: 'Leadership',
    department: 'Sales',
    designation: 'Sales Director',
    phone: '+91 98765 43210',
    avatar: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=3B82F6&color=fff',
    branch: 'Chennai',
    isActive: true,
    lastLogin: '2025-10-29T09:30:00Z'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@easy2work.com',
    role: 'Admin',
    department: 'Sales',
    designation: 'Sales Manager',
    phone: '+91 98765 43211',
    avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=10B981&color=fff',
    branch: 'Chennai',
    isActive: true,
    lastLogin: '2025-10-29T08:45:00Z'
  },
  {
    id: '3',
    name: 'Amit Patel',
    email: 'amit@easy2work.com',
    role: 'CSE',
    department: 'Sales',
    designation: 'Customer Success Executive',
    phone: '+91 98765 43212',
    avatar: 'https://ui-avatars.com/api/?name=Amit+Patel&background=F59E0B&color=fff',
    branch: 'Chennai',
    isActive: true,
    lastLogin: '2025-10-29T10:15:00Z'
  }
];

// Sample Leads
export const sampleLeads: Lead[] = [
  {
    id: 'L001',
    companyName: 'Tech Solutions Pvt Ltd',
    contactPerson: 'Suresh Reddy',
    email: 'suresh@techsolutions.com',
    phone: '+91 99887 76543',
    source: 'IndiaMart',
    status: 'Quote Sent',
    priority: 'Hot',
    assignedTo: '3',
    assignedToName: 'Amit Patel',
    createdAt: '2025-10-25T10:30:00Z',
    updatedAt: '2025-10-28T14:20:00Z',
    nextFollowUp: '2025-10-30T11:00:00Z',
    remarks: 'Interested in ERP solution for 50 users. Quote sent for ₹5L.',
    location: 'Hyderabad',
    budget: 500000,
    requirement: 'Complete ERP solution with CRM integration',
    quoteAmount: 485000,
    leadScore: 85
  },
  {
    id: 'L002',
    companyName: 'Green Energy Corp',
    contactPerson: 'Meera Joshi',
    email: 'meera@greenenergy.com',
    phone: '+91 98765 43219',
    source: 'Meta Ads',
    status: 'In Discussion',
    priority: 'Warm',
    assignedTo: '3',
    assignedToName: 'Amit Patel',
    createdAt: '2025-10-26T15:45:00Z',
    updatedAt: '2025-10-29T09:10:00Z',
    nextFollowUp: '2025-10-30T14:30:00Z',
    remarks: 'Looking for project management tools. Budget discussion pending.',
    location: 'Bangalore',
    budget: 300000,
    requirement: 'Project management and team collaboration tools',
    leadScore: 70
  },
  {
    id: 'L003',
    companyName: 'Retail Plus',
    contactPerson: 'Kiran Gupta',
    email: 'kiran@retailplus.com',
    phone: '+91 97654 32108',
    source: 'JustDial',
    status: 'First Call',
    priority: 'Cold',
    assignedTo: '2',
    assignedToName: 'Priya Sharma',
    createdAt: '2025-10-28T11:20:00Z',
    updatedAt: '2025-10-28T11:20:00Z',
    nextFollowUp: '2025-10-31T10:00:00Z',
    remarks: 'Initial inquiry about inventory management system.',
    location: 'Mumbai',
    requirement: 'Inventory management for retail chain',
    leadScore: 45
  },
  {
    id: 'L004',
    companyName: 'Healthcare Innovations',
    contactPerson: 'Dr. Anita Singh',
    email: 'anita@healthcareinno.com',
    phone: '+91 96543 21087',
    source: 'LinkedIn',
    status: 'Converted',
    priority: 'Hot',
    assignedTo: '3',
    assignedToName: 'Amit Patel',
    createdAt: '2025-10-20T09:15:00Z',
    updatedAt: '2025-10-27T16:45:00Z',
    remarks: 'Successfully converted! Hospital management system implemented.',
    location: 'Delhi',
    budget: 750000,
    requirement: 'Complete hospital management system',
    quoteAmount: 720000,
    leadScore: 95
  }
];

// Sample DSR Metrics
export const sampleDSRMetrics: DSRMetrics = {
  totalCalls: 156,
  totalLeads: 89,
  convertedLeads: 12,
  followUpsDue: 23,
  conversionRate: 13.5,
  avgResponseTime: 2.3
};

// Sample Follow-ups
export const sampleFollowUps: FollowUp[] = [
  {
    id: 'F001',
    leadId: 'L001',
    type: 'Call',
    scheduledAt: '2025-10-30T11:00:00Z',
    status: 'Pending',
    notes: 'Follow up on quote approval',
    createdBy: '3'
  },
  {
    id: 'F002',
    leadId: 'L002',
    type: 'Email',
    scheduledAt: '2025-10-30T14:30:00Z',
    status: 'Pending',
    notes: 'Send detailed proposal',
    createdBy: '3'
  },
  {
    id: 'F003',
    leadId: 'L003',
    type: 'Call',
    scheduledAt: '2025-10-31T10:00:00Z',
    status: 'Pending',
    notes: 'Initial requirement discussion',
    createdBy: '2'
  }
];