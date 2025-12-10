import { useEffect, useState } from 'react';

import ToastsAdmin from '@/services/ui/react/message/ToastsAdmin';
import LoadingAdmin from '@/services/ui/react/message/LoadingAdmin';
import useToast from '@/services/ui/react-hook/useToast';
import { setupMessage } from '@/services/ui/message';

/** 管理画面の共通部分 */
export default function AdminCommon({}) {
  const [toasts, showToast] = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setupMessage(showToast, setIsLoading);
  }, []);

  return (
    <div>
      <ToastsAdmin toasts={toasts} />
      <LoadingAdmin isLoading={isLoading} />
    </div>
  );
}
