import React, { useState, useEffect, forwardRef } from 'react';
import {
    Box,
    Button,
    Flex,
    DatePicker
} from '@strapi/design-system';
import { Cross } from '@strapi/icons';
import { Typography } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { format, isValid, parseISO } from 'date-fns';

interface MultiDateProps {
    name: string;
    onChange: (e: { target: { name: string; value: string; type: string } }) => void;
    value?: string | string[];
    hint?: string;
    required?: boolean;
    labelAction?: React.ReactNode;
    label: string;
    disabled?: boolean;
    error?: string;
    placeholder?: string;
    attribute: any;
    type: string;
    contentTypeUID?: string;
}

const MultiDate = forwardRef<HTMLInputElement, MultiDateProps>((props, ref) => {
    const {
        hint,
        disabled = false,
        labelAction,
        label,
        name,
        required = false,
        onChange,
        value,
        error,
        placeholder = 'YYYY-MM-DD',
    } = props;

    const { formatMessage } = useIntl();

    // Parse value - handle both string and array formats
    const parseValue = () => {
        if (!value) return [];
        if (Array.isArray(value)) return value;
        try {
            return JSON.parse(value);
        } catch {
            return [];
        }
    };

    // State for selected dates
    const [selectedDates, setSelectedDates] = useState<string[]>(parseValue());
    
    // State for current input date
    const [currentDate, setCurrentDate] = useState<string>('');
    
    // Function to add a date
    const addDate = () => {
        if (!currentDate) return;
        
        // Add date if it's not already selected
        if (!selectedDates.includes(currentDate)) {
            const newSelectedDates = [...selectedDates, currentDate];
            setSelectedDates(newSelectedDates);
            // Send as JSON string since we defined type as 'json'
            onChange({ 
                target: { 
                    name, 
                    value: JSON.stringify(newSelectedDates),
                    type: 'json' 
                } 
            });
        }
        
        // Clear the input
        setCurrentDate('');
    };

    // Function to remove a date
    const removeDate = (dateToRemove: string) => {
        const newSelectedDates = selectedDates.filter(date => date !== dateToRemove);
        setSelectedDates(newSelectedDates);
        onChange({ 
            target: { 
                name, 
                value: JSON.stringify(newSelectedDates),
                type: 'json'
            } 
        });
    };

    // Handle the datepicker change
    const handleDateChange = (date: Date) => {
        if (isValid(date)) {
            setCurrentDate(format(date, 'yyyy-MM-dd'));
        }
    };

    // Update internal state when external value changes
    useEffect(() => {
        setSelectedDates(parseValue());
    }, [value]);

    return (
        <Flex direction="column" gap={1}>
            <Flex>
                <Typography variant="pi" fontWeight="bold">
                    {label}
                </Typography>
                {required && <Typography textColor="danger600">*</Typography>}
            </Flex>
            
            <Flex direction="column" gap={2}>
                <Flex gap={2}>
                    <Box flex="1">
                        <DatePicker
                            onChange={handleDateChange}
                            selectedDate={currentDate ? parseISO(currentDate) : undefined}
                            placeholder={placeholder}
                            label="Pick a date"
                            hint="Select a date to add"
                            disabled={disabled}
                            name={`${name}-input`}
                            clearLabel="Clear"
                            onClear={() => setCurrentDate('')}
                            selectedDateLabel={(date: Date) => `Selected date: ${format(date, 'yyyy-MM-dd')}`}
                        />
                    </Box>
                    <Button onClick={addDate} disabled={disabled || !currentDate}>
                        Add Date
                    </Button>
                </Flex>
                
                {/* Display selected dates */}
                <Flex wrap="wrap" gap={2}>
                    {selectedDates.map((date, index) => (
                        <Box key={`${date}-${index}`} background="neutral100" padding={2} hasRadius>
                            <Flex gap={2} alignItems="center">
                                <Typography>{date}</Typography>
                                <Button onClick={() => removeDate(date)} variant="tertiary" size="S">
                                    <Cross />
                                </Button>
                            </Flex>
                        </Box>
                    ))}
                </Flex>
            </Flex>
            
            {error && (
                <Typography variant="pi" textColor="danger600">
                    {error}
                </Typography>
            )}
            
            {hint && (
                <Typography variant="pi" textColor="neutral600">
                    {hint}
                </Typography>
            )}
        </Flex>
    );
});

export default MultiDate;
