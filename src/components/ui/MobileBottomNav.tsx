'use client';

import {
  Box,
  Flex,
  HStack,
  Text,
  useColorModeValue,
  Hide,
} from '@chakra-ui/react';
import {
  Home,
  Users,
  BarChart3,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home, shortName: 'Home' },
  { name: 'Leads', href: '/leads', icon: Users, shortName: 'Leads' },
  { name: 'DSR Reports', href: '/dsr', icon: BarChart3, shortName: 'Reports' },
  { name: 'Settings', href: '/settings', icon: Settings, shortName: 'Settings' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Hide above="md">
      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bg={bg}
        borderTop="1px"
        borderColor={borderColor}
        px={4}
        py={2}
        zIndex={20}
        shadow="lg"
      >
        <HStack spacing={0} justify="space-around">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link key={item.name} href={item.href} style={{ flex: 1 }}>
                <Flex
                  direction="column"
                  alignItems="center"
                  py={2}
                  px={1}
                  color={isActive ? 'brand.500' : 'gray.500'}
                  _hover={{
                    color: isActive ? 'brand.600' : 'gray.700',
                  }}
                  transition="all 0.2s"
                >
                  <Icon size={20} />
                  <Text fontSize="2xs" mt={1} fontWeight={isActive ? 'semibold' : 'medium'}>
                    {item.shortName}
                  </Text>
                </Flex>
              </Link>
            );
          })}
        </HStack>
      </Box>
    </Hide>
  );
}