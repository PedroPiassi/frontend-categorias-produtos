import type { ReactNode } from 'react'
import { isValidElement } from 'react'

import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export default function BasicDialog({
  title,
  open,
  withActions,
  children,
  handleClose,
  maxWidth,
  noPadding,
  mdSize
}: BasicDialogProps) {
  return (
    <>
      <Dialog
        fullWidth
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.6)' } }}
        PaperProps={{
          sx: { width: { xs: '95%', sm: '80%', md: mdSize || '45%' } }
        }}
        maxWidth={maxWidth || undefined}
      >
        <DialogTitle
          sx={{
            color: 'var(--color-primary)',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <h3>{title}</h3>
          <IconButton aria-label='close' onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers style={{ position: 'relative', padding: noPadding ? 0 : '24px' }}>
          <>{children}</>
        </DialogContent>
        {withActions && isValidElement(withActions) && <DialogActions>{withActions}</DialogActions>}
      </Dialog>
    </>
  )
}

interface BasicDialogProps {
  title: string | ReactNode
  open: boolean
  withActions?: ReactNode
  children: ReactNode
  handleClose: () => void
  maxWidth?: 'xs' | 'sm' | 'md'
  noPadding?: boolean
  mdSize?: string
}
