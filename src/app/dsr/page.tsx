'use client';

import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  HStack,
  VStack,
  Text,
  Button,
  Select,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputGroup,
  InputLeftElement,
  Tooltip,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  Download,
  Search,
  Calendar,
  TrendingUp,
  Users,
  Phone,
  Target,
  Clock,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  FileSpreadsheet,
  FileText,
  Mail,
} from 'lucide-react';
import { useState } from 'react';
import Layout from '@/components/Layout';
import { sampleLeads, sampleUsers, sampleDSRMetrics } from '@/lib/sampleData';

// Enhanced sample data for DSR
const generateDSRData = () => {
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    return date;
  }).reverse();

  return last7Days.map((date, index) => ({
    date: date.toISOString().split('T')[0],
    displayDate: date.toLocaleDateString(),
    calls: Math.floor(Math.random() * 30) + 10,
    leads: Math.floor(Math.random() * 15) + 5,
    converted: Math.floor(Math.random() * 5) + 1,
    followUps: Math.floor(Math.random() * 8) + 2,
    conversionRate: ((Math.floor(Math.random() * 5) + 1) / (Math.floor(Math.random() * 15) + 5) * 100).toFixed(1),
  }));
};

const dsrData = generateDSRData();

const StatCard = ({ 
  label, 
  value, 
  change, 
  icon: Icon, 
  color = 'brand' 
}: { 
  label: string; 
  value: string | number; 
  change?: { value: number; type: 'increase' | 'decrease' };
  icon: any;
  color?: string;
}) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  
  return (
    <Card bg={cardBg}>
      <CardBody>
        <Stat>
          <HStack justifyContent="space-between">
            <VStack align="flex-start" spacing={1}>
              <StatLabel fontSize="sm" color="gray.500">
                {label}
              </StatLabel>
              <StatNumber fontSize="2xl">
                {value}
              </StatNumber>
              {change && (
                <StatHelpText mb={0}>
                  <StatArrow type={change.type} />
                  {Math.abs(change.value)}%
                </StatHelpText>
              )}
            </VStack>
            <Box
              p={3}
              borderRadius="lg"
              bg={`${color}.100`}
              color={`${color}.600`}
            >
              <Icon size={24} />
            </Box>
          </HStack>
        </Stat>
      </CardBody>
    </Card>
  );
};

