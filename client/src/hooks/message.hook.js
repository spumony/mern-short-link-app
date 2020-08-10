import {useCallback} from 'react'

export const useMessage = () => {
  return useCallback(text => {
    if (alert && text) {
      alert(text)
    }
  }, [])
}