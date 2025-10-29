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
  Input,
  FormControl,
  FormLabel,
  Switch,
  Select,
  Avatar,
  Badge,
  Divider,
  useColorModeValue,
  useColorMode,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import {
  User,
  Lock,
  Bell,
  Palette,
  Globe,
  Shield,
  Clock,
  Save,
  Edit,
  Eye,
  EyeOff,
  Camera,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Activity,
} from 'lucide-react';
import { useState, useRef } from 'react';
import Layout from '@/components/Layout';
import { sampleUsers } from '@/lib/sampleData';

const ProfileTab = () => {
  const currentUser = sampleUsers.find(user => user.id === '3') || sampleUsers[0];
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    designation: currentUser.designation,
    department: currentUser.department,
    branch: currentUser.branch,
  });
  
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardBg = useColorModeValue('white', 'gray.800');

  const handleSave = () => {
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been successfully updated.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setIsEditing(false);
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Profile Header */}
      <Card bg={cardBg}>
        <CardBody>
          <Flex 
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 4, md: 6 }}
            gap={{ base: 4, md: 6 }}
            alignItems={{ base: 'center', md: 'flex-start' }}
          >
            <Box position="relative">
              <Avatar
                size="2xl"
                name={currentUser.name}
                src={currentUser.avatar}
              />
              <IconButton
                icon={<Camera size={16} />}
                size="sm"
                borderRadius="full"
                position="absolute"
                bottom={0}
                right={0}
                bg="brand.500"
                color="white"
                _hover={{ bg: 'brand.600' }}
                onClick={handleImageUpload}
                aria-label="Change profile picture"
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
              />
            </Box>
            
            <VStack align="flex-start" spacing={2} flex={1} minW={0}>
              <Flex 
                direction={{ base: 'column', sm: 'row' }}
                alignItems={{ base: 'flex-start', sm: 'center' }}
                gap={2}
                width="100%"
              >
                <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" isTruncated>
                  {currentUser.name}
                </Text>
                <Badge colorScheme="brand" px={3} py={1} borderRadius="full" flexShrink={0}>
                  {currentUser.role}
                </Badge>
              </Flex>
              <Text color="gray.500" fontSize={{ base: 'md', md: 'lg' }} isTruncated width="100%">
                {currentUser.designation}
              </Text>
              <Flex 
                direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 2, sm: 4 }} 
                fontSize="sm" 
                color="gray.600"
                wrap="wrap"
              >
                <HStack spacing={2}>
                  <Building size={14} />
                  <Text>{currentUser.department}</Text>
                </HStack>
                <HStack spacing={2}>
                  <MapPin size={14} />
                  <Text>{currentUser.branch}</Text>
                </HStack>
                <HStack spacing={2}>
                  <Calendar size={14} />
                  <Text>Joined Jan 2024</Text>
                </HStack>
              </Flex>
            </VStack>

            <Button
              leftIcon={<Edit size={16} />}
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? 'outline' : 'solid'}
              colorScheme="brand"
              size={{ base: 'sm', md: 'md' }}
              width={{ base: '100%', sm: 'auto' }}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </Flex>
        </CardBody>
      </Card>

      {/* Profile Form */}
      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="semibold">
            Personal Information
          </Text>
        </CardHeader>
        <CardBody p={{ base: 4, md: 6 }}>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={{ base: 4, md: 6 }}>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                isReadOnly={!isEditing}
                bg={isEditing ? 'white' : 'gray.50'}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                isReadOnly={!isEditing}
                bg={isEditing ? 'white' : 'gray.50'}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                isReadOnly={!isEditing}
                bg={isEditing ? 'white' : 'gray.50'}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Designation</FormLabel>
              <Input
                value={profileData.designation}
                onChange={(e) => setProfileData({ ...profileData, designation: e.target.value })}
                isReadOnly={!isEditing}
                bg={isEditing ? 'white' : 'gray.50'}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Department</FormLabel>
              <Input
                value={profileData.department}
                isReadOnly
                bg="gray.50"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Branch</FormLabel>
              <Input
                value={profileData.branch}
                isReadOnly
                bg="gray.50"
              />
            </FormControl>
          </Grid>

          {isEditing && (
            <Flex 
              direction={{ base: 'column', sm: 'row' }}
              justifyContent="flex-end" 
              mt={6} 
              gap={3}
            >
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                width={{ base: '100%', sm: 'auto' }}
              >
                Cancel
              </Button>
              <Button 
                colorScheme="brand" 
                leftIcon={<Save size={16} />} 
                onClick={handleSave}
                width={{ base: '100%', sm: 'auto' }}
              >
                Save Changes
              </Button>
            </Flex>
          )}
        </CardBody>
      </Card>
    </VStack>
  );
};

