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
import { useBreakpointValue } from '@chakra-ui/react';
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
  const iconSize = useBreakpointValue({ base: 18, md: 22 });
  
  return (
    <Card bg={cardBg} h="fit-content">
      <CardBody p={{ base: 4, md: 6 }}>
        <Stat>
          <Flex 
            direction={{ base: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ base: 'flex-start', sm: 'center' }}
            gap={{ base: 3, sm: 0 }}
          >
            <VStack align="flex-start" spacing={1} flex={1} minW={0}>
              <StatLabel fontSize={{ base: 'xs', md: 'sm' }} color="gray.500" isTruncated width="100%">
                {label}
              </StatLabel>
              <StatNumber fontSize={{ base: 'xl', md: '2xl' }}>
                {value}
              </StatNumber>
              {change && (
                <StatHelpText mb={0}>
                  <StatArrow type={change.type} />
                  <Text fontSize={{ base: 'xs', md: 'sm' }} display="inline">
                    {Math.abs(change.value)}%
                  </Text>
                </StatHelpText>
              )}
            </VStack>
            <Box
              p={{ base: 2, md: 3 }}
              borderRadius="lg"
              bg={`${color}.100`}
              color={`${color}.600`}
              flexShrink={0}
            >
              <Icon size={iconSize} />
            </Box>
          </Flex>
        </Stat>
      </CardBody>
    </Card>
  );
};

