'use client';

import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Button,
  useColorModeValue,
  Slide,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface MobileBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function MobileBottomSheet({ isOpen, onClose, title, children }: MobileBottomSheetProps) {
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
      <Box
        bg={bg}
        shadow="2xl"
        borderTopRadius="xl"
        borderTopWidth="1px"
        borderColor="gray.200"
        minH="50vh"
        maxH="90vh"
        overflowY="auto"
      >
        {/* Handle Bar */}
        <Box
          w="40px"
          h="4px"
          bg="gray.400"
          borderRadius="full"
          mx="auto"
          mt={2}
        />

        {/* Header */}
        <Flex
          justifyContent="space-between"
          alignItems="center"
          p={4}
          borderBottom="1px"
          borderColor="gray.200"
        >
          <Text fontSize="lg" fontWeight="semibold">
            {title}
          </Text>
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<X size={16} />}
            onClick={onClose}
          >
            Close
          </Button>
        </Flex>

        {/* Content */}
        <Box p={4}>
          {children}
        </Box>
      </Box>
    </Slide>
  );
}