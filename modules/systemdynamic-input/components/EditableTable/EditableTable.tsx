import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'; // Adjust based on your setup
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useSystemDynamicInputData } from '../../hooks';  // Import Zustand store hook

interface TableData {
    id: number;
    year: number;
    value: string;
}

interface EditableTableProps {
    parameter: string;
}

export const EditableTable: React.FC<EditableTableProps> = ({ parameter }) => {
    const { data } = useSystemDynamicInputData();  // Access data from Zustand store
    const [tableData, setTableData] = useState<TableData[]>([]);

    // Update table data whenever the parameter prop changes
    useEffect(() => {
        switch (parameter) {
            case 'mps':
                setTableData(data.mps);  // Set mps data
                break;
            case 'lajuPertumbuhanPopulasi':
                setTableData(data.lajuPertumbuhanPopulasi);  // Set lajuPertumbuhanPopulasi data
                break;
            case 'lajuPerubahanLahan':
                setTableData(data.lajuPerubahanLahan);  // Set lajuPerubahanLahan data
                break;
            default:
                setTableData([]);  // Fallback to empty if no matching parameter
                break;
        }
    }, [parameter, data]);  // Run whenever parameter or data changes


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number, key: keyof TableData) => {
        const updatedData = tableData.map((item) =>
            item.id === id ? { ...item, [key]: e.target.value } : item
        );
        setTableData(updatedData);  // Update the state with the new value
    };

    const handleSave = () => {
        console.log('Saving data:', tableData);  // Placeholder for save logic
    };

    return (
        <Card className="flex flex-col p-4 justify-between border rounded overflow-auto overflow-hidden h-[100vh] gap-4">
            
            <Table className="border rounded-lg">
                <TableHeader>
                    <TableRow>
                        <TableHead>Year</TableHead>
                        <TableHead>Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.year}</TableCell> {/* Static Year */}
                            <TableCell>
                                <input
                                    type="text"
                                    value={row.value}
                                    onChange={(e) => handleChange(e, row.id, 'value')}  // Handle value change
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-start">
                <Button onClick={handleSave}>Rerun</Button>  {/* Save action */}
            </div>
        </Card>
    );
};
