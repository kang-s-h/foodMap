import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  container?: HTMLElement;
}

function Portal({ children, container = document.body }: PortalProps) {
  return createPortal(children, container);
}
export default Portal;
