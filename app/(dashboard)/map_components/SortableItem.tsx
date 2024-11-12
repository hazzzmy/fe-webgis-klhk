import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVerticalIcon } from 'lucide-react';

interface SortableItemProps {
  id: number;
  children: React.ReactNode;
  style: string;
  type: number;
}

export const SortableItem = ({ id, children, style, type}: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const styles = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: '100%',
  };

  return type === 1 ?  (
    <div ref={setNodeRef} style={styles} className={style}>
      {children}
      <div {...attributes} {...listeners} className='cursor-grab' >
        <GripVerticalIcon className='text-sm text-white' size="1rem"/>
      </div>
    </div>
  ): (
    <div ref={setNodeRef} style={styles} className={style}>
      {children}
      <div {...attributes} {...listeners} className='cursor-grab' >
        <GripVerticalIcon className='text-sm text-white' size="1rem"/>
      </div>
    </div>
  );
};
