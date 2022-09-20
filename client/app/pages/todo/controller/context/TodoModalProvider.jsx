import { useNavigate } from '@remix-run/react';
import { useMemo, useCallback, useReducer, createContext, useContext } from 'react';

function modalReducer(state, action) {
  switch (action.type) {
    case 'OPEN': {
      return true;
    }
    case 'CLOSE': {
      return false;
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

const TodoModalContext = createContext();

export function TodoModalProvider({ children }) {
  const [open, dispatch] = useReducer(modalReducer, false);
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    dispatch({ type: 'CLOSE' });
    navigate('/todos');
  }, [navigate]);

  const value = useMemo(() => [open, dispatch, handleClose], [open, handleClose]);
  return <TodoModalContext.Provider value={value}>{children}</TodoModalContext.Provider>;
}

export function useModal() {
  const modalContext = useContext(TodoModalContext);

  if (!modalContext) {
    throw new Error('useModal must be used within a TodoListProvider');
  }
  return modalContext;
}
