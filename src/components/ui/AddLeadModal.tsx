'use client';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  useToast,
  Grid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Plus, Save } from 'lucide-react';
import { Lead } from '@/types';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'leadScore'>) => void;
}

export default function AddLeadModal({ isOpen, onClose, onAddLead }: AddLeadModalProps) {
  const toast = useToast();
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    source: '' as Lead['source'] | '',
    status: 'New' as Lead['status'],
    priority: 'Warm' as Lead['priority'],
    assignedTo: '3',
    assignedToName: 'Amit Patel',
    nextFollowUp: '',
    remarks: '',
    location: '',
    budget: 0,
    requirement: '',
    quoteAmount: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.companyName || !formData.contactPerson || !formData.email || !formData.phone) {
      toast({
        title: 'Missing Required Fields',
        description: 'Please fill in all required fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!formData.source) {
      toast({
        title: 'Source Required',
        description: 'Please select a lead source.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      onAddLead(formData as Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'leadScore'>);
      
      toast({
        title: 'Lead Added Successfully',
        description: `${formData.companyName} has been added to your leads.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Reset form
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        source: '' as Lead['source'] | '',
        status: 'New' as Lead['status'],
        priority: 'Warm' as Lead['priority'],
        assignedTo: '3',
        assignedToName: 'Amit Patel',
        nextFollowUp: '',
        remarks: '',
        location: '',
        budget: 0,
        requirement: '',
        quoteAmount: 0,
      });

      onClose();
    } catch (error) {
      toast({
        title: 'Error Adding Lead',
        description: 'There was an error adding the lead. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Lead</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={6} align="stretch">
            {/* Basic Information */}
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <FormControl isRequired>
                <FormLabel>Company Name</FormLabel>
                <Input
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Enter company name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Contact Person</FormLabel>
                <Input
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="Enter contact person name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Phone</FormLabel>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter location"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Source</FormLabel>
                <Select
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value as Lead['source'] })}
                  placeholder="Select lead source"
                >
                  <option value="Meta Ads">Meta Ads</option>
                  <option value="IndiaMart">IndiaMart</option>
                  <option value="JustDial">JustDial</option>
                  <option value="Sulekha">Sulekha</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Referral">Referral</option>
                  <option value="Web Form">Web Form</option>
                </Select>
              </FormControl>
            </Grid>

            {/* Lead Details */}
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Lead['status'] })}
                >
                  <option value="New">New</option>
                  <option value="First Call">First Call</option>
                  <option value="In Discussion">In Discussion</option>
                  <option value="Quote Sent">Quote Sent</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Priority</FormLabel>
                <Select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as Lead['priority'] })}
                >
                  <option value="Hot">Hot</option>
                  <option value="Warm">Warm</option>
                  <option value="Cold">Cold</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Budget (₹)</FormLabel>
                <NumberInput
                  value={formData.budget}
                  onChange={(_, valueAsNumber) => setFormData({ ...formData, budget: valueAsNumber || 0 })}
                >
                  <NumberInputField placeholder="Enter budget" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Grid>

            {/* Requirement */}
            <FormControl>
              <FormLabel>Requirement</FormLabel>
              <Textarea
                value={formData.requirement}
                onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                placeholder="Describe the lead's requirement"
                rows={3}
              />
            </FormControl>

            {/* Next Follow-up */}
            <FormControl>
              <FormLabel>Next Follow-up</FormLabel>
              <Input
                type="datetime-local"
                value={formData.nextFollowUp}
                onChange={(e) => setFormData({ ...formData, nextFollowUp: e.target.value })}
              />
            </FormControl>

            {/* Remarks */}
            <FormControl>
              <FormLabel>Initial Remarks</FormLabel>
              <Textarea
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                placeholder="Any initial notes about this lead"
                rows={2}
              />
            </FormControl>

            {/* Action Buttons */}
            <HStack justifyContent="flex-end" spacing={3}>
              <Button variant="outline" onClick={onClose} isDisabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                colorScheme="brand"
                leftIcon={<Save size={16} />}
                onClick={handleSubmit}
                isLoading={isSubmitting}
                loadingText="Adding Lead..."
              >
                Add Lead
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}