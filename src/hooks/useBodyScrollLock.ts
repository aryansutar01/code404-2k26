import { useEffect } from 'react';

// Global counter to handle stacked modals
let lockCount = 0;

export function useBodyScrollLock(isLocked: boolean) {
    useEffect(() => {
        if (isLocked) {
            lockCount++;
            if (lockCount === 1) {
                // Save original overflow style if needed, but usually assume 'visible' or ''
                document.body.style.overflow = 'hidden';
            }

            return () => {
                lockCount--;
                if (lockCount === 0) {
                    document.body.style.overflow = '';
                }
            };
        }
    }, [isLocked]);
}
