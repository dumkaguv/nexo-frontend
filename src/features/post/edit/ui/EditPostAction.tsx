import { Edit } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/ui/shadcn'

type Props = {
  onEdit?: () => void
}

export const EditPostAction = ({ onEdit }: Props) => {
  const { t } = useTranslation()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onEdit}
      className="w-full justify-start"
    >
      <Edit />
      {t('edit')}
    </Button>
  )
}
