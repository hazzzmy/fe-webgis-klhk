import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils"; // assuming you have a utility for className merging
import { Info } from "lucide-react";

type ErrorMessageDialogProps = {
    message: string;
};

const ErrorMessageDialog: React.FC<ErrorMessageDialogProps> = ({ message }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button 
                    size="sm" 
                    variant="outline" 
                    className={cn(
                        "border-none text-white text-xs p-0 h-8", 
                        "bg-transparent hover:bg-transparent hover:text-red-500"
                    )}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-6 h-6" // corrected the size classes
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" 
                        />
                    </svg>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-fit">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex flex-row gap-2 items-center">
                            <Info className="w-6 h-6" />
                            <p>
                                Error Message
                            </p>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="max-w-fit">
                    <pre className="text-sm text-red-500">{message}</pre>
                </DialogDescription>
                <DialogFooter>
                    <p className="text-sm">Please Contact the Administrator</p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ErrorMessageDialog;
