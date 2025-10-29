'use client';

import {
  Box,
  Grid,
  GridItem,

  Text,
  VStack,
  HStack,
  Progress,
  Badge,
  Card,
  CardBody,
  useColorModeValue,
  Flex,
  Icon,
  Avatar,
  AvatarGroup,
} from '@chakra-ui/react';
import {
  TrendingUp,
  Users,
  Phone,
  Target,
  Calendar,
  Award,
  Clock,
  CheckCircle,
} from 'lucide-react';
import Layout from '@/components/Layout';
import AnimatedStatCard from '@/components/ui/AnimatedStatCard';
import { sampleDSRMetrics, sampleLeads, sampleUsers } from '@/lib/sampleData';



export default function HomePage() {
  const cardBg = useColorModeValue('white', 'gray.800');
  
  // Calculate some quick stats
  const todaysLeads = sampleLeads.filter(lead => 
    new Date(lead.createdAt).toDateString() === new Date().toDateString()
  ).length;
  
  const hotLeads = sampleLeads.filter(lead => lead.priority === 'Hot').length;
  const followUpsDue = sampleLeads.filter(lead => 
    lead.nextFollowUp && new Date(lead.nextFollowUp) <= new Date()
  ).length;

  return (
    <Layout>
      <VStack spacing={6} align="stretch">
        {/* Welcome Section */}
        <Box>
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            Good morning, Amit! 👋
          </Text>
          <Text color="gray.600">
            Here's what's happening with your leads today.
          </Text>
        </Box>

        {/* KPI Cards */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
          <AnimatedStatCard
            label="Total Calls Today"
            value={sampleDSRMetrics.totalCalls}
            change={{ value: 12, type: 'increase' }}
            icon={Phone}
            color="brand"
            delay={0}
          />
          <AnimatedStatCard
            label="Total Leads"
            value={sampleDSRMetrics.totalLeads}
            change={{ value: 8, type: 'increase' }}
            icon={Users}
            color="success"
            delay={0.1}
          />
          <AnimatedStatCard
            label="Converted Leads"
            value={sampleDSRMetrics.convertedLeads}
            change={{ value: 5, type: 'increase' }}
            icon={Target}
            color="warning"
            delay={0.2}
          />
          <AnimatedStatCard
            label="Follow-ups Due"
            value={followUpsDue}
            change={{ value: 0, type: 'neutral' }}
            icon={Calendar}
            color="error"
            delay={0.3}
          />
        </Grid>

        {/* Secondary Stats */}
        <Grid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap={6}>
          <Card bg={cardBg}>
            <CardBody>
              <VStack align="stretch" spacing={4}>
                <HStack justifyContent="space-between">
                  <Text fontWeight="semibold">Conversion Rate</Text>
                  <Badge colorScheme="green" borderRadius="full">
                    {sampleDSRMetrics.conversionRate}%
                  </Badge>
                </HStack>
                <Progress
                  value={sampleDSRMetrics.conversionRate}
                  colorScheme="green"
                  borderRadius="full"
                  size="lg"
                />
                <Text fontSize="sm" color="gray.500">
                  Target: 15% • Current: {sampleDSRMetrics.conversionRate}%
                </Text>
              </VStack>
            </CardBody>
          </Card>

          <Card bg={cardBg}>
            <CardBody>
              <VStack align="stretch" spacing={4}>
                <HStack justifyContent="space-between">
                  <Text fontWeight="semibold">Response Time</Text>
                  <Badge colorScheme="blue" borderRadius="full">
                    {sampleDSRMetrics.avgResponseTime}h avg
                  </Badge>
                </HStack>
                <HStack>
                  <Icon as={Clock} color="blue.500" />
                  <Text fontSize="sm">
                    Average response time to new leads
                  </Text>
                </HStack>
                <Text fontSize="sm" color="gray.500">
                  Target: &lt;2h • Current: {sampleDSRMetrics.avgResponseTime}h
                </Text>
              </VStack>
            </CardBody>
          </Card>

          <Card bg={cardBg}>
            <CardBody>
              <VStack align="stretch" spacing={4}>
                <HStack justifyContent="space-between">
                  <Text fontWeight="semibold">Team Performance</Text>
                  <Icon as={Award} color="orange.500" />
                </HStack>
                <AvatarGroup size="sm" max={3}>
                  {sampleUsers.filter(user => user.role === 'CSE').map(user => (
                    <Avatar key={user.id} name={user.name} src={user.avatar} />
                  ))}
                </AvatarGroup>
                <Text fontSize="sm" color="gray.500">
                  3 active CSEs • All targets on track
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
          <Card bg={cardBg}>
            <CardBody>
              <VStack align="stretch" spacing={4}>
                <Text fontSize="lg" fontWeight="semibold">
                  Recent Leads
                </Text>
                
                {sampleLeads.slice(0, 5).map((lead) => (
                  <HStack key={lead.id} justifyContent="space-between" p={3} borderRadius="md" bg="gray.50">
                    <VStack align="flex-start" spacing={1}>
                      <Text fontWeight="medium">{lead.companyName}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {lead.contactPerson} • {lead.source}
                      </Text>
                    </VStack>
                    <VStack align="flex-end" spacing={1}>
                      <Badge
                        colorScheme={
                          lead.status === 'Converted' ? 'green' :
                          lead.status === 'Quote Sent' ? 'blue' :
                          lead.status === 'In Discussion' ? 'orange' : 'gray'
                        }
                      >
                        {lead.status}
                      </Badge>
                      <Text fontSize="xs" color="gray.500">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </Text>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            </CardBody>
          </Card>

          <Card bg={cardBg}>
            <CardBody>
              <VStack align="stretch" spacing={4}>
                <Text fontSize="lg" fontWeight="semibold">
                  Today's Tasks
                </Text>
                
                <VStack align="stretch" spacing={3}>
                  <HStack>
                    <Icon as={CheckCircle} color="green.500" />
                    <Text fontSize="sm">Follow up with Tech Solutions</Text>
                  </HStack>
                  <HStack>
                    <Icon as={Phone} color="blue.500" />
                    <Text fontSize="sm">Call Green Energy Corp</Text>
                  </HStack>
                  <HStack>
                    <Icon as={Calendar} color="orange.500" />
                    <Text fontSize="sm">Prepare quote for Retail Plus</Text>
                  </HStack>
                  <HStack>
                    <Icon as={Users} color="purple.500" />
                    <Text fontSize="sm">Team standup at 2 PM</Text>
                  </HStack>
                </VStack>

                <Box pt={4} borderTop="1px" borderColor="gray.200">
                  <Text fontSize="sm" color="gray.500">
                    4 tasks pending • 2 completed today
                  </Text>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </Grid>
      </VStack>
    </Layout>
  );
}