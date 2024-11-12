import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVerticalIcon } from 'lucide-react';

interface SortableItemProps {
    id: number;
    children: React.ReactNode;
    style: string;
    groupName: string;
}

export const SortableItemGroup = ({ id, children, style, groupName }: SortableItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const styles = {
        transform: CSS.Transform.toString(transform),
        transition,
        width: '100%',
    };

    return (
        <div ref={setNodeRef} style={styles} className={style}>
            <div className='flex flex-row w-full justify-start gap-1 items-center'>
                <div {...attributes} {...listeners} className='cursor-grab' >
                    <GripVerticalIcon className='text-sm text-white' size="1rem" />
                </div>
                <div className="text-white text-sm">{groupName}</div>
            </div>
            {children}
        </div>
    )
};