const ConversionChart = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  
  return (
    <Card bg={cardBg}>
      <CardHeader p={{ base: 4, md: 6 }}>
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="semibold">
          7-Day Performance Trend
        </Text>
      </CardHeader>
      <CardBody p={{ base: 4, md: 6 }}>
        <VStack spacing={{ base: 3, md: 4 }} align="stretch">
          {dsrData.map((day, index) => (
            <Flex 
              key={day.date} 
              direction={{ base: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ base: 'flex-start', sm: 'center' }}
              gap={{ base: 2, sm: 0 }}
              p={{ base: 2, md: 0 }}
              borderRadius={{ base: 'md', md: 'none' }}
              bg={{ base: 'gray.50', md: 'transparent' }}
            >
              <VStack align="flex-start" spacing={1} flex={1}>
                <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium">
                  {day.displayDate}
                </Text>
                <Flex 
                  direction={{ base: 'column', sm: 'row' }}
                  gap={{ base: 1, sm: 4 }} 
                  fontSize="2xs" 
                  color="gray.500"
                >
                  <Text>{day.calls} calls</Text>
                  <Text>{day.leads} leads</Text>
                  <Text>{day.converted} converted</Text>
                </Flex>
              </VStack>
              <VStack align={{ base: 'flex-start', sm: 'flex-end' }} spacing={1}>
                <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="semibold">
                  {day.conversionRate}%
                </Text>
                <Progress
                  value={parseFloat(day.conversionRate)}
                  width={{ base: '80px', md: '100px' }}
                  size="sm"
                  colorScheme={parseFloat(day.conversionRate) > 15 ? 'green' : parseFloat(day.conversionRate) > 10 ? 'orange' : 'red'}
                  borderRadius="full"
                />
              </VStack>
            </Flex>
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
      <CardHeader p={{ base: 4, md: 6 }}>
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="semibold">
          Lead Source Breakdown
        </Text>
      </CardHeader>
      <CardBody p={{ base: 4, md: 6 }}>
        <VStack spacing={{ base: 3, md: 4 }} align="stretch">
          {Object.entries(sourceStats).map(([source, count]) => {
            const percentage = ((count / total) * 100).toFixed(1);
            return (
              <Flex 
                key={source} 
                direction={{ base: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ base: 'flex-start', sm: 'center' }}
                gap={{ base: 2, sm: 0 }}
              >
                <HStack spacing={2} flex={1}>
                  <Badge
                    colorScheme={sourceColors[source as keyof typeof sourceColors]}
                    variant="solid"
                    borderRadius="full"
                    px={2}
                    size="sm"
                  >
                    {source}
                  </Badge>
                  <Text fontSize={{ base: 'xs', md: 'sm' }}>{count} leads</Text>
                </HStack>
                <VStack align={{ base: 'flex-start', sm: 'flex-end' }} spacing={1}>
                  <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="semibold">
                    {percentage}%
                  </Text>
                  <Progress
                    value={parseFloat(percentage)}
                    width={{ base: '60px', md: '80px' }}
                    size="sm"
                    colorScheme={sourceColors[source as keyof typeof sourceColors]}
                    borderRadius="full"
                  />
                </VStack>
              </Flex>
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
      <CardHeader p={{ base: 4, md: 6 }}>
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="semibold">
          Team Performance
        </Text>
      </CardHeader>
      <CardBody p={{ base: 4, md: 6 }}>
        <VStack spacing={{ base: 3, md: 4 }} align="stretch">
          {cseUsers.map((user) => {
            const userLeads = sampleLeads.filter(lead => lead.assignedTo === user.id);
            const convertedLeads = userLeads.filter(lead => lead.status === 'Converted');
            const conversionRate = userLeads.length > 0 ? (convertedLeads.length / userLeads.length * 100).toFixed(1) : '0';
            
            return (
              <Flex 
                key={user.id} 
                direction={{ base: 'column', sm: 'row' }}
                justifyContent="space-between" 
                alignItems={{ base: 'flex-start', sm: 'center' }}
                p={{ base: 3, md: 3 }} 
                borderRadius="md" 
                bg="gray.50"
                gap={{ base: 2, sm: 0 }}
              >
                <HStack spacing={3}>
                  <Avatar size={{ base: 'sm', md: 'sm' }} name={user.name} src={user.avatar} />
                  <VStack align="flex-start" spacing={0}>
                    <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium">
                      {user.name}
                    </Text>
                    <Text fontSize="2xs" color="gray.500">
                      {userLeads.length} leads assigned
                    </Text>
                  </VStack>
                </HStack>
                <VStack align={{ base: 'flex-start', sm: 'flex-end' }} spacing={1}>
                  <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="semibold">
                    {conversionRate}%
                  </Text>
                  <Progress
                    value={parseFloat(conversionRate)}
                    width={{ base: '60px', md: '80px' }}
                    size="sm"
                    colorScheme={parseFloat(conversionRate) > 15 ? 'green' : parseFloat(conversionRate) > 10 ? 'orange' : 'red'}
                    borderRadius="full"
                  />
                </VStack>
              </Flex>
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
        <Flex 
          direction={{ base: 'column', md: 'row' }}
          justifyContent="space-between" 
          alignItems={{ base: 'flex-start', md: 'center' }}
          gap={{ base: 4, md: 0 }}
        >
          <Box>
            <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold">
              Daily Status Report (DSR)
            </Text>
            <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>
              Track team performance and lead progress
            </Text>
          </Box>
          <Flex 
            direction={{ base: 'column', sm: 'row' }}
            gap={3}
            width={{ base: '100%', md: 'auto' }}
          >
            <Select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)} 
              width={{ base: '100%', sm: '120px' }}
              size={{ base: 'md', md: 'md' }}
            >
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
                width={{ base: '100%', sm: 'auto' }}
                size={{ base: 'md', md: 'md' }}
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
          </Flex>
        </Flex>

        {/* KPI Cards */}
        <SimpleGrid columns={{ base: 2, md: 2, lg: 4 }} spacing={{ base: 3, md: 6 }}>
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
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={{ base: 4, md: 6 }}>
          <ConversionChart />
          <VStack spacing={6} align="stretch">
            <LeadSourceBreakdown />
            <TeamPerformance />
          </VStack>
        </Grid>

        {/* Detailed Table */}
        <Card bg={cardBg}>
          <CardHeader p={{ base: 4, md: 6 }}>
            <Flex 
              direction={{ base: 'column', md: 'row' }}
              justifyContent="space-between" 
              alignItems={{ base: 'flex-start', md: 'center' }}
              gap={{ base: 4, md: 0 }}
            >
              <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="semibold">
                Detailed Lead Report
              </Text>
              <Flex 
                direction={{ base: 'column', sm: 'row' }}
                gap={3}
                width={{ base: '100%', md: 'auto' }}
              >
                <InputGroup width={{ base: '100%', md: '250px' }}>
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
                  width={{ base: '100%', md: '150px' }}
                  size="sm"
                >
                  {sampleUsers.filter(user => user.role === 'CSE').map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody p={{ base: 4, md: 6 }}>
            {/* Mobile Card View */}
            <Box display={{ base: 'block', lg: 'none' }}>
              <VStack spacing={4} align="stretch">
                {filteredLeads.slice(0, 10).map((lead) => (
                  <Card key={lead.id} size="sm" variant="outline">
                    <CardBody p={4}>
                      <VStack spacing={3} align="stretch">
                        <Flex justifyContent="space-between" alignItems="flex-start">
                          <VStack align="flex-start" spacing={1} flex={1} minW={0}>
                            <HStack spacing={2}>
                              <Text fontSize="sm" fontWeight="bold" isTruncated>
                                {lead.companyName}
                              </Text>
                              <Text fontSize="xs" color="gray.500" fontFamily="mono">
                                {lead.id}
                              </Text>
                            </HStack>
                            <Text fontSize="xs" color="gray.600" isTruncated>
                              {lead.contactPerson} • {lead.phone}
                            </Text>
                          </VStack>
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              icon={<MoreVertical size={14} />}
                              size="sm"
                              variant="ghost"
                            />
                            <MenuList>
                              <MenuItem icon={<Eye size={14} />}>View Details</MenuItem>
                              <MenuItem icon={<Edit size={14} />}>Edit Lead</MenuItem>
                              <MenuItem icon={<Phone size={14} />}>Call</MenuItem>
                            </MenuList>
                          </Menu>
                        </Flex>
                        
                        <Flex justifyContent="space-between" alignItems="center">
                          <HStack spacing={2}>
                            <Badge size="sm" variant="outline">{lead.source}</Badge>
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
                          </HStack>
                          <HStack spacing={1}>
                            <Text fontSize="xs" fontWeight="semibold">{lead.leadScore}</Text>
                            <Progress
                              value={lead.leadScore}
                              width="30px"
                              size="sm"
                              colorScheme={lead.leadScore > 70 ? 'green' : lead.leadScore > 40 ? 'orange' : 'red'}
                              borderRadius="full"
                            />
                          </HStack>
                        </Flex>
                        
                        <Flex justifyContent="space-between" alignItems="center">
                          <HStack spacing={2}>
                            <Avatar size="xs" name={lead.assignedToName} />
                            <Text fontSize="xs">{lead.assignedToName}</Text>
                          </HStack>
                          <Text fontSize="xs" color="gray.500">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </Text>
                        </Flex>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </VStack>
            </Box>

            {/* Desktop Table View */}
            <Box display={{ base: 'none', lg: 'block' }} overflowX="auto">
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