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
    >
      <CardBody>
        <VStack spacing={4} align="stretch">
          <HStack justifyContent="space-between">
            <VStack align="flex-start" spacing={2} flex={1}>
              <Text fontSize="sm" color="gray.500" fontWeight="medium">
                {label}
              </Text>
              <Text fontSize="2xl" fontWeight="bold">
                {value}
              </Text>
              {change && TrendIcon && (
                <HStack spacing={1}>
                  <Icon as={TrendIcon} size="sm" color={getTrendColor()} />
                  <Text fontSize="sm" color={getTrendColor()} fontWeight="medium">
                    {Math.abs(change.value)}%
                  </Text>
                </HStack>
              )}
            </VStack>
            
            <Box
              p={3}
              borderRadius="xl"
              bg={`${color}.100`}
              color={`${color}.600`}
            >
              <Icon as={IconComponent} boxSize={6} />
            </Box>
          </HStack>

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