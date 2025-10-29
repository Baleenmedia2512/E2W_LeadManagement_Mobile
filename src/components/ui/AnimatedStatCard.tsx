'use client';

import {
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  VStack,
  Text,
  Badge,
  Progress,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const MotionCard = motion(Card);

interface AnimatedStatCardProps {
  label: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  color?: string;
  icon: any;
  delay?: number;
}

export default function AnimatedStatCard({ 
  label, 
  value, 
  change, 
  color = 'brand', 
  icon: IconComponent,
  delay = 0
}: AnimatedStatCardProps) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const getTrendIcon = () => {
    if (!change) return null;
    
    switch (change.type) {
      case 'increase':
        return TrendingUp;
      case 'decrease':
        return TrendingDown;
      default:
        return Minus;
    }
  };

  const getTrendColor = () => {
    if (!change) return 'gray.500';
    
    switch (change.type) {
      case 'increase':
        return 'green.500';
      case 'decrease':
        return 'red.500';
      default:
        return 'gray.500';
    }
  };

  const TrendIcon = getTrendIcon();

  return (
    <MotionCard
      bg={cardBg}
      borderColor={borderColor}
      borderWidth="1px"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        y: -2, 
        shadow: 'lg',
        transition: { duration: 0.2 }
      }}
      h="fit-content"
    >
      <CardBody p={{ base: 4, md: 6 }}>
        <VStack spacing={{ base: 3, md: 4 }} align="stretch">
          <Flex 
            direction={{ base: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ base: 'flex-start', sm: 'center' }}
            gap={{ base: 3, sm: 0 }}
          >
            <VStack align="flex-start" spacing={2} flex={1} minW={0}>
              <Text 
                fontSize={{ base: 'xs', md: 'sm' }} 
                color="gray.500" 
                fontWeight="medium"
                isTruncated
                width="100%"
              >
                {label}
              </Text>
              <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold">
                {value}
              </Text>
              {change && TrendIcon && (
                <HStack spacing={1}>
                  <Icon as={TrendIcon} boxSize={{ base: 3, md: 4 }} color={getTrendColor()} />
                  <Text fontSize={{ base: 'xs', md: 'sm' }} color={getTrendColor()} fontWeight="medium">
                    {Math.abs(change.value)}%
                  </Text>
                </HStack>
              )}
            </VStack>
            
            <Box
              p={{ base: 2, md: 3 }}
              borderRadius="xl"
              bg={`${color}.100`}
              color={`${color}.600`}
              flexShrink={0}
            >
              <Icon as={IconComponent} boxSize={{ base: 5, md: 6 }} />
            </Box>
          </Flex>

          {/* Animated progress bar for visual appeal */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, delay: delay + 0.5 }}
          >
            <Progress
              value={typeof value === 'number' ? Math.min(value, 100) : 85}
              size="sm"
              colorScheme={color}
              borderRadius="full"
              bg="gray.100"
            />
          </motion.div>
        </VStack>
      </CardBody>
    </MotionCard>
  );
}