const SecurityTab = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  
  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.800');

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: 'Password Mismatch',
        description: 'New password and confirmation do not match.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: 'Password Updated',
      description: 'Your password has been successfully updated.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Change Password */}
      <Card bg={cardBg}>
        <CardHeader p={{ base: 4, md: 6 }}>
          <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="semibold">
            Change Password
          </Text>
        </CardHeader>
        <CardBody p={{ base: 4, md: 6 }}>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Current Password</FormLabel>
              <InputGroup>
                <Input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  placeholder="Enter your current password"
                />
                <InputRightElement>
                  <IconButton
                    icon={showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    aria-label="Toggle password visibility"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>New Password</FormLabel>
              <InputGroup>
                <Input
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  placeholder="Enter your new password"
                />
                <InputRightElement>
                  <IconButton
                    icon={showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    aria-label="Toggle password visibility"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                placeholder="Confirm your new password"
              />
            </FormControl>

            <Flex justifyContent="flex-end" mt={4}>
              <Button 
                colorScheme="brand" 
                leftIcon={<Lock size={16} />} 
                onClick={handlePasswordChange}
                width={{ base: '100%', sm: 'auto' }}
              >
                Update Password
              </Button>
            </Flex>
          </VStack>
        </CardBody>
      </Card>

      {/* Security Settings */}
      <Card bg={cardBg}>
        <CardHeader p={{ base: 4, md: 6 }}>
          <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="semibold">
            Security Settings
          </Text>
        </CardHeader>
        <CardBody p={{ base: 4, md: 6 }}>
          <VStack spacing={4} align="stretch">
            <Flex 
              direction={{ base: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ base: 'flex-start', sm: 'center' }}
              gap={{ base: 3, sm: 0 }}
            >
              <VStack align="flex-start" spacing={1} flex={1}>
                <Text fontWeight="medium" fontSize={{ base: 'sm', md: 'md' }}>Two-Factor Authentication</Text>
                <Text fontSize="xs" color="gray.500">
                  Add an extra layer of security to your account
                </Text>
              </VStack>
              <Switch colorScheme="brand" />
            </Flex>

            <Divider />

            <Flex 
              direction={{ base: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ base: 'flex-start', sm: 'center' }}
              gap={{ base: 3, sm: 0 }}
            >
              <VStack align="flex-start" spacing={1} flex={1}>
                <Text fontWeight="medium" fontSize={{ base: 'sm', md: 'md' }}>Email Notifications for Login</Text>
                <Text fontSize="xs" color="gray.500">
                  Get notified when someone logs into your account
                </Text>
              </VStack>
              <Switch colorScheme="brand" defaultChecked />
            </Flex>

            <Divider />

            <Flex 
              direction={{ base: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ base: 'flex-start', sm: 'center' }}
              gap={{ base: 3, sm: 0 }}
            >
              <VStack align="flex-start" spacing={1} flex={1}>
                <Text fontWeight="medium" fontSize={{ base: 'sm', md: 'md' }}>Session Timeout</Text>
                <Text fontSize="xs" color="gray.500">
                  Automatically log out after period of inactivity
                </Text>
              </VStack>
              <Select width={{ base: '100%', sm: '120px' }} defaultValue="30">
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </Select>
            </Flex>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

const NotificationsTab = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const toast = useToast();

  const [notifications, setNotifications] = useState({
    newLeads: true,
    followUpReminders: true,
    statusUpdates: true,
    emailDigest: true,
    pushNotifications: true,
    smsAlerts: false,
    weeklyReports: true,
    systemUpdates: true,
  });

  const handleSave = () => {
    toast({
      title: 'Settings Saved',
      description: 'Your notification preferences have been updated.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={6} align="stretch">
      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="semibold">
            Notification Preferences
          </Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={6} align="stretch">
            {/* Lead Notifications */}
            <Box>
              <Text fontWeight="medium" mb={4}>Lead Management</Text>
              <VStack spacing={4} align="stretch">
                <HStack justifyContent="space-between">
                  <VStack align="flex-start" spacing={1}>
                    <Text>New Lead Assignments</Text>
                    <Text fontSize="sm" color="gray.500">
                      Get notified when new leads are assigned to you
                    </Text>
                  </VStack>
                  <Switch
                    colorScheme="brand"
                    isChecked={notifications.newLeads}
                    onChange={(e) => setNotifications({ ...notifications, newLeads: e.target.checked })}
                  />
                </HStack>

                <HStack justifyContent="space-between">
                  <VStack align="flex-start" spacing={1}>
                    <Text>Follow-up Reminders</Text>
                    <Text fontSize="sm" color="gray.500">
                      Reminders for scheduled follow-ups
                    </Text>
                  </VStack>
                  <Switch
                    colorScheme="brand"
                    isChecked={notifications.followUpReminders}
                    onChange={(e) => setNotifications({ ...notifications, followUpReminders: e.target.checked })}
                  />
                </HStack>

                <HStack justifyContent="space-between">
                  <VStack align="flex-start" spacing={1}>
                    <Text>Status Updates</Text>
                    <Text fontSize="sm" color="gray.500">
                      When lead status changes
                    </Text>
                  </VStack>
                  <Switch
                    colorScheme="brand"
                    isChecked={notifications.statusUpdates}
                    onChange={(e) => setNotifications({ ...notifications, statusUpdates: e.target.checked })}
                  />
                </HStack>
              </VStack>
            </Box>

            <Divider />

            {/* Communication Preferences */}
            <Box>
              <Text fontWeight="medium" mb={4}>Communication Channels</Text>
              <VStack spacing={4} align="stretch">
                <HStack justifyContent="space-between">
                  <VStack align="flex-start" spacing={1}>
                    <Text>Email Notifications</Text>
                    <Text fontSize="sm" color="gray.500">
                      Receive notifications via email
                    </Text>
                  </VStack>
                  <Switch
                    colorScheme="brand"
                    isChecked={notifications.emailDigest}
                    onChange={(e) => setNotifications({ ...notifications, emailDigest: e.target.checked })}
                  />
                </HStack>

                <HStack justifyContent="space-between">
                  <VStack align="flex-start" spacing={1}>
                    <Text>Push Notifications</Text>
                    <Text fontSize="sm" color="gray.500">
                      Browser and mobile push notifications
                    </Text>
                  </VStack>
                  <Switch
                    colorScheme="brand"
                    isChecked={notifications.pushNotifications}
                    onChange={(e) => setNotifications({ ...notifications, pushNotifications: e.target.checked })}
                  />
                </HStack>

                <HStack justifyContent="space-between">
                  <VStack align="flex-start" spacing={1}>
                    <Text>SMS Alerts</Text>
                    <Text fontSize="sm" color="gray.500">
                      Urgent notifications via SMS
                    </Text>
                  </VStack>
                  <Switch
                    colorScheme="brand"
                    isChecked={notifications.smsAlerts}
                    onChange={(e) => setNotifications({ ...notifications, smsAlerts: e.target.checked })}
                  />
                </HStack>
              </VStack>
            </Box>

            <Divider />

            {/* Reports */}
            <Box>
              <Text fontWeight="medium" mb={4}>Reports & Updates</Text>
              <VStack spacing={4} align="stretch">
                <HStack justifyContent="space-between">
                  <VStack align="flex-start" spacing={1}>
                    <Text>Weekly Performance Reports</Text>
                    <Text fontSize="sm" color="gray.500">
                      Weekly summary of your performance
                    </Text>
                  </VStack>
                  <Switch
                    colorScheme="brand"
                    isChecked={notifications.weeklyReports}
                    onChange={(e) => setNotifications({ ...notifications, weeklyReports: e.target.checked })}
                  />
                </HStack>

                <HStack justifyContent="space-between">
                  <VStack align="flex-start" spacing={1}>
                    <Text>System Updates</Text>
                    <Text fontSize="sm" color="gray.500">
                      Product updates and new features
                    </Text>
                  </VStack>
                  <Switch
                    colorScheme="brand"
                    isChecked={notifications.systemUpdates}
                    onChange={(e) => setNotifications({ ...notifications, systemUpdates: e.target.checked })}
                  />
                </HStack>
              </VStack>
            </Box>

            <HStack justifyContent="flex-end" mt={6}>
              <Button colorScheme="brand" leftIcon={<Save size={16} />} onClick={handleSave}>
                Save Preferences
              </Button>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

const PreferencesTab = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const cardBg = useColorModeValue('white', 'gray.800');
  const toast = useToast();

  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    currency: 'INR',
    itemsPerPage: '20',
  });

  const handleSave = () => {
    toast({
      title: 'Preferences Saved',
      description: 'Your preferences have been updated successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={6} align="stretch">
      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="semibold">
            Display Preferences
          </Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={6} align="stretch">
            <HStack justifyContent="space-between">
              <VStack align="flex-start" spacing={1}>
                <Text fontWeight="medium">Dark Mode</Text>
                <Text fontSize="sm" color="gray.500">
                  Switch to dark theme for better visibility in low light
                </Text>
              </VStack>
              <Switch
                colorScheme="brand"
                isChecked={colorMode === 'dark'}
                onChange={toggleColorMode}
              />
            </HStack>

            <Divider />

            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
              <FormControl>
                <FormLabel>Language</FormLabel>
                <Select
                  value={preferences.language}
                  onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Timezone</FormLabel>
                <Select
                  value={preferences.timezone}
                  onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Date Format</FormLabel>
                <Select
                  value={preferences.dateFormat}
                  onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Currency</FormLabel>
                <Select
                  value={preferences.currency}
                  onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </Select>
              </FormControl>
            </Grid>
          </VStack>
        </CardBody>
      </Card>

      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="semibold">
            System Preferences
          </Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Items per Page</FormLabel>
              <Select
                value={preferences.itemsPerPage}
                onChange={(e) => setPreferences({ ...preferences, itemsPerPage: e.target.value })}
              >
                <option value="10">10 items</option>
                <option value="20">20 items</option>
                <option value="50">50 items</option>
                <option value="100">100 items</option>
              </Select>
            </FormControl>

            <HStack justifyContent="flex-end" mt={6}>
              <Button colorScheme="brand" leftIcon={<Save size={16} />} onClick={handleSave}>
                Save Preferences
              </Button>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

const ActivityTab = () => {
  const cardBg = useColorModeValue('white', 'gray.800');

  const activityData = [
    {
      id: 1,
      action: 'Profile updated',
      description: 'Changed phone number',
      timestamp: '2025-10-29T10:30:00Z',
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
    },
    {
      id: 2,
      action: 'Login successful',
      description: 'Logged in from new device',
      timestamp: '2025-10-29T09:15:00Z',
      ip: '192.168.1.101',
      device: 'Firefox on macOS',
    },
    {
      id: 3,
      action: 'Password changed',
      description: 'Password updated successfully',
      timestamp: '2025-10-28T16:45:00Z',
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
    },
    {
      id: 4,
      action: 'Settings updated',
      description: 'Notification preferences changed',
      timestamp: '2025-10-28T14:20:00Z',
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
    },
  ];

  return (
    <VStack spacing={6} align="stretch">
      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="semibold">
            Recent Activity
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Activity</Th>
                <Th>Timestamp</Th>
                <Th>IP Address</Th>
                <Th>Device</Th>
              </Tr>
            </Thead>
            <Tbody>
              {activityData.map((activity) => (
                <Tr key={activity.id}>
                  <Td>
                    <VStack align="flex-start" spacing={1}>
                      <Text fontWeight="medium">{activity.action}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {activity.description}
                      </Text>
                    </VStack>
                  </Td>
                  <Td fontSize="sm">
                    {new Date(activity.timestamp).toLocaleString()}
                  </Td>
                  <Td fontSize="sm" fontFamily="mono">
                    {activity.ip}
                  </Td>
                  <Td fontSize="sm">
                    {activity.device}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      <Card bg={cardBg}>
        <CardHeader>
          <Text fontSize="lg" fontWeight="semibold">
            Account Security
          </Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <HStack justifyContent="space-between">
              <VStack align="flex-start" spacing={1}>
                <Text fontWeight="medium">Active Sessions</Text>
                <Text fontSize="sm" color="gray.500">
                  You are currently logged in on 2 devices
                </Text>
              </VStack>
              <Button variant="outline" size="sm">
                Manage Sessions
              </Button>
            </HStack>

            <Divider />

            <HStack justifyContent="space-between">
              <VStack align="flex-start" spacing={1}>
                <Text fontWeight="medium">Download Account Data</Text>
                <Text fontSize="sm" color="gray.500">
                  Export all your account data and activity
                </Text>
              </VStack>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </HStack>

            <Divider />

            <HStack justifyContent="space-between">
              <VStack align="flex-start" spacing={1}>
                <Text fontWeight="medium" color="red.500">
                  Delete Account
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Permanently delete your account and all data
                </Text>
              </VStack>
              <Button colorScheme="red" variant="outline" size="sm">
                Delete Account
              </Button>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default function SettingsPage() {
  return (
    <Layout>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold">
            Settings
          </Text>
          <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>
            Manage your account settings and preferences
          </Text>
        </Box>

        {/* Settings Tabs */}
        <Tabs variant="enclosed" colorScheme="brand" isLazy>
          <TabList overflowX="auto" overflowY="hidden">
            <Tab minW="fit-content">
              <HStack spacing={{ base: 1, md: 2 }}>
                <User size={16} />
                <Text fontSize={{ base: 'sm', md: 'md' }}>Profile</Text>
              </HStack>
            </Tab>
            <Tab minW="fit-content">
              <HStack spacing={{ base: 1, md: 2 }}>
                <Shield size={16} />
                <Text fontSize={{ base: 'sm', md: 'md' }}>Security</Text>
              </HStack>
            </Tab>
            <Tab minW="fit-content">
              <HStack spacing={{ base: 1, md: 2 }}>
                <Bell size={16} />
                <Text fontSize={{ base: 'sm', md: 'md' }}>Notifications</Text>
              </HStack>
            </Tab>
            <Tab minW="fit-content">
              <HStack spacing={{ base: 1, md: 2 }}>
                <Palette size={16} />
                <Text fontSize={{ base: 'sm', md: 'md' }}>Preferences</Text>
              </HStack>
            </Tab>
            <Tab minW="fit-content">
              <HStack spacing={{ base: 1, md: 2 }}>
                <Activity size={16} />
                <Text fontSize={{ base: 'sm', md: 'md' }}>Activity</Text>
              </HStack>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              <ProfileTab />
            </TabPanel>
            <TabPanel px={0}>
              <SecurityTab />
            </TabPanel>
            <TabPanel px={0}>
              <NotificationsTab />
            </TabPanel>
            <TabPanel px={0}>
              <PreferencesTab />
            </TabPanel>
            <TabPanel px={0}>
              <ActivityTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Layout>
  );
}