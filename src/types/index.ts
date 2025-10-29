export interface Lead {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  source: 'Meta Ads' | 'IndiaMart' | 'JustDial' | 'Sulekha' | 'LinkedIn' | 'Referral' | 'Web Form';
  status: 'New' | 'First Call' | 'In Discussion' | 'Quote Sent' | 'Converted' | 'Lost' | 'Unreachable' | 'Unqualified';
  priority: 'Hot' | 'Warm' | 'Cold';
  assignedTo: string;
  assignedToName: string;
  createdAt: string;
  updatedAt: string;
  nextFollowUp?: string;
  remarks: string;
  location: string;
  budget?: number;
  requirement: string;
  quoteAmount?: number;
  leadScore: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Leadership' | 'Admin' | 'CSE' | 'Finance' | 'Queue Display';
  department: string;
  designation: string;
  phone: string;
  avatar?: string;
  branch: string;
  isActive: boolean;
  lastLogin: string;
}

export interface DSRMetrics {
  totalCalls: number;
  totalLeads: number;
  convertedLeads: number;
  followUpsDue: number;
  conversionRate: number;
  avgResponseTime: number;
}

export interface FollowUp {
  id: string;
  leadId: string;
  type: 'Call' | 'Visit' | 'Email' | 'Message';
  scheduledAt: string;
  completedAt?: string;
  status: 'Pending' | 'Completed' | 'Missed';
  notes: string;
  createdBy: string;
}