const ConversionChart = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  
  return (
    <Card bg={cardBg}>
      <CardHeader>
        <Text fontSize="lg" fontWeight="semibold">
          7-Day Performance Trend
        </Text>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          {dsrData.map((day, index) => (
            <HStack key={day.date} justifyContent="space-between">
              <VStack align="flex-start" spacing={1}>
                <Text fontSize="sm" fontWeight="medium">
                  {day.displayDate}
                </Text>
                <HStack spacing={4} fontSize="xs" color="gray.500">
                  <Text>{day.calls} calls</Text>
                  <Text>{day.leads} leads</Text>
                  <Text>{day.converted} converted</Text>
                </HStack>
              </VStack>
              <VStack align="flex-end" spacing={1}>
                <Text fontSize="sm" fontWeight="semibold">
                  {day.conversionRate}%
                </Text>
                <Progress
                  value={parseFloat(day.conversionRate)}
                  width="100px"
                  size="sm"
                  colorScheme={parseFloat(day.conversionRate) > 15 ? 'green' : parseFloat(day.conversionRate) > 10 ? 'orange' : 'red'}
                  borderRadius="full"
                />
              </VStack>
            </HStack>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
};

const LeadSourceBreakdown = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  
  const sourceStats = sampleLeads.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const total = Object.values(sourceStats).reduce((sum, count) => sum + count, 0);

  const sourceColors = {
    'IndiaMart': 'blue',
    'Meta Ads': 'purple',
    'JustDial': 'green',
    'LinkedIn': 'cyan',
    'Sulekha': 'orange',
    'Referral': 'pink',
    'Web Form': 'teal',
  };

  return (
    <Card bg={cardBg}>
      <CardHeader>
        <Text fontSize="lg" fontWeight="semibold">
          Lead Source Breakdown
        </Text>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          {Object.entries(sourceStats).map(([source, count]) => {
            const percentage = ((count / total) * 100).toFixed(1);
            return (
              <HStack key={source} justifyContent="space-between">
                <HStack>
                  <Badge
                    colorScheme={sourceColors[source as keyof typeof sourceColors]}
                    variant="solid"
                    borderRadius="full"
                    px={2}
                  >
                    {source}
                  </Badge>
                  <Text fontSize="sm">{count} leads</Text>
                </HStack>
                <VStack align="flex-end" spacing={1}>
                  <Text fontSize="sm" fontWeight="semibold">
                    {percentage}%
                  </Text>
                  <Progress
                    value={parseFloat(percentage)}
                    width="80px"
                    size="sm"
                    colorScheme={sourceColors[source as keyof typeof sourceColors]}
                    borderRadius="full"
                  />
                </VStack>
              </HStack>
            );
          })}
        </VStack>
      </CardBody>
    </Card>
  );
};

const TeamPerformance = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  
  const cseUsers = sampleUsers.filter(user => user.role === 'CSE');
  
  return (
    <Card bg={cardBg}>
      <CardHeader>
        <Text fontSize="lg" fontWeight="semibold">
          Team Performance
        </Text>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          {cseUsers.map((user) => {
            const userLeads = sampleLeads.filter(lead => lead.assignedTo === user.id);
            const convertedLeads = userLeads.filter(lead => lead.status === 'Converted');
            const conversionRate = userLeads.length > 0 ? (convertedLeads.length / userLeads.length * 100).toFixed(1) : '0';
            
            return (
              <HStack key={user.id} justifyContent="space-between" p={3} borderRadius="md" bg="gray.50">
                <HStack>
                  <Avatar size="sm" name={user.name} src={user.avatar} />
                  <VStack align="flex-start" spacing={0}>
                    <Text fontSize="sm" fontWeight="medium">
                      {user.name}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {userLeads.length} leads assigned
                    </Text>
                  </VStack>
                </HStack>
                <VStack align="flex-end" spacing={1}>
                  <Text fontSize="sm" fontWeight="semibold">
                    {conversionRate}%
                  </Text>
                  <Progress
                    value={parseFloat(conversionRate)}
                    width="80px"
                    size="sm"
                    colorScheme={parseFloat(conversionRate) > 15 ? 'green' : parseFloat(conversionRate) > 10 ? 'orange' : 'red'}
                    borderRadius="full"
                  />
                </VStack>
              </HStack>
            );
          })}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default function DSRPage() {
  const [dateRange, setDateRange] = useState('7d');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCSE, setSelectedCSE] = useState('');
  
  const cardBg = useColorModeValue('white', 'gray.800');

  const filteredLeads = sampleLeads.filter(lead => {
    const matchesSearch = !searchQuery || 
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCSE = !selectedCSE || lead.assignedTo === selectedCSE;
    
    return matchesSearch && matchesCSE;
  });

  return (
    <Layout>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              Daily Status Report (DSR)
            </Text>
            <Text color="gray.600">
              Track team performance and lead progress
            </Text>
          </Box>
          <HStack spacing={3}>
            <Select value={dateRange} onChange={(e) => setDateRange(e.target.value)} width="120px">
              <option value="1d">Today</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
              <option value="90d">90 Days</option>
            </Select>
            <Menu>
              <MenuButton
                as={Button}
                leftIcon={<Download size={16} />}
                variant="outline"
              >
                Export
              </MenuButton>
              <MenuList>
                <MenuItem icon={<FileSpreadsheet size={16} />}>
                  Export to Excel
                </MenuItem>
                <MenuItem icon={<FileText size={16} />}>
                  Export to PDF
                </MenuItem>
                <MenuItem icon={<Mail size={16} />}>
                  Email Report
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>

        {/* KPI Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          <StatCard
            label="Total Calls"
            value={sampleDSRMetrics.totalCalls}
            change={{ value: 12, type: 'increase' }}
            icon={Phone}
            color="brand"
          />
          <StatCard
            label="Total Leads"
            value={sampleDSRMetrics.totalLeads}
            change={{ value: 8, type: 'increase' }}
            icon={Users}
            color="success"
          />
          <StatCard
            label="Converted"
            value={sampleDSRMetrics.convertedLeads}
            change={{ value: 15, type: 'increase' }}
            icon={Target}
            color="warning"
          />
          <StatCard
            label="Conversion Rate"
            value={`${sampleDSRMetrics.conversionRate}%`}
            change={{ value: 3, type: 'increase' }}
            icon={TrendingUp}
            color="purple"
          />
        </SimpleGrid>

        {/* Charts and Analytics */}
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
          <ConversionChart />
          <VStack spacing={6} align="stretch">
            <LeadSourceBreakdown />
            <TeamPerformance />
          </VStack>
        </Grid>

        {/* Detailed Table */}
        <Card bg={cardBg}>
          <CardHeader>
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="lg" fontWeight="semibold">
                Detailed Lead Report
              </Text>
              <HStack spacing={3}>
                <InputGroup width="250px">
                  <InputLeftElement>
                    <Search size={16} />
                  </InputLeftElement>
                  <Input
                    placeholder="Search leads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    size="sm"
                  />
                </InputGroup>
                <Select
                  placeholder="All CSEs"
                  value={selectedCSE}
                  onChange={(e) => setSelectedCSE(e.target.value)}
                  width="150px"
                  size="sm"
                >
                  {sampleUsers.filter(user => user.role === 'CSE').map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Select>
              </HStack>
            </Flex>
          </CardHeader>
          <CardBody>
            <Box overflowX="auto">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Lead ID</Th>
                    <Th>Company</Th>
                    <Th>Contact</Th>
                    <Th>Source</Th>
                    <Th>Status</Th>
                    <Th>Assigned To</Th>
                    <Th>Created</Th>
                    <Th>Score</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredLeads.slice(0, 10).map((lead) => (
                    <Tr key={lead.id}>
                      <Td fontFamily="mono" fontSize="sm">
                        {lead.id}
                      </Td>
                      <Td>
                        <VStack align="flex-start" spacing={0}>
                          <Text fontSize="sm" fontWeight="medium">
                            {lead.companyName}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {lead.location}
                          </Text>
                        </VStack>
                      </Td>
                      <Td>
                        <VStack align="flex-start" spacing={0}>
                          <Text fontSize="sm">{lead.contactPerson}</Text>
                          <Text fontSize="xs" color="gray.500">
                            {lead.phone}
                          </Text>
                        </VStack>
                      </Td>
                      <Td>
                        <Badge size="sm" variant="outline">
                          {lead.source}
                        </Badge>
                      </Td>
                      <Td>
                        <Badge
                          size="sm"
                          colorScheme={
                            lead.status === 'Converted' ? 'green' :
                            lead.status === 'Quote Sent' ? 'blue' :
                            lead.status === 'In Discussion' ? 'orange' :
                            lead.status === 'Lost' ? 'red' : 'gray'
                          }
                        >
                          {lead.status}
                        </Badge>
                      </Td>
                      <Td>
                        <HStack>
                          <Avatar size="xs" name={lead.assignedToName} />
                          <Text fontSize="sm">{lead.assignedToName}</Text>
                        </HStack>
                      </Td>
                      <Td fontSize="sm">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </Td>
                      <Td>
                        <HStack>
                          <Text fontSize="sm" fontWeight="semibold">
                            {lead.leadScore}
                          </Text>
                          <Progress
                            value={lead.leadScore}
                            width="40px"
                            size="sm"
                            colorScheme={lead.leadScore > 70 ? 'green' : lead.leadScore > 40 ? 'orange' : 'red'}
                            borderRadius="full"
                          />
                        </HStack>
                      </Td>
                      <Td>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<MoreVertical size={14} />}
                            size="sm"
                            variant="ghost"
                          />
                          <MenuList>
                            <MenuItem icon={<Eye size={14} />}>
                              View Details
                            </MenuItem>
                            <MenuItem icon={<Edit size={14} />}>
                              Edit Lead
                            </MenuItem>
                            <MenuItem icon={<Phone size={14} />}>
                              Call
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            
            {filteredLeads.length > 10 && (
              <HStack justifyContent="center" mt={4}>
                <Text fontSize="sm" color="gray.500">
                  Showing 10 of {filteredLeads.length} leads
                </Text>
                <Button size="sm" variant="outline">
                  Load More
                </Button>
              </HStack>
            )}
          </CardBody>
        </Card>
      </VStack>
    </Layout>
  );
}