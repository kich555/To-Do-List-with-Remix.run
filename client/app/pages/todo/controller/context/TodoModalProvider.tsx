import { useNavigate } from '@remix-run/react';
import { useCallback, useReducer, createContext, useContext } from 'react';

interface ModalDispatchAction {
  type: 'OPEN' | 'CLOSE';
}

function modalReducer(open: boolean, action: ModalDispatchAction) {
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
type TodoModalContextData = {
  open: boolean;
  dispatch: React.Dispatch<ModalDispatchAction>;
  handleClose: () => void;
};

const TodoModalContext = createContext<TodoModalContextData | null>(null);

export function TodoModalProvider({ children }: { children: React.ReactNode }) {
  const [open, dispatch] = useReducer(modalReducer, false);
  const navigate = useNavigate();

  const handleClose = useCallback((): void => {
    dispatch({ type: 'CLOSE' });
    navigate('/todos');
  }, [navigate]);

  return <TodoModalContext.Provider value={{ open, dispatch, handleClose }}>{children}</TodoModalContext.Provider>;
}

export function useModal() {
  const modalContext = useContext(TodoModalContext);

  if (!modalContext) {
    throw new Error('useModal must be used within a TodoListProvider');
  }
  return modalContext;
}
