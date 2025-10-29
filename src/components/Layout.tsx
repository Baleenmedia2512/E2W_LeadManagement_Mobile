'use client';

import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Badge,
  Tooltip,
  useColorMode,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Show,
  Hide,
} from '@chakra-ui/react';
import MobileBottomNav from '@/components/ui/MobileBottomNav';
import {
  Home,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu as MenuIcon,
  Sun,
  Moon,
  LogOut,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Leads', href: '/leads', icon: Users },
  { name: 'DSR Reports', href: '/dsr', icon: BarChart3 },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const sidebarBg = useColorModeValue('gray.50', 'gray.900');

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <VStack spacing={1} align="stretch" p={4}>
      <Box mb={6}>
        <Text fontSize="xl" fontWeight="bold" color="brand.500">
          Easy2Work
        </Text>
        <Text fontSize="sm" color="gray.500">
          Lead Management
        </Text>
      </Box>
      
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link key={item.name} href={item.href}>
            <Box
              p={3}
              borderRadius="md"
              bg={isActive ? 'brand.500' : 'transparent'}
              color={isActive ? 'white' : 'gray.600'}
              _hover={{
                bg: isActive ? 'brand.600' : 'gray.200',
                color: isActive ? 'white' : 'gray.800',
              }}
              cursor="pointer"
              transition="all 0.2s"
              onClick={isMobile ? onClose : undefined}
            >
              <HStack>
                <Icon size={20} />
                <Text fontWeight={isActive ? 'semibold' : 'medium'}>
                  {item.name}
                </Text>
              </HStack>
            </Box>
          </Link>
        );
      })}
    </VStack>
  );

  return (
    <Flex minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* Desktop Sidebar */}
      <Hide below="md">
        <Box
          w="250px"
          bg={sidebarBg}
          borderRight="1px"
          borderColor={borderColor}
          position="fixed"
          h="100vh"
          overflowY="auto"
        >
          <SidebarContent />
        </Box>
      </Hide>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Easy2Work</DrawerHeader>
          <DrawerBody p={0}>
            <SidebarContent isMobile={true} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <Box flex={1} ml={{ base: 0, md: '250px' }}>
        {/* Top Header */}
        <Flex
          h={{ base: '56px', md: '60px' }}
          alignItems="center"
          justifyContent="space-between"
          px={{ base: 4, md: 6 }}
          bg={bgColor}
          borderBottom="1px"
          borderColor={borderColor}
          position="sticky"
          top={0}
          zIndex={10}
        >
          <HStack spacing={{ base: 2, md: 4 }}>
            <Show below="md">
              <IconButton
                aria-label="Open menu"
                icon={<MenuIcon size={20} />}
                variant="ghost"
                size="sm"
                onClick={onOpen}
              />
            </Show>
            
            <Text 
              fontSize={{ base: 'md', md: 'lg' }} 
              fontWeight="semibold"
              isTruncated
              maxW={{ base: '150px', md: 'none' }}
            >
              {navigation.find(item => item.href === pathname)?.name || 'Dashboard'}
            </Text>
          </HStack>

          <HStack spacing={{ base: 1, md: 4 }}>
            <Hide below="md">
              <Tooltip label="Search">
                <IconButton
                  aria-label="Search"
                  icon={<Search size={20} />}
                  variant="ghost"
                  size="sm"
                />
              </Tooltip>
            </Hide>
            
            <Tooltip label="Notifications">
              <Box position="relative">
                <IconButton
                  aria-label="Notifications"
                  icon={<Bell size={18} />}
                  variant="ghost"
                  size="sm"
                />
                <Badge
                  position="absolute"
                  top="-1"
                  right="-1"
                  colorScheme="red"
                  borderRadius="full"
                  fontSize="2xs"
                  minW="16px"
                  h="16px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  3
                </Badge>
              </Box>
            </Tooltip>

            <Hide below="md">
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                variant="ghost"
                size="sm"
                onClick={toggleColorMode}
              />
            </Hide>

            <Menu>
              <MenuButton>
                <Avatar
                  size={{ base: 'sm', md: 'sm' }}
                  name="Amit Patel"
                  src="https://ui-avatars.com/api/?name=Amit+Patel&background=3B82F6&color=fff"
                />
              </MenuButton>
              <MenuList>
                <MenuItem icon={<User size={16} />}>Profile</MenuItem>
                <MenuItem icon={<Settings size={16} />}>Settings</MenuItem>
                <Show below="md">
                  <MenuItem 
                    icon={colorMode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                    onClick={toggleColorMode}
                  >
                    {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </MenuItem>
                </Show>
                <MenuItem icon={<LogOut size={16} />}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>

        {/* Page Content */}
        <Box 
          p={{ base: 4, md: 6 }} 
          minH={{ base: 'calc(100vh - 56px)', md: 'calc(100vh - 60px)' }}
          pb={{ base: '80px', md: 6 }} // Extra padding bottom for mobile bottom nav
        >
          {children}
        </Box>
      </Box>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </Flex>
  );
}