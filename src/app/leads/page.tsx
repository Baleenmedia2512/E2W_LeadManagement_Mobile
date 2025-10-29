'use client';

import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  HStack,
  VStack,
  Text,
  Input,
  Select,
  Badge,
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  Divider,
  Progress,
  Tooltip,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Tag,
  TagLabel,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import {
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  MessageSquare,
  Download,
  MoreVertical,
  Eye,
  Edit,
  Calendar,
  MapPin,
  Building,
  User,
  Clock,
  TrendingUp,
  FileText,
} from 'lucide-react';
import { useState } from 'react';
import Layout from '@/components/Layout';
import AddLeadModal from '@/components/ui/AddLeadModal';
import { sampleLeads, sampleUsers } from '@/lib/sampleData';
import { Lead } from '@/types';

const StatusColors = {
  'New': 'blue',
  'First Call': 'purple',
  'In Discussion': 'orange',
  'Quote Sent': 'yellow',
  'Converted': 'green',
  'Lost': 'red',
  'Unreachable': 'gray',
  'Unqualified': 'red',
};

const PriorityColors = {
  'Hot': 'red',
  'Warm': 'orange',
  'Cold': 'blue',
};

const LeadCard = ({ lead, onViewDetails, onEdit }: { 
  lead: Lead; 
  onViewDetails: (lead: Lead) => void;
  onEdit: (lead: Lead) => void;
}) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Card bg={cardBg} borderColor={borderColor} borderWidth="1px">
      <CardBody>
        <VStack align="stretch" spacing={4}>
          {/* Header */}
          <Flex justifyContent="space-between" alignItems="flex-start">
            <VStack align="flex-start" spacing={1}>
              <HStack>
                <Text fontWeight="bold" fontSize="lg">
                  {lead.companyName}
                </Text>
                <Badge colorScheme={PriorityColors[lead.priority]} size="sm">
                  {lead.priority}
                </Badge>
              </HStack>
              <HStack color="gray.600" fontSize="sm">
                <User size={14} />
                <Text>{lead.contactPerson}</Text>
              </HStack>
            </VStack>
            
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<MoreVertical size={16} />}
                size="sm"
                variant="ghost"
              />
              <MenuList>
                <MenuItem icon={<Eye size={16} />} onClick={() => onViewDetails(lead)}>
                  View Details
                </MenuItem>
                <MenuItem icon={<Edit size={16} />} onClick={() => onEdit(lead)}>
                  Edit Lead
                </MenuItem>
                <MenuItem icon={<Phone size={16} />}>
                  Call
                </MenuItem>
                <MenuItem icon={<Mail size={16} />}>
                  Send Email
                </MenuItem>
                <MenuItem icon={<MessageSquare size={16} />}>
                  WhatsApp
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>

          {/* Status and Score */}
          <HStack justifyContent="space-between">
            <Badge colorScheme={StatusColors[lead.status] as any} px={3} py={1} borderRadius="full">
              {lead.status}
            </Badge>
            <HStack>
              <Text fontSize="sm" color="gray.500">Score:</Text>
              <Text fontSize="sm" fontWeight="semibold">
                {lead.leadScore}/100
              </Text>
              <Progress
                value={lead.leadScore}
                size="sm"
                width="50px"
                colorScheme={lead.leadScore > 70 ? 'green' : lead.leadScore > 40 ? 'orange' : 'red'}
                borderRadius="full"
              />
            </HStack>
          </HStack>

          {/* Contact Info */}
          <VStack align="stretch" spacing={2}>
            <HStack fontSize="sm" color="gray.600">
              <Phone size={14} />
              <Text>{lead.phone}</Text>
            </HStack>
            <HStack fontSize="sm" color="gray.600">
              <Mail size={14} />
              <Text>{lead.email}</Text>
            </HStack>
            <HStack fontSize="sm" color="gray.600">
              <MapPin size={14} />
              <Text>{lead.location}</Text>
            </HStack>
          </VStack>

          {/* Assignment and Source */}
          <HStack justifyContent="space-between" fontSize="sm">
            <HStack>
              <Avatar size="xs" name={lead.assignedToName} />
              <Text color="gray.600">{lead.assignedToName}</Text>
            </HStack>
            <Tag size="sm" variant="outline">
              <TagLabel>{lead.source}</TagLabel>
            </Tag>
          </HStack>

          {/* Next Follow-up */}
          {lead.nextFollowUp && (
            <HStack
              p={2}
              bg="blue.50"
              borderRadius="md"
              fontSize="sm"
              color="blue.700"
            >
              <Calendar size={14} />
              <Text>
                Next follow-up: {new Date(lead.nextFollowUp).toLocaleDateString()} at{' '}
                {new Date(lead.nextFollowUp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </HStack>
          )}

          {/* Action Buttons */}
          <HStack spacing={2}>
            <Button size="sm" leftIcon={<Phone size={14} />} colorScheme="green" flex={1}>
              Call
            </Button>
            <Button size="sm" leftIcon={<Mail size={14} />} variant="outline" flex={1}>
              Email
            </Button>
            <IconButton
              size="sm"
              icon={<MessageSquare size={14} />}
              colorScheme="whatsapp"
              aria-label="WhatsApp"
            />
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

const LeadDetailsModal = ({ 
  lead, 
  isOpen, 
  onClose 
}: { 
  lead: Lead | null; 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  if (!lead) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Text>{lead.companyName}</Text>
            <Badge colorScheme={StatusColors[lead.status] as any}>
              {lead.status}
            </Badge>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack align="stretch" spacing={6}>
            {/* Basic Info */}
            <Box>
              <Text fontWeight="semibold" mb={3}>Company Information</Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <VStack align="flex-start" spacing={2}>
                  <HStack>
                    <Building size={16} />
                    <Text fontSize="sm" color="gray.600">Company:</Text>
                    <Text fontSize="sm" fontWeight="medium">{lead.companyName}</Text>
                  </HStack>
                  <HStack>
                    <User size={16} />
                    <Text fontSize="sm" color="gray.600">Contact:</Text>
                    <Text fontSize="sm" fontWeight="medium">{lead.contactPerson}</Text>
                  </HStack>
                  <HStack>
                    <Phone size={16} />
                    <Text fontSize="sm" color="gray.600">Phone:</Text>
                    <Text fontSize="sm" fontWeight="medium">{lead.phone}</Text>
                  </HStack>
                </VStack>
                <VStack align="flex-start" spacing={2}>
                  <HStack>
                    <Mail size={16} />
                    <Text fontSize="sm" color="gray.600">Email:</Text>
                    <Text fontSize="sm" fontWeight="medium">{lead.email}</Text>
                  </HStack>
                  <HStack>
                    <MapPin size={16} />
                    <Text fontSize="sm" color="gray.600">Location:</Text>
                    <Text fontSize="sm" fontWeight="medium">{lead.location}</Text>
                  </HStack>
                  <HStack>
                    <TrendingUp size={16} />
                    <Text fontSize="sm" color="gray.600">Source:</Text>
                    <Text fontSize="sm" fontWeight="medium">{lead.source}</Text>
                  </HStack>
                </VStack>
              </Grid>
            </Box>

            <Divider />

            {/* Lead Details */}
            <Box>
              <Text fontWeight="semibold" mb={3}>Lead Details</Text>
              <VStack align="stretch" spacing={3}>
                <Box>
                  <Text fontSize="sm" color="gray.600" mb={1}>Requirement:</Text>
                  <Text fontSize="sm">{lead.requirement}</Text>
                </Box>
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={1}>Priority:</Text>
                    <Badge colorScheme={PriorityColors[lead.priority]}>{lead.priority}</Badge>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={1}>Lead Score:</Text>
                    <HStack>
                      <Text fontSize="sm" fontWeight="semibold">{lead.leadScore}/100</Text>
                      <Progress
                        value={lead.leadScore}
                        size="sm"
                        width="60px"
                        colorScheme={lead.leadScore > 70 ? 'green' : lead.leadScore > 40 ? 'orange' : 'red'}
                        borderRadius="full"
                      />
                    </HStack>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={1}>Budget:</Text>
                    <Text fontSize="sm" fontWeight="semibold">
                      {lead.budget ? `₹${lead.budget.toLocaleString()}` : 'Not specified'}
                    </Text>
                  </Box>
                </Grid>
              </VStack>
            </Box>

            <Divider />

            {/* Assignment */}
            <Box>
              <Text fontWeight="semibold" mb={3}>Assignment</Text>
              <HStack>
                <Avatar size="sm" name={lead.assignedToName} />
                <VStack align="flex-start" spacing={0}>
                  <Text fontSize="sm" fontWeight="medium">{lead.assignedToName}</Text>
                  <Text fontSize="xs" color="gray.500">Customer Success Executive</Text>
                </VStack>
              </HStack>
            </Box>

            {/* Remarks */}
            {lead.remarks && (
              <>
                <Divider />
                <Box>
                  <Text fontWeight="semibold" mb={2}>Recent Notes</Text>
                  <Text fontSize="sm" color="gray.600">
                    {lead.remarks}
                  </Text>
                </Box>
              </>
            )}

            {/* Timeline */}
            <Divider />
            <Box>
              <Text fontWeight="semibold" mb={3}>Timeline</Text>
              <VStack align="stretch" spacing={2}>
                <HStack fontSize="sm">
                  <Clock size={14} />
                  <Text color="gray.600">Created:</Text>
                  <Text>{new Date(lead.createdAt).toLocaleString()}</Text>
                </HStack>
                <HStack fontSize="sm">
                  <Clock size={14} />
                  <Text color="gray.600">Last Updated:</Text>
                  <Text>{new Date(lead.updatedAt).toLocaleString()}</Text>
                </HStack>
                {lead.nextFollowUp && (
                  <HStack fontSize="sm">
                    <Calendar size={14} />
                    <Text color="gray.600">Next Follow-up:</Text>
                    <Text color="blue.600" fontWeight="medium">
                      {new Date(lead.nextFollowUp).toLocaleString()}
                    </Text>
                  </HStack>
                )}
              </VStack>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default function LeadsPage() {
  const [leads, setLeads] = useState(sampleLeads);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = !searchQuery || 
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !statusFilter || lead.status === statusFilter;
    const matchesSource = !sourceFilter || lead.source === sourceFilter;
    const matchesPriority = !priorityFilter || lead.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesSource && matchesPriority;
  });

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead);
    onDetailsOpen();
  };

  const handleEditLead = (lead: Lead) => {
    // In a real app, this would open an edit modal
    console.log('Edit lead:', lead);
  };

  const handleAddLead = (newLeadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'leadScore'>) => {
    const newLead: Lead = {
      ...newLeadData,
      id: `L${String(leads.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      leadScore: Math.floor(Math.random() * 40) + 50, // Random score between 50-90
      nextFollowUp: newLeadData.nextFollowUp || undefined,
    };
    setLeads([...leads, newLead]);
  };

  // Get unique values for filters
  const statuses = [...new Set(sampleLeads.map(lead => lead.status))];
  const sources = [...new Set(sampleLeads.map(lead => lead.source))];
  const priorities = [...new Set(sampleLeads.map(lead => lead.priority))];

  return (
    <Layout>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              Lead Management
            </Text>
            <Text color="gray.600">
              Manage and track your sales leads
            </Text>
          </Box>
          <Button leftIcon={<Plus size={20} />} colorScheme="brand" onClick={onAddOpen}>
            Add New Lead
          </Button>
        </Flex>

        {/* Filters */}
        <Card>
          <CardBody>
            <VStack spacing={4}>
              <HStack width="100%" spacing={4}>
                <InputGroup flex={2}>
                  <InputLeftElement>
                    <Search size={20} color="gray" />
                  </InputLeftElement>
                  <Input
                    placeholder="Search leads by company, contact, phone, or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </InputGroup>

                <Select
                  placeholder="All Statuses"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  width="200px"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Select>

                <Select
                  placeholder="All Sources"
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  width="200px"
                >
                  {sources.map(source => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </Select>

                <Select
                  placeholder="All Priorities"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  width="200px"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </Select>
              </HStack>

              {/* Filter Tags */}
              <HStack width="100%" justifyContent="space-between">
                <Wrap>
                  {(searchQuery || statusFilter || sourceFilter || priorityFilter) && (
                    <WrapItem>
                      <Text fontSize="sm" color="gray.600">
                        Active filters:
                      </Text>
                    </WrapItem>
                  )}
                  {searchQuery && (
                    <WrapItem>
                      <Tag size="sm" colorScheme="blue">
                        <TagLabel>Search: {searchQuery}</TagLabel>
                      </Tag>
                    </WrapItem>
                  )}
                  {statusFilter && (
                    <WrapItem>
                      <Tag size="sm" colorScheme="green">
                        <TagLabel>Status: {statusFilter}</TagLabel>
                      </Tag>
                    </WrapItem>
                  )}
                  {sourceFilter && (
                    <WrapItem>
                      <Tag size="sm" colorScheme="purple">
                        <TagLabel>Source: {sourceFilter}</TagLabel>
                      </Tag>
                    </WrapItem>
                  )}
                  {priorityFilter && (
                    <WrapItem>
                      <Tag size="sm" colorScheme="orange">
                        <TagLabel>Priority: {priorityFilter}</TagLabel>
                      </Tag>
                    </WrapItem>
                  )}
                </Wrap>

                <Text fontSize="sm" color="gray.600">
                  {filteredLeads.length} of {leads.length} leads
                </Text>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Leads Grid */}
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)',
          }}
          gap={6}
        >
          {filteredLeads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onViewDetails={handleViewDetails}
              onEdit={handleEditLead}
            />
          ))}
        </Grid>

        {/* Empty State */}
        {filteredLeads.length === 0 && (
          <Card>
            <CardBody>
              <VStack spacing={4} py={8}>
                <Text fontSize="lg" color="gray.500">
                  No leads found
                </Text>
                <Text fontSize="sm" color="gray.400" textAlign="center">
                  {searchQuery || statusFilter || sourceFilter || priorityFilter
                    ? 'Try adjusting your filters to see more results.'
                    : 'Start by adding your first lead to get started.'}
                </Text>
                {!(searchQuery || statusFilter || sourceFilter || priorityFilter) && (
                  <Button leftIcon={<Plus size={20} />} colorScheme="brand" onClick={onAddOpen}>
                    Add Your First Lead
                  </Button>
                )}
              </VStack>
            </CardBody>
          </Card>
        )}
      </VStack>

      {/* Lead Details Modal */}
      <LeadDetailsModal
        lead={selectedLead}
        isOpen={isDetailsOpen}
        onClose={onDetailsClose}
      />

      {/* Add Lead Modal */}
      <AddLeadModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        onAddLead={handleAddLead}
      />
    </Layout>
  );
}