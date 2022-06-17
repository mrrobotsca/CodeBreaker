import { useState, useCallback } from 'react'

// Hook for Modal
const useModalToggle = initialValue => {
  const [open, setOpen] = useState(initialValue)
  return [open, useCallback(() => setOpen(status => !status))]
}
export default useModalToggle;